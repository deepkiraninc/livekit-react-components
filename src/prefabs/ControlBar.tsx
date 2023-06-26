import { Track } from 'livekit-client';
import * as React from 'react';
import { MediaDeviceMenu } from './MediaDeviceMenu';
import { DisconnectButton } from '../components/controls/DisconnectButton';
import { TrackToggle } from '../components/controls/TrackToggle';
import { StartAudio } from '../components/controls/StartAudio';
import { ChatIcon, LeaveIcon } from '../assets/icons';
import { ChatToggle } from '../components/controls/ChatToggle';
import { ShareLinkToggle } from '../components/controls/ShareLinkToggle';
import { UserToggle } from '../components/controls/UserToggle';
import SvgInviteIcon from '../assets/icons/InviteIcon';
import SvgUserIcon from '../assets/icons/UsersIcon';
import { useLocalParticipantPermissions } from '../hooks';
import { useMediaQuery } from '../hooks/internal';
import { useMaybeLayoutContext } from '../context';
import { supportsScreenSharing } from '@livekit/components-core';

/** @public */
export type ControlBarControls = {
  microphone?: boolean;
  camera?: boolean;
  chat?: boolean;
  screenShare?: boolean;
  leave?: boolean;
  sharelink?: boolean;
  users?: boolean;
  leaveButton?: string;
};

/** @public */
export type ControlBarProps = React.HTMLAttributes<HTMLDivElement> & {
  variation?: 'minimal' | 'verbose' | 'textOnly';
  controls?: ControlBarControls;
  waitingRoomCount: number;
  screenShareTracks?: number;
};

/**
 * The ControlBar prefab component gives the user the basic user interface
 * to control their media devices and leave the room.
 *
 * @remarks
 * This component is build with other LiveKit components like `TrackToggle`,
 * `DeviceSelectorButton`, `DisconnectButton` and `StartAudio`.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <ControlBar />
 * </LiveKitRoom>
 * ```
 * @public
 */
export function ControlBar({
  variation,
  controls,
  waitingRoomCount,
  screenShareTracks,
  ...props
}: ControlBarProps) {
  const layoutContext = useMaybeLayoutContext();

  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [isShareLinkOpen, setIsShareLinkOpen] = React.useState(false);
  const [isUserOpen, setIsUserOpen] = React.useState(false);

  React.useEffect(() => {
    if (layoutContext?.widget.state?.showChat == 'show_chat') {
      setIsChatOpen(layoutContext?.widget.state?.showChat == 'show_chat');
    } else if (layoutContext?.widget.state?.showChat == 'show_invite') {
      setIsShareLinkOpen(layoutContext?.widget.state?.showChat == 'show_invite');
    } else if (layoutContext?.widget.state?.showChat == 'show_users') {
      setIsUserOpen(layoutContext?.widget.state?.showChat == 'show_users');
    }
  }, [layoutContext?.widget.state?.showChat]);

  const isTooLittleSpace = useMediaQuery(
    `(max-width: ${isChatOpen || isShareLinkOpen || isUserOpen ? 1000 : 760}px)`,
  );

  const defaultVariation = isTooLittleSpace ? 'minimal' : 'verbose';
  variation ??= defaultVariation;

  const visibleControls = { leave: true, ...controls };

  const localPermissions = useLocalParticipantPermissions();

  if (!localPermissions) {
    visibleControls.camera = false;
    visibleControls.chat = false;
    visibleControls.microphone = false;
    visibleControls.screenShare = false;
    visibleControls.sharelink = false;
    visibleControls.users = false;
  } else {
    visibleControls.camera ??= localPermissions.canPublish;
    visibleControls.microphone ??= localPermissions.canPublish;
    visibleControls.screenShare ??= localPermissions.canPublish;
    visibleControls.chat ??= localPermissions.canPublishData && controls?.chat;
    visibleControls.sharelink ??= localPermissions.canPublishData && controls?.sharelink;
    visibleControls.users ??= localPermissions.canPublishData && controls?.users;
  }

  const showIcon = React.useMemo(
    () => variation === 'minimal' || variation === 'verbose',
    [variation],
  );
  const showText = React.useMemo(
    () => variation === 'textOnly' || variation === 'verbose',
    [variation],
  );

  const browserSupportsScreenSharing = supportsScreenSharing();

  const [isScreenShareEnabled, setIsScreenShareEnabled] = React.useState(false);

  const onScreenShareChange = (enabled: boolean) => {
    setIsScreenShareEnabled(enabled);
  };

  return (
    <div className="lk-control-bar" {...props}>
      {visibleControls.microphone && (
        <div className="lk-button-group">
          <TrackToggle source={Track.Source.Microphone} showIcon={showIcon}>
            {showText && 'Microphone'}
          </TrackToggle>
          <div className="lk-button-group-menu">
            <MediaDeviceMenu kind="audioinput" />
          </div>
        </div>
      )}
      {visibleControls.camera && (
        <div className="lk-button-group">
          <TrackToggle source={Track.Source.Camera} showIcon={showIcon}>
            {showText && 'Camera'}
          </TrackToggle>
          <div className="lk-button-group-menu">
            <MediaDeviceMenu kind="videoinput" />
          </div>
        </div>
      )}
      {visibleControls.screenShare && browserSupportsScreenSharing && (
        <TrackToggle
          source={Track.Source.ScreenShare}
          captureOptions={{ audio: true, selfBrowserSurface: 'include' }}
          showIcon={showIcon}
          onChange={onScreenShareChange}
          disabled={!isScreenShareEnabled && screenShareTracks !== 0}
          title={
            !isScreenShareEnabled && screenShareTracks !== 0
              ? 'Someone has shared screen'
              : isScreenShareEnabled
              ? "You're sharing your scrren"
              : 'You can share your screen'
          }
        >
          {showText && (isScreenShareEnabled ? 'Stop screen share' : 'Share screen')}
        </TrackToggle>
      )}
      {visibleControls.chat && (
        <ChatToggle>
          {showIcon && <ChatIcon />}
          {showText && 'Chat'}
        </ChatToggle>
      )}
      {visibleControls.sharelink && (
        <ShareLinkToggle>
          {showIcon && <SvgInviteIcon />}
          {showText && 'Invite'}
        </ShareLinkToggle>
      )}
      {visibleControls.users && (
        <UserToggle>
          {showIcon && <SvgUserIcon />}
          {showText && 'Participants'}
          {waitingRoomCount !== 0 && <span className="waiting-count">{waitingRoomCount}</span>}
        </UserToggle>
      )}
      {visibleControls.leave && (
        <DisconnectButton>
          {showIcon && <LeaveIcon />}
          {showText && visibleControls.leaveButton}
        </DisconnectButton>
      )}
      <StartAudio label="Start Audio" />
    </div>
  );
}
