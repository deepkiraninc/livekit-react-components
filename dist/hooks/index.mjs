var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/hooks/useAudioPlayback.ts
import * as React7 from "react";

// src/hooks/internal/useResizeObserver.ts
import * as React from "react";
import useLatest from "@react-hook/latest";
function useResizeObserver(target, callback) {
  const resizeObserver = getResizeObserver();
  const storedCallback = useLatest(callback);
  React.useLayoutEffect(() => {
    let didUnsubscribe = false;
    const targetEl = target.current;
    if (!targetEl)
      return;
    function cb(entry, observer) {
      if (didUnsubscribe)
        return;
      storedCallback.current(entry, observer);
    }
    resizeObserver == null ? void 0 : resizeObserver.subscribe(targetEl, cb);
    return () => {
      didUnsubscribe = true;
      resizeObserver == null ? void 0 : resizeObserver.unsubscribe(targetEl, cb);
    };
  }, [target.current, resizeObserver, storedCallback]);
  return resizeObserver == null ? void 0 : resizeObserver.observer;
}
function createResizeObserver() {
  let ticking = false;
  let allEntries = [];
  const callbacks = /* @__PURE__ */ new Map();
  if (typeof window === "undefined") {
    return;
  }
  const observer = new ResizeObserver((entries, obs) => {
    allEntries = allEntries.concat(entries);
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const triggered = /* @__PURE__ */ new Set();
        for (let i = 0; i < allEntries.length; i++) {
          if (triggered.has(allEntries[i].target))
            continue;
          triggered.add(allEntries[i].target);
          const cbs = callbacks.get(allEntries[i].target);
          cbs == null ? void 0 : cbs.forEach((cb) => cb(allEntries[i], obs));
        }
        allEntries = [];
        ticking = false;
      });
    }
    ticking = true;
  });
  return {
    observer,
    subscribe(target, callback) {
      var _a;
      observer.observe(target);
      const cbs = (_a = callbacks.get(target)) != null ? _a : [];
      cbs.push(callback);
      callbacks.set(target, cbs);
    },
    unsubscribe(target, callback) {
      var _a;
      const cbs = (_a = callbacks.get(target)) != null ? _a : [];
      if (cbs.length === 1) {
        observer.unobserve(target);
        callbacks.delete(target);
        return;
      }
      const cbIndex = cbs.indexOf(callback);
      if (cbIndex !== -1)
        cbs.splice(cbIndex, 1);
      callbacks.set(target, cbs);
    }
  };
}
var _resizeObserver;
var getResizeObserver = () => !_resizeObserver ? _resizeObserver = createResizeObserver() : _resizeObserver;
var useSize = (target) => {
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  React.useLayoutEffect(() => {
    if (target.current) {
      const { width, height } = target.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, [target.current]);
  const resizeCallback = React.useCallback(
    (entry) => setSize(entry.contentRect),
    []
  );
  useResizeObserver(target, resizeCallback);
  return size;
};

// src/hooks/internal/useObservableState.ts
import * as React2 from "react";
function useObservableState(observable, startWith) {
  const [state, setState] = React2.useState(startWith);
  React2.useEffect(() => {
    if (typeof window === "undefined" || !observable)
      return;
    const subscription = observable.subscribe(setState);
    return () => subscription.unsubscribe();
  }, [observable]);
  return state;
}

// src/hooks/useAudioPlayback.ts
import { roomAudioPlaybackAllowedObservable } from "@livekit/components-core";

// src/context/layout-context.ts
import { PIN_DEFAULT_STATE, WIDGET_DEFAULT_STATE } from "@livekit/components-core";
import * as React3 from "react";
var LayoutContext = React3.createContext(void 0);
function useLayoutContext() {
  const layoutContext = React3.useContext(LayoutContext);
  if (!layoutContext) {
    throw Error("Tried to access LayoutContext context outside a LayoutContextProvider provider.");
  }
  return layoutContext;
}
function useEnsureLayoutContext(layoutContext) {
  const layout = useMaybeLayoutContext();
  layoutContext != null ? layoutContext : layoutContext = layout;
  if (!layoutContext) {
    throw Error("Tried to access LayoutContext context outside a LayoutContextProvider provider.");
  }
  return layoutContext;
}
function useMaybeLayoutContext() {
  return React3.useContext(LayoutContext);
}

// src/context/participant-context.ts
import * as React5 from "react";

// src/context/track-reference-context.ts
import * as React4 from "react";
var TrackRefContext = React4.createContext(
  void 0
);
function useMaybeTrackRefContext() {
  return React4.useContext(TrackRefContext);
}
function useEnsureTrackRef(trackRef) {
  const context = useMaybeTrackRefContext();
  const ref = trackRef != null ? trackRef : context;
  if (!ref) {
    throw new Error(
      "No TrackRef, make sure you are inside a TrackRefContext or pass the TrackRef explicitly"
    );
  }
  return ref;
}

// src/context/participant-context.ts
var ParticipantContext = React5.createContext(void 0);
function useMaybeParticipantContext() {
  return React5.useContext(ParticipantContext);
}
function useEnsureParticipant(participant) {
  var _a;
  const context = useMaybeParticipantContext();
  const trackContext = useMaybeTrackRefContext();
  const p = (_a = participant != null ? participant : context) != null ? _a : trackContext == null ? void 0 : trackContext.participant;
  if (!p) {
    throw new Error(
      "No participant provided, make sure you are inside a participant context or pass the participant explicitly"
    );
  }
  return p;
}

// src/context/room-context.ts
import * as React6 from "react";
var RoomContext = React6.createContext(void 0);
function useRoomContext() {
  const ctx = React6.useContext(RoomContext);
  if (!ctx) {
    throw Error("tried to access room context outside of livekit room component");
  }
  return ctx;
}
function useMaybeRoomContext() {
  return React6.useContext(RoomContext);
}
function useEnsureRoom(room) {
  const context = useMaybeRoomContext();
  const r = room != null ? room : context;
  if (!r) {
    throw new Error(
      "No room provided, make sure you are inside a Room context or pass the room explicitly"
    );
  }
  return r;
}

// src/hooks/useAudioPlayback.ts
function useAudioPlayback(room) {
  const roomEnsured = useEnsureRoom(room);
  const startAudio = React7.useCallback(() => __async(this, null, function* () {
    yield roomEnsured.startAudio();
  }), [roomEnsured]);
  const observable = React7.useMemo(
    () => roomAudioPlaybackAllowedObservable(roomEnsured),
    [roomEnsured]
  );
  const { canPlayAudio } = useObservableState(observable, {
    canPlayAudio: roomEnsured.canPlaybackAudio
  });
  return { canPlayAudio, startAudio };
}

// src/hooks/useClearPinButton.ts
import { setupClearPinButton } from "@livekit/components-core";
import * as React8 from "react";

// src/mergeProps.ts
import clsx from "clsx";
function chain(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        try {
          callback(...args);
        } catch (e) {
          console.error(e);
        }
      }
    }
  };
}
function mergeProps(...args) {
  const result = __spreadValues({}, args[0]);
  for (let i = 1; i < args.length; i++) {
    const props = args[i];
    for (const key in props) {
      const a = result[key];
      const b = props[key];
      if (typeof a === "function" && typeof b === "function" && // This is a lot faster than a regex.
      key[0] === "o" && key[1] === "n" && key.charCodeAt(2) >= /* 'A' */
      65 && key.charCodeAt(2) <= /* 'Z' */
      90) {
        result[key] = chain(a, b);
      } else if ((key === "className" || key === "UNSAFE_className") && typeof a === "string" && typeof b === "string") {
        result[key] = clsx(a, b);
      } else {
        result[key] = b !== void 0 ? b : a;
      }
    }
  }
  return result;
}

