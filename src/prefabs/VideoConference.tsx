import type {
  MessageDecoder,
  MessageEncoder,
  TrackReferenceOrPlaceholder,
  WidgetState,
} from '@livekit/components-core';
import { isEqualTrackRef, isTrackReference, isWeb, log, setupParticipantName } from '@livekit/components-core';
import { RoomEvent, Track, TrackPublication } from 'livekit-client';
import * as React from 'react';
import type { MessageFormatter } from '../components';
import {
  CarouselLayout,
  ConnectionStateToast,
  FocusLayout,
  FocusLayoutContainer,
  GridLayout,
  LayoutContextProvider,
  ParticipantTile,
  RoomAudioRenderer,
  formatChatMessageLinks
} from '../components';
import { useCreateLayoutContext, useEnsureParticipant, useRoomContext } from '../context';
import { useLocalParticipant, usePinnedElementTracks, usePinnedTracks, useTracks, useWhiteboard } from '../hooks';
import { Chat } from './Chat';
import { ControlBar } from './ControlBar';
import { Users } from './Users';
import { ShareLink } from './ShareLink';
import { useObservableState } from '../hooks/internal';
import { WhiteboardState } from '../context/whiteboard-context';
import { useWarnAboutMissingStyles } from '../hooks/useWarnAboutMissingStyles';

/**
 * @public
 */
export interface VideoConferenceProps extends React.HTMLAttributes<HTMLDivElement> {
  chatMessageFormatter?: MessageFormatter;
  chatMessageEncoder?: MessageEncoder;
  chatMessageDecoder?: MessageDecoder;
  /** @alpha */
  SettingsComponent?: React.ComponentType;
  showChatButton: boolean;
  showShareLink: boolean;
  isCallScreen: boolean;
  showParticipant: boolean;
  showExtraSettingMenu: boolean;
}

/**
 * The `VideoConference` ready-made component is your drop-in solution for a classic video conferencing application.
 * It provides functionality such as focusing on one participant, grid view with pagination to handle large numbers
 * of participants, basic non-persistent chat, screen sharing, and more.
 *
 * @remarks
 * The component is implemented with other LiveKit components like `FocusContextProvider`,
 * `GridLayout`, `ControlBar`, `FocusLayoutContainer` and `FocusLayout`.
 * You can use this components as a starting point for your own custom video conferencing application.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <VideoConference />
 * <LiveKitRoom>
 * ```
 * @public
 */