// src/hooks/useClearPinButton.ts
function useClearPinButton(props) {
  const { state, dispatch } = useLayoutContext().pin;
  const buttonProps = React8.useMemo(() => {
    const { className } = setupClearPinButton();
    const mergedProps = mergeProps(props, {
      className,
      disabled: !(state == null ? void 0 : state.length),
      onClick: () => {
        if (dispatch)
          dispatch({ msg: "clear_pin" });
      }
    });
    return mergedProps;
  }, [props, dispatch, state]);
  return { buttonProps };
}

// src/hooks/useConnectionQualityIndicator.ts
import { setupConnectionQualityIndicator } from "@livekit/components-core";
import { ConnectionQuality } from "livekit-client";
import * as React9 from "react";
function useConnectionQualityIndicator(options = {}) {
  const p = useEnsureParticipant(options.participant);
  const { className, connectionQualityObserver } = React9.useMemo(
    () => setupConnectionQualityIndicator(p),
    [p]
  );
  const quality = useObservableState(connectionQualityObserver, ConnectionQuality.Unknown);
  return { className, quality };
}

// src/hooks/useConnectionStatus.ts
import { connectionStateObserver } from "@livekit/components-core";
import * as React10 from "react";
function useConnectionState(room) {
  const r = useEnsureRoom(room);
  const observable = React10.useMemo(() => connectionStateObserver(r), [r]);
  const connectionState = useObservableState(observable, r.state);
  return connectionState;
}

// src/hooks/useDataChannel.ts
import { setupDataMessageHandler } from "@livekit/components-core";
import * as React11 from "react";
function useDataChannel(topicOrCallback, callback) {
  const onMessage = typeof topicOrCallback === "function" ? topicOrCallback : callback;
  const topic = typeof topicOrCallback === "string" ? topicOrCallback : void 0;
  const room = useRoomContext();
  const { send, messageObservable, isSendingObservable } = React11.useMemo(
    () => setupDataMessageHandler(room, topic, onMessage),
    [room, topic, onMessage]
  );
  const message = useObservableState(messageObservable, void 0);
  const isSending = useObservableState(isSendingObservable, false);
  return {
    message,
    send,
    isSending
  };
}

// src/hooks/useDisconnectButton.ts
import { setupDisconnectButton } from "@livekit/components-core";
import { ConnectionState } from "livekit-client";
import * as React12 from "react";
function useDisconnectButton(props) {
  const room = useRoomContext();
  const connectionState = useConnectionState(room);
  const buttonProps = React12.useMemo(() => {
    const { className, disconnect } = setupDisconnectButton(room);
    const mergedProps = mergeProps(props, {
      className,
      onClick: () => {
        var _a;
        return disconnect((_a = props.stopTracks) != null ? _a : true);
      },
      disabled: connectionState === ConnectionState.Disconnected
    });
    return mergedProps;
  }, [room, props, connectionState]);
  return { buttonProps };
}

// src/hooks/useFacingMode.ts
import { LocalTrackPublication, facingModeFromLocalTrack } from "livekit-client";
function useFacingMode(trackReference) {
  if (trackReference.publication instanceof LocalTrackPublication) {
    const localTrack = trackReference.publication.track;
    if (localTrack) {
      const { facingMode } = facingModeFromLocalTrack(localTrack);
      return facingMode;
    }
  }
  return "undefined";
}

// src/hooks/useFocusToggle.ts
import { setupFocusToggle, isTrackReferencePinned } from "@livekit/components-core";
import * as React13 from "react";
function useFocusToggle({ trackRef, props }) {
  const trackReference = useEnsureTrackRef(trackRef);
  const layoutContext = useMaybeLayoutContext();
  const { className } = React13.useMemo(() => setupFocusToggle(), []);
  const inFocus = React13.useMemo(() => {
    return isTrackReferencePinned(trackReference, layoutContext == null ? void 0 : layoutContext.pin.state);
  }, [trackRef, layoutContext == null ? void 0 : layoutContext.pin.state]);
  const mergedProps = React13.useMemo(
    () => mergeProps(props, {
      className,
      onClick: (event) => {
        var _a, _b, _c, _d, _e;
        (_a = props.onClick) == null ? void 0 : _a.call(props, event);
        if (inFocus) {
          (_c = layoutContext == null ? void 0 : (_b = layoutContext.pin).dispatch) == null ? void 0 : _c.call(_b, {
            msg: "clear_pin"
          });
        } else {
          (_e = layoutContext == null ? void 0 : (_d = layoutContext.pin).dispatch) == null ? void 0 : _e.call(_d, {
            msg: "set_pin",
            trackReference
          });
        }
      }
    }),
    [props, className, trackRef, inFocus, layoutContext == null ? void 0 : layoutContext.pin]
  );
  return { mergedProps, inFocus };
}

// src/hooks/useGridLayout.ts
import { GRID_LAYOUTS, selectGridLayout } from "@livekit/components-core";
import * as React14 from "react";
function useGridLayout(gridElement, trackCount) {
  const { width, height } = useSize(gridElement);
  const layout = width > 0 && height > 0 ? selectGridLayout(GRID_LAYOUTS, trackCount, width, height) : GRID_LAYOUTS[0];
  React14.useEffect(() => {
    if (gridElement.current && layout) {
      gridElement.current.style.setProperty("--lk-col-count", layout == null ? void 0 : layout.columns.toString());
      gridElement.current.style.setProperty("--lk-row-count", layout == null ? void 0 : layout.rows.toString());
    }
  }, [gridElement, layout]);
  return {
    layout
  };
}

// src/hooks/useIsMuted.ts
import {
  getTrackReferenceId,
  mutedObserver
} from "@livekit/components-core";
import * as React15 from "react";
function useIsMuted(sourceOrTrackRef, options = {}) {
  var _a, _b;
  const passedParticipant = typeof sourceOrTrackRef === "string" ? options.participant : sourceOrTrackRef.participant;
  const p = useEnsureParticipant(passedParticipant);
  const ref = typeof sourceOrTrackRef === "string" ? { participant: p, source: sourceOrTrackRef } : sourceOrTrackRef;
  const [isMuted, setIsMuted] = React15.useState(
    !!(((_a = ref.publication) == null ? void 0 : _a.isMuted) || ((_b = p.getTrackPublication(ref.source)) == null ? void 0 : _b.isMuted))
  );
  React15.useEffect(() => {
    const listener = mutedObserver(ref).subscribe(setIsMuted);
    return () => listener.unsubscribe();
  }, [getTrackReferenceId(ref)]);
  return isMuted;
}

// src/hooks/useIsSpeaking.ts
import { createIsSpeakingObserver } from "@livekit/components-core";
import * as React16 from "react";
function useIsSpeaking(participant) {
  const p = useEnsureParticipant(participant);
  const observable = React16.useMemo(() => createIsSpeakingObserver(p), [p]);
  const isSpeaking = useObservableState(observable, p.isSpeaking);
  return isSpeaking;
}

// src/hooks/useLiveKitRoom.ts
import { log, setupLiveKitRoom } from "@livekit/components-core";
import { Room, MediaDeviceFailure, RoomEvent, ConnectionState as ConnectionState2 } from "livekit-client";
import * as React17 from "react";
var defaultRoomProps = {
  connect: true,
  audio: false,
  video: false
};
function useLiveKitRoom(props) {
  const _a = __spreadValues(__spreadValues({}, defaultRoomProps), props), {
    token,
    serverUrl,
    options,
    room: passedRoom,
    connectOptions,
    connect,
    audio,
    video,
    screen,
    onConnected,
    onDisconnected,
    onError,
    onMediaDeviceFailure,
    onEncryptionError,
    simulateParticipants
  } = _a, rest = __objRest(_a, [
    "token",
    "serverUrl",
    "options",
    "room",
    "connectOptions",
    "connect",
    "audio",
    "video",
    "screen",
    "onConnected",
    "onDisconnected",
    "onError",
    "onMediaDeviceFailure",
    "onEncryptionError",
    "simulateParticipants"
  ]);
  if (options && passedRoom) {
    log.warn(
      "when using a manually created room, the options object will be ignored. set the desired options directly when creating the room instead."
    );
  }
  const [room, setRoom] = React17.useState();
  React17.useEffect(() => {
    setRoom(passedRoom != null ? passedRoom : new Room(options));
  }, [passedRoom]);
  const htmlProps = React17.useMemo(() => {
    const { className } = setupLiveKitRoom();
    return mergeProps(rest, { className });
  }, [rest]);
  React17.useEffect(() => {
    if (!room)
      return;
    const onSignalConnected = () => {
      const localP = room.localParticipant;
      log.debug("trying to publish local tracks");
      Promise.all([
        localP.setMicrophoneEnabled(!!audio, typeof audio !== "boolean" ? audio : void 0),
        localP.setCameraEnabled(!!video, typeof video !== "boolean" ? video : void 0),
        localP.setScreenShareEnabled(!!screen, typeof screen !== "boolean" ? screen : void 0)
      ]).catch((e) => {
        log.warn(e);
        onError == null ? void 0 : onError(e);
      });
    };
    const handleMediaDeviceError = (e) => {
      const mediaDeviceFailure = MediaDeviceFailure.getFailure(e);
      onMediaDeviceFailure == null ? void 0 : onMediaDeviceFailure(mediaDeviceFailure);
    };
    const handleEncryptionError = (e) => {
      onEncryptionError == null ? void 0 : onEncryptionError(e);
    };
    room.on(RoomEvent.SignalConnected, onSignalConnected).on(RoomEvent.MediaDevicesError, handleMediaDeviceError).on(RoomEvent.EncryptionError, handleEncryptionError);
    return () => {
      room.off(RoomEvent.SignalConnected, onSignalConnected).off(RoomEvent.MediaDevicesError, handleMediaDeviceError).off(RoomEvent.EncryptionError, handleEncryptionError);
    };
  }, [room, audio, video, screen, onError, onEncryptionError, onMediaDeviceFailure]);
  React17.useEffect(() => {
    if (!room)
      return;
    if (simulateParticipants) {
      room.simulateParticipants({
        participants: {
          count: simulateParticipants
        },
        publish: {
          audio: true,
          useRealTracks: true
        }
      });
      return;
    }
    if (!token) {
      log.debug("no token yet");
      return;
    }
    if (!serverUrl) {
      log.warn("no livekit url provided");
      onError == null ? void 0 : onError(Error("no livekit url provided"));
      return;
    }
    if (connect) {
      log.debug("connecting");
      room.connect(serverUrl, token, connectOptions).catch((e) => {
        log.warn(e);
        onError == null ? void 0 : onError(e);
      });
    } else {
      log.debug("disconnecting because connect is false");
      room.disconnect();
    }
  }, [
    connect,
    token,
    JSON.stringify(connectOptions),
    room,
    onError,
    serverUrl,
    simulateParticipants
  ]);
  React17.useEffect(() => {
    if (!room)
      return;
    const connectionStateChangeListener = (state) => {
      switch (state) {
        case ConnectionState2.Disconnected:
          if (onDisconnected)
            onDisconnected();
          break;
        case ConnectionState2.Connected:
          if (onConnected)
            onConnected();
          break;
        default:
          break;
      }
    };
    room.on(RoomEvent.ConnectionStateChanged, connectionStateChangeListener);
    return () => {
      room.off(RoomEvent.ConnectionStateChanged, connectionStateChangeListener);
    };
  }, [token, onConnected, onDisconnected, room]);
  React17.useEffect(() => {
    if (!room)
      return;
    return () => {
      log.info("disconnecting on onmount");
      room.disconnect();
    };
  }, [room]);
  return { room, htmlProps };
}

// src/hooks/useLocalParticipant.ts
import { observeParticipantMedia } from "@livekit/components-core";
import * as React18 from "react";
function useLocalParticipant(options = {}) {
  const room = useEnsureRoom(options.room);
  const [localParticipant, setLocalParticipant] = React18.useState(room.localParticipant);
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = React18.useState(
    localParticipant.isMicrophoneEnabled
  );
  const [isCameraEnabled, setIsCameraEnabled] = React18.useState(
    localParticipant.isMicrophoneEnabled
  );
  const [lastMicrophoneError, setLastMicrophoneError] = React18.useState(
    localParticipant.lastMicrophoneError
  );
  const [lastCameraError, setLastCameraError] = React18.useState(localParticipant.lastCameraError);
  const [isScreenShareEnabled, setIsScreenShareEnabled] = React18.useState(
    localParticipant.isMicrophoneEnabled
  );
  const [microphoneTrack, setMicrophoneTrack] = React18.useState(
    void 0
  );
  const [cameraTrack, setCameraTrack] = React18.useState(void 0);
  const handleUpdate = (media) => {
    setIsCameraEnabled(media.isCameraEnabled);
    setIsMicrophoneEnabled(media.isMicrophoneEnabled);
    setIsScreenShareEnabled(media.isScreenShareEnabled);
    setCameraTrack(media.cameraTrack);
    setMicrophoneTrack(media.microphoneTrack);
    setLastMicrophoneError(media.participant.lastMicrophoneError);
    setLastCameraError(media.participant.lastCameraError);
    setLocalParticipant(media.participant);
  };
  React18.useEffect(() => {
    const listener = observeParticipantMedia(room.localParticipant).subscribe(handleUpdate);
    return () => listener.unsubscribe();
  }, [room]);
  return {
    isMicrophoneEnabled,
    isScreenShareEnabled,
    isCameraEnabled,
    microphoneTrack,
    cameraTrack,
    lastMicrophoneError,
    lastCameraError,
    localParticipant
  };
}