export function VideoConference({
  chatMessageFormatter,
  chatMessageDecoder,
  chatMessageEncoder,
  SettingsComponent,
  showChatButton,
  showShareLink,
  showParticipant,
  isCallScreen,
  showExtraSettingMenu,
  ...props
}: VideoConferenceProps) {
  const [widgetState, setWidgetState] = React.useState<WidgetState>({
    showChat: null,
    unreadMessages: 0,
    showSettings: false,
  });

  const lastAutoFocusedScreenShareTrack = React.useRef<TrackReferenceOrPlaceholder | null>(null);
  const { localParticipant } = useLocalParticipant();
  const p = useEnsureParticipant(localParticipant);

  const { infoObserver } = React.useMemo(() => {
    return setupParticipantName(p);
  }, [p]);

  const { metadata } = useObservableState(infoObserver, {
    name: p.name,
    identity: p.identity,
    metadata: p.metadata,
  });

  const [showShareButton, setShowShareButton] = React.useState<boolean>(showShareLink);
  const [showParticipantButton, setShowParticipantButton] = React.useState<boolean>(showParticipant);
  const [leaveButton, setLeaveButton] = React.useState<string>("Leave");
  const [endForAll, setEndForAll] = React.useState<string | false>(false);

  const meta = metadata ? JSON.parse(metadata) : {};

  const [waitingRoomCount, setWaitingRoomCount] = React.useState<number>(0);

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { updateOnlyOn: [RoomEvent.ActiveSpeakersChanged], onlySubscribed: false },
  );

  const widgetUpdate = (state: WidgetState) => {
    log.debug('updating widget state', state);
    setWidgetState(state);
  };

  const updateCount = (count: number) => {
    log.debug('count ', count);
    setWaitingRoomCount(count);
  };

  // const setWaitingMessage = (message: string) => {
  //   if (showParticipantButton) {
  //     setWaiting(message);
  //   }
  // };

  const layoutContext = useCreateLayoutContext();
  const screenShareTracks = tracks
    .filter(isTrackReference)
    .filter((track) => track.publication.source === Track.Source.ScreenShare);

  const whitePub = new TrackPublication(Track.Kind.Unknown, 'whiteboard', "whiteboard");
  const whiteboardTrack = {
    participant: p,
    publication: whitePub,
    source: Track.Source.Unknown,
  }

  const focusTrack = usePinnedTracks(layoutContext)?.[0];
  const focusElementTrack = usePinnedElementTracks(layoutContext)?.[0];
  const carouselTracks = tracks.filter((track) => !isEqualTrackRef(track, focusTrack));

  React.useEffect(() => {
    if (meta && meta.host) {
      localStorage.setItem('host', meta.host);
      if (meta.limited) {
        localStorage.setItem('limited', meta.limited);
      }

      setShowShareButton(true);
      setShowParticipantButton(true);
      setLeaveButton("Leave Meeting");
      setEndForAll("End Meeting for All");
    }
  }, [meta]);

  React.useEffect(() => {
    const pmeta = p.metadata ? JSON.parse(p.metadata) : {};
    if (pmeta && pmeta.host) {
      localStorage.setItem('host', meta.host);
      if (meta.limited) {
        localStorage.setItem('limited', meta.limited);
      }

      setShowShareButton(true);
      setShowParticipantButton(true);
      setLeaveButton("Leave Meeting");
      setEndForAll("End Meeting for All");
    }
  }, [p]);

  React.useEffect(() => {
    // If screen share tracks are published, and no pin is set explicitly, auto set the screen share.
    if (
      screenShareTracks.some((track) => track.publication.isSubscribed) &&
      lastAutoFocusedScreenShareTrack.current === null
    ) {
      log.debug('Auto set screen share focus:', { newScreenShareTrack: screenShareTracks[0] });
      layoutContext.pin.dispatch?.({ msg: 'set_pin', trackReference: screenShareTracks[0] });
      lastAutoFocusedScreenShareTrack.current = screenShareTracks[0];
    } else if (
      lastAutoFocusedScreenShareTrack.current &&
      !screenShareTracks.some(
        (track) =>
          track.publication.trackSid ===
          lastAutoFocusedScreenShareTrack.current?.publication?.trackSid,
      )
    ) {
      log.debug('Auto clearing screen share focus.');
      layoutContext.pin.dispatch?.({ msg: 'clear_pin' });
      lastAutoFocusedScreenShareTrack.current = null;
    }
  }, [
    screenShareTracks
      .map((ref) => `${ref.publication.trackSid}_${ref.publication.isSubscribed}`)
      .join(),
    focusTrack?.publication?.trackSid,
  ]);

  const room = useRoomContext();
  const decoder = new TextDecoder();
  const { isWhiteboardShared } = useWhiteboard();
  const whiteboardUpdate = (state: WhiteboardState) => {
    log.debug('updating widget state', state);
    if (state.show_whiteboard) {
      layoutContext.pin.dispatch?.({ msg: 'set_pin', trackReference: whiteboardTrack });
    } else {
      layoutContext.pin.dispatch?.({ msg: 'clear_pin' });
    }
  };

  React.useEffect(() => {
    // console.log("Updating initail whiteboard setting");
    if (isWhiteboardShared) {
      layoutContext.pin.dispatch?.({ msg: 'set_pin', trackReference: whiteboardTrack });
      layoutContext.whiteboard.dispatch?.({ msg: "show_whiteboard" });
    } else {
      layoutContext.pin.dispatch?.({ msg: 'clear_pin' });
      layoutContext.whiteboard.dispatch?.({ msg: "hide_whiteboard" });
    }
  }, [isWhiteboardShared]);

  const [isWhiteboard, setIsWhiteboard] = React.useState<boolean>(false);

  // receive data from other participants
  room.on(RoomEvent.DataReceived, (payload: Uint8Array) => {
    const strData = decoder.decode(payload)
    const str = JSON.parse(strData);

    if (str.openWhiteboard) {
      // layoutContext.whiteboard.dispatch?.({ msg: "show_whiteboard" });
      // layoutContext.pin.dispatch?.({ msg: 'set_pin', trackReference: whiteboardTrack });
      setIsWhiteboard(true);
    } else {
      // layoutContext.whiteboard.dispatch?.({ msg: "hide_whiteboard" });
      setIsWhiteboard(false);
    }
  });
  useWarnAboutMissingStyles();

  return (
    <div className="lk-video-conference" {...props}>
      {isWeb() && (
        <LayoutContextProvider
          value={layoutContext}
          // onPinChange={handleFocusStateChange}
          onWidgetChange={widgetUpdate}
          onWhiteboardChange={whiteboardUpdate}
        >
          <div className="lk-video-conference-inner">
            {!focusTrack && !focusElementTrack ? (
              <div className="lk-grid-layout-wrapper">
                <GridLayout tracks={tracks}>
                  <ParticipantTile />
                </GridLayout>
              </div>
            ) : (
              <div className="lk-focus-layout-wrapper">
                <FocusLayoutContainer className={focusElementTrack ? 'lk-focus-layout-extended' : ''}>
                  <CarouselLayout tracks={carouselTracks}>
                    <ParticipantTile />
                  </CarouselLayout>
                  {focusTrack && <FocusLayout trackRef={focusTrack} />}
                </FocusLayoutContainer>
              </div>
            )}
            <ControlBar
              controls={{
                chat: showChatButton,
                sharelink: showShareButton,
                users: showParticipantButton,
                leaveButton: leaveButton,
                endForAll: endForAll,
                settings: !!SettingsComponent
              }}
              waitingRoomCount={waitingRoomCount}
              screenShareTracks={screenShareTracks.length}
              isWhiteboard={isWhiteboard}
              showExtraSettingMenu={showExtraSettingMenu}
            />
          </div >

          {
            showShareButton ?
              (
                <ShareLink
                  style={{
                    display: widgetState.showChat == 'show_invite' ? 'block' : 'none'
                  }}
                  isCallScreen={isCallScreen}
                />
              ) : (
                <></>
              )
          }

          {
            showParticipantButton ? (
              <Users
                style={{ display: widgetState.showChat == 'show_users' ? 'block' : 'none' }}
                onWaitingRoomChange={updateCount}
              />
            ) : (<></>)
          }

          {/* {
            waiting ? (
              <Toast className="lk-toast-connection-state">
                <UserToggle>{waiting}</UserToggle>
              </Toast>
            ) : (
              <></>
            )
          } */}
          <Chat
            style={{ display: widgetState.showChat == 'show_chat' ? 'flex' : 'none' }}
            messageFormatter={formatChatMessageLinks}
            messageEncoder={chatMessageEncoder}
            messageDecoder={chatMessageDecoder}
          />
          {
            SettingsComponent && (
              <div
                className="lk-settings-menu-modal"
                style={{ display: widgetState.showSettings ? 'block' : 'none' }}
              >
                <SettingsComponent />
              </div>
            )
          }
        </LayoutContextProvider >
      )
      }
      <RoomAudioRenderer />
      <ConnectionStateToast />
    </div >
  );
}