// src/hooks/useLocalParticipantPermissions.ts
import { participantPermissionObserver } from "@livekit/components-core";
import * as React19 from "react";
function useLocalParticipantPermissions() {
  const room = useRoomContext();
  const permissionObserver = React19.useMemo(
    () => participantPermissionObserver(room.localParticipant),
    [room]
  );
  const permissions = useObservableState(permissionObserver, room.localParticipant.permissions);
  return permissions;
}

// src/hooks/useMediaDeviceSelect.ts
import { createMediaDeviceObserver, setupDeviceSelector, log as log2 } from "@livekit/components-core";
import * as React20 from "react";
function useMediaDeviceSelect({
  kind,
  room,
  track,
  requestPermissions,
  onError
}) {
  const roomContext = useMaybeRoomContext();
  const deviceObserver = React20.useMemo(
    () => createMediaDeviceObserver(kind, onError, requestPermissions),
    [kind, requestPermissions, onError]
  );
  const devices = useObservableState(deviceObserver, []);
  const [currentDeviceId, setCurrentDeviceId] = React20.useState("");
  const { className, activeDeviceObservable, setActiveMediaDevice } = React20.useMemo(
    () => setupDeviceSelector(kind, room != null ? room : roomContext, track),
    [kind, room, roomContext, track]
  );
  React20.useEffect(() => {
    const listener = activeDeviceObservable.subscribe((deviceId) => {
      log2.info("setCurrentDeviceId", deviceId);
      if (deviceId)
        setCurrentDeviceId(deviceId);
    });
    return () => {
      listener == null ? void 0 : listener.unsubscribe();
    };
  }, [activeDeviceObservable]);
  return { devices, className, activeDeviceId: currentDeviceId, setActiveMediaDevice };
}

// src/hooks/useMediaDevices.ts
import * as React21 from "react";
import { createMediaDeviceObserver as createMediaDeviceObserver2 } from "@livekit/components-core";
function useMediaDevices({
  kind,
  onError
}) {
  const deviceObserver = React21.useMemo(
    () => createMediaDeviceObserver2(kind, onError),
    [kind, onError]
  );
  const devices = useObservableState(deviceObserver, []);
  return devices;
}

// src/hooks/usePagination.ts
import * as React23 from "react";

// src/hooks/useVisualStableUpdate.ts
import { log as log3, sortTrackReferences, updatePages } from "@livekit/components-core";
import * as React22 from "react";
function useVisualStableUpdate(trackReferences, maxItemsOnPage, options = {}) {
  const lastTrackRefs = React22.useRef([]);
  const lastMaxItemsOnPage = React22.useRef(-1);
  const layoutChanged = maxItemsOnPage !== lastMaxItemsOnPage.current;
  const sortedTrackRefs = typeof options.customSortFunction === "function" ? options.customSortFunction(trackReferences) : sortTrackReferences(trackReferences);
  let updatedTrackRefs = [...sortedTrackRefs];
  if (layoutChanged === false) {
    try {
      updatedTrackRefs = updatePages(lastTrackRefs.current, sortedTrackRefs, maxItemsOnPage);
    } catch (error) {
      log3.error("Error while running updatePages(): ", error);
    }
  }
  if (layoutChanged) {
    lastTrackRefs.current = sortedTrackRefs;
  } else {
    lastTrackRefs.current = updatedTrackRefs;
  }
  lastMaxItemsOnPage.current = maxItemsOnPage;
  return updatedTrackRefs;
}

// src/hooks/usePagination.ts
function usePagination(itemPerPage, trackReferences) {
  const [currentPage, setCurrentPage] = React23.useState(1);
  const totalPageCount = Math.max(Math.ceil(trackReferences.length / itemPerPage), 1);
  if (currentPage > totalPageCount) {
    setCurrentPage(totalPageCount);
  }
  const lastItemIndex = currentPage * itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  const changePage = (direction) => {
    setCurrentPage((state) => {
      if (direction === "next") {
        if (state === totalPageCount) {
          return state;
        }
        return state + 1;
      } else {
        if (state === 1) {
          return state;
        }
        return state - 1;
      }
    });
  };
  const goToPage = (num) => {
    if (num > totalPageCount) {
      setCurrentPage(totalPageCount);
    } else if (num < 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(num);
    }
  };
  const updatedTrackReferences = useVisualStableUpdate(trackReferences, itemPerPage);
  const tracksOnPage = updatedTrackReferences.slice(firstItemIndex, lastItemIndex);
  return {
    totalPageCount,
    nextPage: () => changePage("next"),
    prevPage: () => changePage("previous"),
    setPage: goToPage,
    firstItemIndex,
    lastItemIndex,
    tracks: tracksOnPage,
    currentPage
  };
}

// src/hooks/useParticipantInfo.ts
import { participantInfoObserver } from "@livekit/components-core";
import * as React24 from "react";
function useParticipantInfo(props = {}) {
  const p = useEnsureParticipant(props.participant);
  const infoObserver = React24.useMemo(() => participantInfoObserver(p), [p]);
  const { identity, name, metadata } = useObservableState(infoObserver, {
    name: p.name,
    identity: p.identity,
    metadata: p.metadata
  });
  return { identity, name, metadata };
}

// src/hooks/useParticipantPermissions.ts
import { participantPermissionObserver as participantPermissionObserver2 } from "@livekit/components-core";
import * as React25 from "react";
function useParticipantPermissions(options = {}) {
  const p = useEnsureParticipant(options.participant);
  const permissionObserver = React25.useMemo(() => participantPermissionObserver2(p), [p]);
  const permissions = useObservableState(permissionObserver, p.permissions);
  return permissions;
}

// src/hooks/useParticipantTile.ts
import { setupParticipantTile } from "@livekit/components-core";
import * as React26 from "react";
import { Track } from "livekit-client";
function useParticipantTile({
  trackRef,
  onParticipantClick,
  disableSpeakingIndicator,
  htmlProps
}) {
  const trackReference = useEnsureTrackRef(trackRef);
  const mergedProps = React26.useMemo(() => {
    const { className } = setupParticipantTile();
    return mergeProps(htmlProps, {
      className,
      onClick: (event) => {
        var _a, _b;
        (_a = htmlProps.onClick) == null ? void 0 : _a.call(htmlProps, event);
        if (typeof onParticipantClick === "function") {
          const track = (_b = trackReference.publication) != null ? _b : trackReference.participant.getTrackPublication(trackReference.source);
          onParticipantClick({ participant: trackReference.participant, track });
        }
      }
    });
  }, [
    htmlProps,
    onParticipantClick,
    trackReference.publication,
    trackReference.source,
    trackReference.participant
  ]);
  const micTrack = trackReference.participant.getTrackPublication(Track.Source.Microphone);
  const micRef = React26.useMemo(() => {
    return {
      participant: trackReference.participant,
      source: Track.Source.Microphone,
      publication: micTrack
    };
  }, [micTrack, trackReference.participant]);
  const isVideoMuted = useIsMuted(trackReference);
  const isAudioMuted = useIsMuted(micRef);
  const isSpeaking = useIsSpeaking(trackReference.participant);
  const facingMode = useFacingMode(trackReference);
  return {
    elementProps: __spreadValues({
      "data-lk-audio-muted": isAudioMuted,
      "data-lk-video-muted": isVideoMuted,
      "data-lk-speaking": disableSpeakingIndicator === true ? false : isSpeaking,
      "data-lk-local-participant": trackReference.participant.isLocal,
      "data-lk-source": trackReference.source,
      "data-lk-facing-mode": facingMode
    }, mergedProps)
  };
}

// src/hooks/useRemoteParticipants.ts
import { connectedParticipantsObserver } from "@livekit/components-core";
import * as React27 from "react";
function useRemoteParticipants(options = {}) {
  const room = useEnsureRoom(options.room);
  const [participants, setParticipants] = React27.useState([]);
  React27.useEffect(() => {
    const listener = connectedParticipantsObserver(room, {
      additionalRoomEvents: options.updateOnlyOn
    }).subscribe(setParticipants);
    return () => listener.unsubscribe();
  }, [room, JSON.stringify(options.updateOnlyOn)]);
  return participants;
}

// src/hooks/useParticipants.ts
import * as React28 from "react";
function useParticipants(options = {}) {
  const remoteParticipants = useRemoteParticipants(options);
  const { localParticipant } = useLocalParticipant(options);
  return React28.useMemo(
    () => [localParticipant, ...remoteParticipants],
    [localParticipant, remoteParticipants]
  );
}

// src/hooks/usePinnedTracks.ts
import * as React29 from "react";
function usePinnedTracks(layoutContext) {
  layoutContext = useEnsureLayoutContext(layoutContext);
  return React29.useMemo(() => {
    if ((layoutContext == null ? void 0 : layoutContext.pin.state) !== void 0 && layoutContext.pin.state.length >= 1) {
      return layoutContext.pin.state;
    }
    return [];
  }, [layoutContext.pin.state]);
}
function usePinnedElementTracks(layoutContext) {
  layoutContext = useEnsureLayoutContext(layoutContext);
  return React29.useMemo(() => {
    if ((layoutContext == null ? void 0 : layoutContext.pinElement.state) !== void 0 && layoutContext.pinElement.state.length >= 1) {
      return layoutContext.pinElement.state;
    }
    return [];
  }, [layoutContext.pinElement.state]);
}

// src/hooks/useRemoteParticipant.ts
import { connectedParticipantObserver } from "@livekit/components-core";
import * as React30 from "react";
function useRemoteParticipant(identity, options = {}) {
  const room = useRoomContext();
  const [updateOnlyOn] = React30.useState(options.updateOnlyOn);
  const observable = React30.useMemo(
    () => connectedParticipantObserver(room, identity, { additionalEvents: updateOnlyOn }),
    [room, identity, updateOnlyOn]
  );
  const participant = useObservableState(
    observable,
    room.getParticipantByIdentity(identity)
  );
  return participant;
}

// src/hooks/useRoomInfo.ts
import { roomInfoObserver } from "@livekit/components-core";
import * as React31 from "react";
function useRoomInfo(options = {}) {
  const room = useEnsureRoom(options.room);
  const infoObserver = React31.useMemo(() => roomInfoObserver(room), [room]);
  const { name, metadata } = useObservableState(infoObserver, {
    name: room.name,
    metadata: room.metadata
  });
  return { name, metadata };
}

// src/hooks/useSortedParticipants.ts
import { sortParticipants } from "@livekit/components-core";
import * as React33 from "react";

// src/hooks/useSpeakingParticipants.ts
import { activeSpeakerObserver } from "@livekit/components-core";
import * as React32 from "react";
function useSpeakingParticipants() {
  const room = useRoomContext();
  const speakerObserver = React32.useMemo(() => activeSpeakerObserver(room), [room]);
  const activeSpeakers = useObservableState(speakerObserver, room.activeSpeakers);
  return activeSpeakers;
}

// src/hooks/useSortedParticipants.ts
function useSortedParticipants(participants) {
  const [sortedParticipants, setSortedParticipants] = React33.useState(
    sortParticipants(participants)
  );
  const activeSpeakers = useSpeakingParticipants();
  React33.useEffect(() => {
    setSortedParticipants(sortParticipants(participants));
  }, [activeSpeakers, participants]);
  return sortedParticipants;
}

// src/hooks/useStartAudio.ts
import { setupStartAudio } from "@livekit/components-core";
import * as React34 from "react";
function useStartAudio({ room, props }) {
  const roomEnsured = useEnsureRoom(room);
  const { className, roomAudioPlaybackAllowedObservable: roomAudioPlaybackAllowedObservable2, handleStartAudioPlayback } = React34.useMemo(
    () => setupStartAudio(),
    []
  );
  const observable = React34.useMemo(
    () => roomAudioPlaybackAllowedObservable2(roomEnsured),
    [roomEnsured, roomAudioPlaybackAllowedObservable2]
  );
  const { canPlayAudio } = useObservableState(observable, {
    canPlayAudio: roomEnsured.canPlaybackAudio
  });
  const mergedProps = React34.useMemo(
    () => mergeProps(props, {
      className,
      onClick: () => {
        handleStartAudioPlayback(roomEnsured);
      },
      style: { display: canPlayAudio ? "none" : "block" }
    }),
    [props, className, canPlayAudio, handleStartAudioPlayback, roomEnsured]
  );
  return { mergedProps, canPlayAudio };
}

// src/hooks/useStartVideo.ts
import { setupStartVideo } from "@livekit/components-core";
import * as React35 from "react";
function useStartVideo({ room, props }) {
  const roomEnsured = useEnsureRoom(room);
  const { className, roomVideoPlaybackAllowedObservable, handleStartVideoPlayback } = React35.useMemo(
    () => setupStartVideo(),
    []
  );
  const observable = React35.useMemo(
    () => roomVideoPlaybackAllowedObservable(roomEnsured),
    [roomEnsured, roomVideoPlaybackAllowedObservable]
  );
  const { canPlayVideo } = useObservableState(observable, {
    canPlayVideo: roomEnsured.canPlaybackVideo
  });
  const mergedProps = React35.useMemo(
    () => mergeProps(props, {
      className,
      onClick: () => {
        handleStartVideoPlayback(roomEnsured);
      },
      style: { display: canPlayVideo ? "none" : "block" }
    }),
    [props, className, canPlayVideo, handleStartVideoPlayback, roomEnsured]
  );
  return { mergedProps, canPlayVideo };
}

// src/hooks/useSwipe.ts
import * as React36 from "react";
function useSwipe(element, options = {}) {
  var _a;
  const touchStart = React36.useRef(null);
  const touchEnd = React36.useRef(null);
  const minSwipeDistance = (_a = options.minSwipeDistance) != null ? _a : 50;
  const onTouchStart = (event) => {
    touchEnd.current = null;
    touchStart.current = event.targetTouches[0].clientX;
  };
  const onTouchMove = (event) => {
    touchEnd.current = event.targetTouches[0].clientX;
  };
  const onTouchEnd = React36.useCallback(() => {
    if (!touchStart.current || !touchEnd.current) {
      return;
    }
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe && options.onLeftSwipe)
      options.onLeftSwipe();
    if (isRightSwipe && options.onRightSwipe)
      options.onRightSwipe();
  }, [minSwipeDistance, options]);
  React36.useEffect(() => {
    const elementCopy = element.current;
    if (elementCopy) {
      elementCopy.addEventListener("touchstart", onTouchStart, { passive: true });
      elementCopy.addEventListener("touchmove", onTouchMove, { passive: true });
      elementCopy.addEventListener("touchend", onTouchEnd, { passive: true });
    }
    return () => {
      if (elementCopy) {
        elementCopy.removeEventListener("touchstart", onTouchStart);
        elementCopy.removeEventListener("touchmove", onTouchMove);
        elementCopy.removeEventListener("touchend", onTouchEnd);
      }
    };
  }, [element, onTouchEnd]);
}

// src/hooks/useChatToggle.ts
import { setupChatToggle } from "@livekit/components-core";
import * as React37 from "react";
function useChatToggle({ props }) {
  const { dispatch, state } = useLayoutContext().widget;
  const { className } = React37.useMemo(() => setupChatToggle(), []);
  const mergedProps = React37.useMemo(() => {
    return mergeProps(props, {
      className,
      onClick: () => {
        if (dispatch)
          dispatch({ msg: "toggle_chat" });
      },
      "aria-pressed": (state == null ? void 0 : state.showChat) == "show_chat" ? "true" : "false",
      "data-lk-unread-msgs": state ? state.unreadMessages < 10 ? state.unreadMessages.toFixed(0) : "9+" : "0"
    });
  }, [props, className, dispatch, state]);
  return { mergedProps };
}

// src/hooks/useToken.ts
import { log as log4 } from "@livekit/components-core";
import * as React38 from "react";
function useToken(tokenEndpoint, roomName, options = {}) {
  const [token, setToken] = React38.useState(void 0);
  React38.useEffect(() => {
    var _a;
    if (tokenEndpoint === void 0) {
      throw Error("token endpoint needs to be defined");
    }
    if (((_a = options.userInfo) == null ? void 0 : _a.identity) === void 0) {
      return;
    }
    const tokenFetcher = () => __async(this, null, function* () {
      log4.debug("fetching token");
      const params = new URLSearchParams(__spreadProps(__spreadValues({}, options.userInfo), { roomName }));
      const res = yield fetch(`${tokenEndpoint}?${params.toString()}`);
      if (!res.ok) {
        log4.error(
          `Could not fetch token. Server responded with status ${res.status}: ${res.statusText}`
        );
        return;
      }
      const { accessToken } = yield res.json();
      setToken(accessToken);
    });
    tokenFetcher();
  }, [tokenEndpoint, roomName, JSON.stringify(options)]);
  return token;
}

// src/hooks/useTrackMutedIndicator.ts
import {
  setupTrackMutedIndicator,
  getTrackReferenceId as getTrackReferenceId2
} from "@livekit/components-core";
import * as React39 from "react";
function useTrackMutedIndicator(trackRef) {
  var _a, _b;
  const trackReference = useEnsureTrackRef(trackRef);
  const { className, mediaMutedObserver } = React39.useMemo(
    () => setupTrackMutedIndicator(trackReference),
    [getTrackReferenceId2(trackReference)]
  );
  const isMuted = useObservableState(
    mediaMutedObserver,
    !!(((_a = trackReference.publication) == null ? void 0 : _a.isMuted) || ((_b = trackReference.participant.getTrackPublication(trackReference.source)) == null ? void 0 : _b.isMuted))
  );
  return { isMuted, className };
}

// src/hooks/useTrackToggle.ts
import { setupMediaToggle, setupManualToggle, log as log5 } from "@livekit/components-core";
import * as React40 from "react";
function useTrackToggle(_a) {
  var _b = _a, {
    source,
    onChange,
    initialState,
    captureOptions
  } = _b, rest = __objRest(_b, [
    "source",
    "onChange",
    "initialState",
    "captureOptions"
  ]);
  var _a2;
  const room = useMaybeRoomContext();
  const track = (_a2 = room == null ? void 0 : room.localParticipant) == null ? void 0 : _a2.getTrackPublication(source);
  const userInteractionRef = React40.useRef(false);
  const { toggle, className, pendingObserver, enabledObserver } = React40.useMemo(
    () => room ? setupMediaToggle(source, room, captureOptions) : setupManualToggle(),
    [room, source, JSON.stringify(captureOptions)]
  );
  const pending = useObservableState(pendingObserver, false);
  const enabled = useObservableState(enabledObserver, initialState != null ? initialState : !!(track == null ? void 0 : track.isEnabled));
  React40.useEffect(() => {
    onChange == null ? void 0 : onChange(enabled, userInteractionRef.current);
    userInteractionRef.current = false;
  }, [enabled, onChange]);
  React40.useEffect(() => {
    if (initialState !== void 0) {
      log5.debug("forcing initial toggle state", source, initialState);
      toggle(initialState);
    }
  }, []);
  const newProps = React40.useMemo(() => mergeProps(rest, { className }), [rest, className]);
  const clickHandler = React40.useCallback(
    (evt) => {
      var _a3;
      userInteractionRef.current = true;
      toggle().finally(() => userInteractionRef.current = false);
      (_a3 = rest.onClick) == null ? void 0 : _a3.call(rest, evt);
    },
    [rest, toggle]
  );
  return {
    toggle,
    enabled,
    pending,
    track,
    buttonProps: __spreadProps(__spreadValues({}, newProps), {
      "aria-pressed": enabled,
      "data-lk-source": source,
      "data-lk-enabled": enabled,
      disabled: pending,
      onClick: clickHandler
    })
  };
}

// src/hooks/useTracks.ts
import {
  isSourcesWithOptions,
  isSourceWitOptions,
  log as log6,
  trackReferencesObservable
} from "@livekit/components-core";
import { Track as Track2 } from "livekit-client";
import * as React41 from "react";
function useTracks(sources = [
  Track2.Source.Camera,
  Track2.Source.Microphone,
  Track2.Source.ScreenShare,
  Track2.Source.ScreenShareAudio,
  Track2.Source.Unknown
], options = {}) {
  const room = useEnsureRoom(options.room);
  const [trackReferences, setTrackReferences] = React41.useState([]);
  const [participants, setParticipants] = React41.useState([]);
  const sources_ = React41.useMemo(() => {
    return sources.map((s) => isSourceWitOptions(s) ? s.source : s);
  }, [JSON.stringify(sources)]);
  React41.useEffect(() => {
    const subscription = trackReferencesObservable(room, sources_, {
      additionalRoomEvents: options.updateOnlyOn,
      onlySubscribed: options.onlySubscribed
    }).subscribe(({ trackReferences: trackReferences2, participants: participants2 }) => {
      log6.debug("setting track bundles", trackReferences2, participants2);
      setTrackReferences(trackReferences2);
      setParticipants(participants2);
    });
    return () => subscription.unsubscribe();
  }, [
    room,
    JSON.stringify(options.onlySubscribed),
    JSON.stringify(options.updateOnlyOn),
    JSON.stringify(sources)
  ]);
  const maybeTrackReferences = React41.useMemo(() => {
    if (isSourcesWithOptions(sources)) {
      const requirePlaceholder = requiredPlaceholders(sources, participants);
      const trackReferencesWithPlaceholders = Array.from(trackReferences);
      participants.forEach((participant) => {
        var _a;
        if (requirePlaceholder.has(participant.identity)) {
          const sourcesToAddPlaceholder = (_a = requirePlaceholder.get(participant.identity)) != null ? _a : [];
          sourcesToAddPlaceholder.forEach((placeholderSource) => {
            if (trackReferences.find(
              ({ participant: p, publication }) => participant.identity === p.identity && publication.source === placeholderSource
            )) {
              return;
            }
            log6.debug(
              `Add ${placeholderSource} placeholder for participant ${participant.identity}.`
            );
            const placeholder = {
              participant,
              source: placeholderSource
            };
            trackReferencesWithPlaceholders.push(placeholder);
          });
        }
      });
      return trackReferencesWithPlaceholders;
    } else {
      return trackReferences;
    }
  }, [trackReferences, participants, sources]);
  return maybeTrackReferences;
}
function difference(setA, setB) {
  const _difference = new Set(setA);
  for (const elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}
function requiredPlaceholders(sources, participants) {
  const placeholderMap = /* @__PURE__ */ new Map();
  if (isSourcesWithOptions(sources)) {
    const sourcesThatNeedPlaceholder = sources.filter((sourceWithOption) => sourceWithOption.withPlaceholder).map((sourceWithOption) => sourceWithOption.source);
    participants.forEach((participant) => {
      const sourcesOfSubscribedTracks = participant.getTrackPublications().map((pub) => {
        var _a;
        return (_a = pub.track) == null ? void 0 : _a.source;
      }).filter((trackSource) => trackSource !== void 0);
      const placeholderNeededForThisParticipant = Array.from(
        difference(new Set(sourcesThatNeedPlaceholder), new Set(sourcesOfSubscribedTracks))
      );
      if (placeholderNeededForThisParticipant.length > 0) {
        placeholderMap.set(participant.identity, placeholderNeededForThisParticipant);
      }
    });
  }
  return placeholderMap;
}

// src/hooks/useTrackRefBySourceOrName.ts
import { setupMediaTrack, getTrackByIdentifier } from "@livekit/components-core";
import * as React42 from "react";
import { Track as Track3 } from "livekit-client";
function useTrackRefBySourceOrName(source) {
  var _a, _b;
  const [publication, setPublication] = React42.useState(getTrackByIdentifier(source));
  const { trackObserver } = React42.useMemo(() => {
    return setupMediaTrack(source);
  }, [(_a = source.participant.sid) != null ? _a : source.participant.identity, source.source]);
  React42.useEffect(() => {
    const subscription = trackObserver.subscribe((publication2) => {
      setPublication(publication2);
    });
    return () => subscription == null ? void 0 : subscription.unsubscribe();
  }, [trackObserver]);
  return {
    participant: source.participant,
    source: (_b = source.source) != null ? _b : Track3.Source.Unknown,
    publication
  };
}

// src/hooks/useTrackByName.ts
function useTrackByName(name, participant) {
  const p = useEnsureParticipant(participant);
  return useTrackRefBySourceOrName({ name, participant: p });
}

// src/hooks/useChat.ts
import { setupChat } from "@livekit/components-core";
import * as React43 from "react";
function useChat(options) {
  const room = useRoomContext();
  const [setup, setSetup] = React43.useState();
  const isSending = useObservableState(setup == null ? void 0 : setup.isSendingObservable, false);
  const chatMessages = useObservableState(setup == null ? void 0 : setup.messageObservable, []);
  React43.useEffect(() => {
    const setupChatReturn = setupChat(room, options);
    setSetup(setupChatReturn);
  }, [room, options]);
  return { send: setup == null ? void 0 : setup.send, update: setup == null ? void 0 : setup.update, chatMessages, isSending };
}

// src/hooks/useWhiteboard.ts
import React44 from "react";
function useWhiteboard() {
  const { metadata } = useRoomInfo();
  const room = useRoomContext();
  const [isWhiteboardShared, setIsWhiteboardShared] = React44.useState(false);
  const [isWhiteboardHost, setIsWhiteboardHost] = React44.useState(true);
  const [url, setUrl] = React44.useState(null);
  React44.useEffect(() => {
    let meta = JSON.parse(metadata || "{}");
    if (meta) {
      if (meta == null ? void 0 : meta.whiteboard_domain) {
        let url2 = `${meta == null ? void 0 : meta.whiteboard_domain}?whiteboardid=${room.name}`;
        if (room.localParticipant.name) {
          url2 += `&username=${room.localParticipant.name}`;
        }
        setUrl(url2);
      } else {
        setUrl("/");
      }
      if (meta == null ? void 0 : meta.whiteboard) {
        setIsWhiteboardShared(meta == null ? void 0 : meta.whiteboard);
      } else {
        setIsWhiteboardShared(false);
      }
      if ((meta == null ? void 0 : meta.whiteboard_host) == room.localParticipant.identity) {
        setIsWhiteboardHost(true);
      } else {
        setIsWhiteboardHost(false);
      }
    }
  }, [metadata]);
  return { isWhiteboardShared, isWhiteboardHost, url };
}

// src/hooks/usePersistentUserChoices.ts
import { loadUserChoices, saveUserChoices } from "@livekit/components-core";
import * as React45 from "react";
function usePersistentUserChoices(options = {}) {
  var _a;
  const [userChoices, setSettings] = React45.useState(
    loadUserChoices(options.defaults, (_a = options.preventLoad) != null ? _a : false)
  );
  const saveAudioInputEnabled = React45.useCallback((isEnabled) => {
    setSettings((prev) => __spreadProps(__spreadValues({}, prev), { audioEnabled: isEnabled }));
  }, []);
  const saveVideoInputEnabled = React45.useCallback((isEnabled) => {
    setSettings((prev) => __spreadProps(__spreadValues({}, prev), { videoEnabled: isEnabled }));
  }, []);
  const saveAudioInputDeviceId = React45.useCallback((deviceId) => {
    setSettings((prev) => __spreadProps(__spreadValues({}, prev), { audioDeviceId: deviceId }));
  }, []);
  const saveVideoInputDeviceId = React45.useCallback((deviceId) => {
    setSettings((prev) => __spreadProps(__spreadValues({}, prev), { videoDeviceId: deviceId }));
  }, []);
  const saveUsername = React45.useCallback((username) => {
    setSettings((prev) => __spreadProps(__spreadValues({}, prev), { username }));
  }, []);
  React45.useEffect(() => {
    var _a2;
    saveUserChoices(userChoices, (_a2 = options.preventSave) != null ? _a2 : false);
  }, [userChoices, options.preventSave]);
  return {
    userChoices,
    saveAudioInputEnabled,
    saveVideoInputEnabled,
    saveAudioInputDeviceId,
    saveVideoInputDeviceId,
    saveUsername
  };
}

// src/hooks/useIsEncrypted.ts
import * as React46 from "react";
import { LocalParticipant } from "livekit-client";
import { encryptionStatusObservable } from "@livekit/components-core";
function useIsEncrypted(participant) {
  const p = useEnsureParticipant(participant);
  const room = useEnsureRoom();
  const observer = React46.useMemo(() => encryptionStatusObservable(room, p), [room, p]);
  const isEncrypted = useObservableState(
    observer,
    p instanceof LocalParticipant ? p.isE2EEEnabled : p.isEncrypted
  );
  return isEncrypted;
}

// src/hooks/useTrackVolume.ts
import * as React47 from "react";
import { Track as Track4, createAudioAnalyser } from "livekit-client";
import {
  isTrackReference
} from "@livekit/components-core";
var useTrackVolume = (trackOrTrackReference, options = { fftSize: 32, smoothingTimeConstant: 0 }) => {
  const track = isTrackReference(trackOrTrackReference) ? trackOrTrackReference.publication.track : trackOrTrackReference;
  const [volume, setVolume] = React47.useState(0);
  React47.useEffect(() => {
    if (!track || !track.mediaStream) {
      return;
    }
    const { cleanup, analyser } = createAudioAnalyser(track, options);
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const updateVolume = () => {
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const a = dataArray[i];
        sum += a * a;
      }
      setVolume(Math.sqrt(sum / dataArray.length) / 255);
    };
    const interval = setInterval(updateVolume, 1e3 / 30);
    return () => {
      cleanup();
      clearInterval(interval);
    };
  }, [track, track == null ? void 0 : track.mediaStream, JSON.stringify(options)]);
  return volume;
};
var normalizeFrequencies = (frequencies) => {
  const normalizeDb = (value) => {
    const minDb = -100;
    const maxDb = -10;
    let db = 1 - Math.max(minDb, Math.min(maxDb, value)) * -1 / 100;
    db = Math.sqrt(db);
    return db;
  };
  return frequencies.map((value) => {
    if (value === -Infinity) {
      return 0;
    }
    return normalizeDb(value);
  });
};
var multibandDefaults = {
  bands: 5,
  loPass: 100,
  hiPass: 600,
  updateInterval: 10,
  analyserOptions: { fftSize: 2048 }
};
var useMultibandTrackVolume = (trackOrTrackReference, options = {}) => {
  var _a;
  const track = trackOrTrackReference instanceof Track4 ? trackOrTrackReference : (_a = trackOrTrackReference == null ? void 0 : trackOrTrackReference.publication) == null ? void 0 : _a.track;
  const [frequencyBands, setFrequencyBands] = React47.useState([]);
  const opts = __spreadValues(__spreadValues({}, multibandDefaults), options);
  React47.useEffect(() => {
    if (!track || !(track == null ? void 0 : track.mediaStream)) {
      return;
    }
    const { analyser, cleanup } = createAudioAnalyser(track, opts.analyserOptions);
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);
    const updateVolume = () => {
      analyser.getFloatFrequencyData(dataArray);
      let frequencies = new Float32Array(dataArray.length);
      for (let i = 0; i < dataArray.length; i++) {
        frequencies[i] = dataArray[i];
      }
      frequencies = frequencies.slice(options.loPass, options.hiPass);
      const normalizedFrequencies = normalizeFrequencies(frequencies);
      const chunkSize = Math.ceil(normalizedFrequencies.length / opts.bands);
      const chunks = [];
      for (let i = 0; i < opts.bands; i++) {
        const summedVolumes = normalizedFrequencies.slice(i * chunkSize, (i + 1) * chunkSize).reduce((acc, val) => acc += val, 0);
        chunks.push(summedVolumes / chunkSize);
      }
      setFrequencyBands(chunks);
    };
    const interval = setInterval(updateVolume, opts.updateInterval);
    return () => {
      cleanup();
      clearInterval(interval);
    };
  }, [track, track == null ? void 0 : track.mediaStream, JSON.stringify(options)]);
  return frequencyBands;
};

// src/hooks/useParticipantTracks.ts
import * as React48 from "react";
import { participantTracksObservable } from "@livekit/components-core";
function useParticipantTracks(sources, participantIdentity) {
  const room = useRoomContext();
  const participantContext = useMaybeParticipantContext();
  const p = participantIdentity ? room.getParticipantByIdentity(participantIdentity) : participantContext;
  const observable = React48.useMemo(
    () => p ? participantTracksObservable(p, { sources }) : void 0,
    [p == null ? void 0 : p.sid, p == null ? void 0 : p.identity, JSON.stringify(sources)]
  );
  const trackRefs = useObservableState(observable, []);
  return trackRefs;
}
export {
  useAudioPlayback,
  useChat,
  useChatToggle,
  useClearPinButton,
  useConnectionQualityIndicator,
  useConnectionState,
  useDataChannel,
  useDisconnectButton,
  useFacingMode,
  useFocusToggle,
  useGridLayout,
  useIsEncrypted,
  useIsMuted,
  useIsSpeaking,
  useLiveKitRoom,
  useLocalParticipant,
  useLocalParticipantPermissions,
  useMediaDeviceSelect,
  useMediaDevices,
  useMultibandTrackVolume,
  usePagination,
  useParticipantInfo,
  useParticipantPermissions,
  useParticipantTile,
  useParticipantTracks,
  useParticipants,
  usePersistentUserChoices,
  usePinnedElementTracks,
  usePinnedTracks,
  useRemoteParticipant,
  useRemoteParticipants,
  useRoomInfo,
  useSortedParticipants,
  useSpeakingParticipants,
  useStartAudio,
  useStartVideo,
  useSwipe,
  useToken,
  useTrackByName,
  useTrackMutedIndicator,
  useTrackToggle,
  useTrackVolume,
  useTracks,
  useVisualStableUpdate,
  useWhiteboard
};
//# sourceMappingURL=index.mjs.map