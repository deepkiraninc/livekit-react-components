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

// src/prefabs/Chat.tsx
import * as React10 from "react";

// src/context/layout-context.ts
import { PIN_DEFAULT_STATE, WIDGET_DEFAULT_STATE } from "@livekit/components-core";
import * as React from "react";

// src/context/chat-context.ts
function chatReducer(state, action) {
  if (action.msg && action.msg !== state.showChat) {
    if (action.msg === "show_chat") {
      return __spreadProps(__spreadValues({}, state), { showChat: "show_chat", unreadMessages: 0 });
    } else if (action.msg === "toggle_chat") {
      const newState = __spreadProps(__spreadValues({}, state), { showChat: state.showChat == "show_chat" ? null : "show_chat" });
      if (newState.showChat === "show_chat") {
        newState.unreadMessages = 0;
      }
      return newState;
    } else if (action.msg === "show_invite") {
      return __spreadProps(__spreadValues({}, state), { showChat: "show_invite" });
    } else if (action.msg === "show_users") {
      return __spreadProps(__spreadValues({}, state), { showChat: "show_users" });
    } else if (action.msg === "unread_msg") {
      return __spreadProps(__spreadValues({}, state), { unreadMessages: action.count });
    } else if (action.msg === "hide_chat") {
      return __spreadProps(__spreadValues({}, state), { showChat: null });
    } else {
      return __spreadProps(__spreadValues({}, state), { showChat: null });
    }
  } else {
    return __spreadProps(__spreadValues({}, state), { showChat: null });
  }
}

// src/context/pin-context.ts
function pinReducer(state, action) {
  if (action.msg === "set_pin") {
    return [action.trackReference];
  } else if (action.msg === "clear_pin") {
    return [];
  } else {
    return __spreadValues({}, state);
  }
}

// src/context/layout-context.ts
var LayoutContext = React.createContext(void 0);
function useLayoutContext() {
  const layoutContext = React.useContext(LayoutContext);
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
function useCreateLayoutContext() {
  const [pinState, pinDispatch] = React.useReducer(pinReducer, PIN_DEFAULT_STATE);
  const [widgetState, widgetDispatch] = React.useReducer(chatReducer, WIDGET_DEFAULT_STATE);
  return {
    pin: { dispatch: pinDispatch, state: pinState },
    widget: { dispatch: widgetDispatch, state: widgetState }
  };
}
function useEnsureCreateLayoutContext(layoutContext) {
  const [pinState, pinDispatch] = React.useReducer(pinReducer, PIN_DEFAULT_STATE);
  const [widgetState, widgetDispatch] = React.useReducer(chatReducer, WIDGET_DEFAULT_STATE);
  return layoutContext != null ? layoutContext : {
    pin: { dispatch: pinDispatch, state: pinState },
    widget: { dispatch: widgetDispatch, state: widgetState }
  };
}
function useMaybeLayoutContext() {
  return React.useContext(LayoutContext);
}

// src/context/participant-context.ts
import * as React3 from "react";

// src/context/track-reference-context.ts
import * as React2 from "react";
var TrackRefContext = React2.createContext(
  void 0
);
function useMaybeTrackRefContext() {
  return React2.useContext(TrackRefContext);
}

// src/context/participant-context.ts
var ParticipantContext = React3.createContext(void 0);
function useMaybeParticipantContext() {
  return React3.useContext(ParticipantContext);
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
import * as React4 from "react";
var RoomContext = React4.createContext(void 0);
function useRoomContext() {
  const ctx = React4.useContext(RoomContext);
  if (!ctx) {
    throw Error("tried to access room context outside of livekit room component");
  }
  return ctx;
}
function useMaybeRoomContext() {
  return React4.useContext(RoomContext);
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

// src/context/feature-context.ts
import * as React5 from "react";
var LKFeatureContext = React5.createContext(void 0);
function useFeatureContext(require2) {
  const ctx = React5.useContext(LKFeatureContext);
  if (require2 === true) {
    if (ctx) {
      return ctx;
    } else {
      throw Error("tried to access feature context, but none is present");
    }
  }
  return ctx;
}

// src/utils.ts
import * as React6 from "react";

// src/mergeProps.ts
import clsx from "clsx";
function chain(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
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

// src/utils.ts
function isProp(prop) {
  return prop !== void 0;
}
function mergeProps2(...props) {
  return mergeProps(...props.filter(isProp));
}
function cloneSingleChild(children, props, key) {
  return React6.Children.map(children, (child) => {
    if (React6.isValidElement(child) && React6.Children.only(children)) {
      return React6.cloneElement(child, __spreadProps(__spreadValues({}, props), { key }));
    }
    return child;
  });
}

// src/hooks/useChat.ts
import { setupChat } from "@livekit/components-core";
import * as React8 from "react";

// src/hooks/internal/useObservableState.ts
import * as React7 from "react";
function useObservableState(observable, startWith) {
  const [state, setState] = React7.useState(startWith);
  React7.useEffect(() => {
    if (typeof window === "undefined" || !observable)
      return;
    const subscription = observable.subscribe(setState);
    return () => subscription.unsubscribe();
  }, [observable]);
  return state;
}

// src/hooks/useChat.ts
function useChat(options) {
  const room = useRoomContext();
  const [setup, setSetup] = React8.useState();
  const isSending = useObservableState(setup == null ? void 0 : setup.isSendingObservable, false);
  const chatMessages = useObservableState(setup == null ? void 0 : setup.messageObservable, []);
  React8.useEffect(() => {
    const setupChatReturn = setupChat(room, options);
    setSetup(setupChatReturn);
    return setupChatReturn.destroy;
  }, [room, options]);
  return { send: setup == null ? void 0 : setup.send, chatMessages, isSending };
}

// src/prefabs/UserChat.tsx
import * as React9 from "react";
function UserChat(_a) {
  var _b = _a, {
    entry,
    hideName = false,
    hideTimestamp = false,
    messageFormatter
  } = _b, props = __objRest(_b, [
    "entry",
    "hideName",
    "hideTimestamp",
    "messageFormatter"
  ]);
  var _a2, _b2, _c, _d, _e;
  const formattedMessage = React9.useMemo(() => {
    return messageFormatter ? messageFormatter(entry.message) : entry.message;
  }, [entry.message, messageFormatter]);
  const time = new Date(entry.timestamp);
  const locale = navigator ? navigator.language : "en-US";
  return /* @__PURE__ */ React9.createElement(
    "li",
    __spreadValues({
      className: "tl-chat-entry",
      title: time.toLocaleTimeString(locale, { timeStyle: "full" }),
      "data-lk-message-origin": ((_a2 = entry.from) == null ? void 0 : _a2.isLocal) ? "local" : "remote"
    }, props),
    !((_b2 = entry.from) == null ? void 0 : _b2.isLocal) ? /* @__PURE__ */ React9.createElement("span", { className: "lk-meta-data" }, /* @__PURE__ */ React9.createElement("strong", { className: "lk-participant-name" }, (_e = (_c = entry.from) == null ? void 0 : _c.name) != null ? _e : (_d = entry.from) == null ? void 0 : _d.identity)) : /* @__PURE__ */ React9.createElement(React9.Fragment, null),
    /* @__PURE__ */ React9.createElement("span", { className: "lk-message-body" }, formattedMessage)
  );
}

// src/prefabs/Chat.tsx
function Chat(_a) {
  var _b = _a, { messageFormatter, messageDecoder, messageEncoder } = _b, props = __objRest(_b, ["messageFormatter", "messageDecoder", "messageEncoder"]);
  const inputRef = React10.useRef(null);
  const ulRef = React10.useRef(null);
  const chatOptions = React10.useMemo(() => {
    return { messageDecoder, messageEncoder };
  }, [messageDecoder, messageEncoder]);
  const { send, chatMessages, isSending } = useChat(chatOptions);
  const layoutContext = useMaybeLayoutContext();
  const lastReadMsgAt = React10.useRef(0);
  function handleSubmit(event) {
    return __async(this, null, function* () {
      event.preventDefault();
      if (inputRef.current && inputRef.current.value.trim() !== "") {
        if (send) {
          yield send(inputRef.current.value);
          inputRef.current.value = "";
          inputRef.current.focus();
        }
      }
    });
  }
  React10.useEffect(() => {
    var _a2;
    if (ulRef) {
      (_a2 = ulRef.current) == null ? void 0 : _a2.scrollTo({ top: ulRef.current.scrollHeight });
    }
  }, [ulRef, chatMessages]);
  React10.useEffect(() => {
    var _a2, _b2, _c, _d, _e;
    if (!layoutContext || chatMessages.length === 0) {
      return;
    }
    if (((_a2 = layoutContext.widget.state) == null ? void 0 : _a2.showChat) && chatMessages.length > 0 && lastReadMsgAt.current !== ((_b2 = chatMessages[chatMessages.length - 1]) == null ? void 0 : _b2.timestamp)) {
      lastReadMsgAt.current = (_c = chatMessages[chatMessages.length - 1]) == null ? void 0 : _c.timestamp;
      return;
    }
    const unreadMessageCount = chatMessages.filter(
      (msg) => !lastReadMsgAt.current || msg.timestamp > lastReadMsgAt.current
    ).length;
    console.log(chatMessages);
    console.log("Last read message" + lastReadMsgAt);
    console.log("Unread message counts " + unreadMessageCount);
    const { widget } = layoutContext;
    if (unreadMessageCount > 0 && ((_d = widget.state) == null ? void 0 : _d.unreadMessages) !== unreadMessageCount) {
      (_e = widget.dispatch) == null ? void 0 : _e.call(widget, { msg: "unread_msg", count: unreadMessageCount });
    }
  }, [chatMessages, layoutContext == null ? void 0 : layoutContext.widget]);
  return /* @__PURE__ */ React10.createElement("div", __spreadProps(__spreadValues({}, props), { className: "lk-chat" }), /* @__PURE__ */ React10.createElement("ul", { className: "tl-list lk-chat-messages", ref: ulRef }, props.children ? chatMessages.map(
    (msg, idx) => cloneSingleChild(props.children, {
      entry: msg,
      key: idx,
      messageFormatter
    })
  ) : chatMessages.map((msg, idx, allMsg) => {
    const hideName = idx >= 1 && allMsg[idx - 1].from === msg.from;
    const hideTimestamp = idx >= 1 && msg.timestamp - allMsg[idx - 1].timestamp < 6e4;
    return /* @__PURE__ */ React10.createElement(
      UserChat,
      {
        key: idx,
        hideName,
        hideTimestamp: hideName === false ? false : hideTimestamp,
        entry: msg,
        messageFormatter
      }
    );
  })), /* @__PURE__ */ React10.createElement("form", { className: "lk-chat-form", onSubmit: handleSubmit }, /* @__PURE__ */ React10.createElement(
    "input",
    {
      className: "lk-form-control lk-chat-form-input",
      ref: inputRef,
      type: "text",
      placeholder: "Enter a message..."
    }
  ), /* @__PURE__ */ React10.createElement("button", { type: "submit", className: "lk-button lk-chat-form-button", disabled: isSending }, "Send")));
}

// src/prefabs/PreJoin.tsx
import {
  createLocalAudioTrack,
  createLocalTracks,
  createLocalVideoTrack,
  facingModeFromLocalTrack as facingModeFromLocalTrack2,
  Track as Track4,
  VideoPresets
} from "livekit-client";
import * as React58 from "react";

// src/prefabs/MediaDeviceMenu.tsx
import { computeMenuPosition, wasClickOutside } from "@livekit/components-core";
import * as React37 from "react";

// src/components/controls/MediaDeviceSelect.tsx
import * as React36 from "react";

// src/hooks/internal/useResizeObserver.ts
import * as React11 from "react";
import useLatest from "@react-hook/latest";
function useResizeObserver(target, callback) {
  const resizeObserver = getResizeObserver();
  const storedCallback = useLatest(callback);
  React11.useLayoutEffect(() => {
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
  const [size, setSize] = React11.useState({ width: 0, height: 0 });
  React11.useLayoutEffect(() => {
    if (target.current) {
      const { width, height } = target.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, [target.current]);
  const resizeCallback = React11.useCallback(
    (entry) => setSize(entry.contentRect),
    []
  );
  useResizeObserver(target, resizeCallback);
  return size;
};

// src/hooks/internal/useMediaQuery.ts
import * as React12 from "react";
function useMediaQuery(query) {
  const getMatches = (query2) => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query2).matches;
    }
    return false;
  };
  const [matches, setMatches] = React12.useState(getMatches(query));
  function handleChange() {
    setMatches(getMatches(query));
  }
  React12.useEffect(() => {
    const matchMedia = window.matchMedia(query);
    handleChange();
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }
    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener("change", handleChange);
      }
    };
  }, [query]);
  return matches;
}

// src/hooks/useConnectionQualityIndicator.ts
import { setupConnectionQualityIndicator } from "@livekit/components-core";
import { ConnectionQuality } from "livekit-client";
import * as React13 from "react";
function useConnectionQualityIndicator(options = {}) {
  const p = useEnsureParticipant(options.participant);
  const { className, connectionQualityObserver } = React13.useMemo(
    () => setupConnectionQualityIndicator(p),
    [p]
  );
  const quality = useObservableState(connectionQualityObserver, ConnectionQuality.Unknown);
  return { className, quality };
}

// src/hooks/useConnectionStatus.ts
import { connectionStateObserver } from "@livekit/components-core";
import * as React14 from "react";
function useConnectionState(room) {
  const r = useEnsureRoom(room);
  const observable = React14.useMemo(() => connectionStateObserver(r), [r]);
  const connectionState = useObservableState(observable, r.state);
  return connectionState;
}

// src/hooks/useDisconnectButton.ts
import { setupDisconnectButton } from "@livekit/components-core";
import { ConnectionState } from "livekit-client";
import * as React15 from "react";
function useDisconnectButton(props) {
  const room = useRoomContext();
  const connectionState = useConnectionState(room);
  const buttonProps = React15.useMemo(() => {
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
import {
  setupFocusToggle,
  isTrackReferencePinned,
  isTrackReference
} from "@livekit/components-core";
import * as React16 from "react";
function useFocusToggle({ trackRef, trackSource, participant, props }) {
  const p = useEnsureParticipant(participant);
  if (!trackRef && !trackSource) {
    throw new Error("trackRef or trackSource must be defined.");
  }
  const layoutContext = useMaybeLayoutContext();
  const { className } = React16.useMemo(() => setupFocusToggle(), []);
  const inFocus = React16.useMemo(() => {
    if (trackRef) {
      return isTrackReferencePinned(trackRef, layoutContext == null ? void 0 : layoutContext.pin.state);
    } else if (trackSource) {
      const track = p.getTrack(trackSource);
      if ((layoutContext == null ? void 0 : layoutContext.pin.state) && track) {
        return isTrackReferencePinned(
          { participant: p, source: trackSource, publication: track },
          layoutContext.pin.state
        );
      } else {
        return false;
      }
    } else {
      throw new Error("trackRef or trackSource and participant must be defined.");
    }
  }, [trackRef, layoutContext == null ? void 0 : layoutContext.pin.state, p, trackSource]);
  const mergedProps = React16.useMemo(
    () => mergeProps(props, {
      className,
      onClick: (event) => {
        var _a, _b, _c, _d, _e;
        (_a = props.onClick) == null ? void 0 : _a.call(props, event);
        if (trackRef && isTrackReference(trackRef)) {
          if (inFocus) {
            (_c = layoutContext == null ? void 0 : (_b = layoutContext.pin).dispatch) == null ? void 0 : _c.call(_b, {
              msg: "clear_pin"
            });
          } else {
            (_e = layoutContext == null ? void 0 : (_d = layoutContext.pin).dispatch) == null ? void 0 : _e.call(_d, {
              msg: "set_pin",
              trackReference: trackRef
            });
          }
        } else if (trackSource) {
          const track = p.getTrack(trackSource);
          if ((layoutContext == null ? void 0 : layoutContext.pin.dispatch) && track) {
            if (inFocus) {
              layoutContext.pin.dispatch({
                msg: "clear_pin"
              });
            } else {
              layoutContext.pin.dispatch({
                msg: "set_pin",
                trackReference: {
                  participant: p,
                  publication: track,
                  source: track.source
                }
              });
            }
          }
        }
      }
    }),
    [props, className, trackRef, trackSource, inFocus, layoutContext == null ? void 0 : layoutContext.pin, p]
  );
  return { mergedProps, inFocus };
}

// src/hooks/useGridLayout.ts
import { GRID_LAYOUTS, selectGridLayout } from "@livekit/components-core";
import * as React17 from "react";
function useGridLayout(gridElement, trackCount) {
  const { width, height } = useSize(gridElement);
  const layout = width > 0 && height > 0 ? selectGridLayout(GRID_LAYOUTS, trackCount, width, height) : GRID_LAYOUTS[0];
  React17.useEffect(() => {
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
import * as React18 from "react";
function useIsMuted(sourceOrTrackRef, options = {}) {
  var _a, _b;
  const passedParticipant = typeof sourceOrTrackRef === "string" ? options.participant : sourceOrTrackRef.participant;
  const p = useEnsureParticipant(passedParticipant);
  const ref = typeof sourceOrTrackRef === "string" ? { participant: p, source: sourceOrTrackRef } : sourceOrTrackRef;
  const [isMuted, setIsMuted] = React18.useState(
    !!(((_a = ref.publication) == null ? void 0 : _a.isMuted) || ((_b = p.getTrack(ref.source)) == null ? void 0 : _b.isMuted))
  );
  React18.useEffect(() => {
    const listener = mutedObserver(ref).subscribe(setIsMuted);
    return () => listener.unsubscribe();
  }, [getTrackReferenceId(ref)]);
  return isMuted;
}

// src/hooks/useIsSpeaking.ts
import { createIsSpeakingObserver } from "@livekit/components-core";
import * as React19 from "react";
function useIsSpeaking(participant) {
  const p = useEnsureParticipant(participant);
  const observable = React19.useMemo(() => createIsSpeakingObserver(p), [p]);
  const isSpeaking = useObservableState(observable, p.isSpeaking);
  return isSpeaking;
}

// src/hooks/useLocalParticipant.ts
import { observeParticipantMedia } from "@livekit/components-core";
import * as React20 from "react";
function useLocalParticipant(options = {}) {
  const room = useEnsureRoom(options.room);
  const [localParticipant, setLocalParticipant] = React20.useState(room.localParticipant);
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = React20.useState(
    localParticipant.isMicrophoneEnabled
  );
  const [isCameraEnabled, setIsCameraEnabled] = React20.useState(
    localParticipant.isMicrophoneEnabled
  );
  const [lastMicrophoneError, setLastMicrophoneError] = React20.useState(
    localParticipant.lastMicrophoneError
  );
  const [lastCameraError, setLastCameraError] = React20.useState(localParticipant.lastCameraError);
  const [isScreenShareEnabled, setIsScreenShareEnabled] = React20.useState(
    localParticipant.isMicrophoneEnabled
  );
  const [microphoneTrack, setMicrophoneTrack] = React20.useState(
    void 0
  );
  const [cameraTrack, setCameraTrack] = React20.useState(void 0);
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
  React20.useEffect(() => {
    const listener = observeParticipantMedia(localParticipant).subscribe(handleUpdate);
    return () => listener.unsubscribe();
  }, [localParticipant]);
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
import * as React21 from "react";
function useLocalParticipantPermissions() {
  const room = useRoomContext();
  const permissionObserver = React21.useMemo(
    () => participantPermissionObserver(room.localParticipant),
    [room]
  );
  const permissions = useObservableState(permissionObserver, room.localParticipant.permissions);
  return permissions;
}

// src/hooks/useMediaDeviceSelect.ts
import { createMediaDeviceObserver, setupDeviceSelector, log } from "@livekit/components-core";
import * as React22 from "react";
function useMediaDeviceSelect({
  kind,
  room,
  track,
  requestPermissions
}) {
  const roomContext = useMaybeRoomContext();
  const deviceObserver = React22.useMemo(
    () => createMediaDeviceObserver(kind, requestPermissions),
    [kind, requestPermissions]
  );
  const devices = useObservableState(deviceObserver, []);
  const [currentDeviceId, setCurrentDeviceId] = React22.useState("");
  const { className, activeDeviceObservable, setActiveMediaDevice } = React22.useMemo(
    () => setupDeviceSelector(kind, room != null ? room : roomContext, track),
    [kind, room, roomContext, track]
  );
  React22.useEffect(() => {
    const listener = activeDeviceObservable.subscribe((deviceId) => {
      log.info("setCurrentDeviceId", deviceId);
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
import * as React23 from "react";
import { createMediaDeviceObserver as createMediaDeviceObserver2 } from "@livekit/components-core";
function useMediaDevices({ kind }) {
  const deviceObserver = React23.useMemo(() => createMediaDeviceObserver2(kind), [kind]);
  const devices = useObservableState(deviceObserver, []);
  return devices;
}

// src/hooks/useMediaTrackBySourceOrName.ts
import { isTrackReference as isTrackReference2 } from "@livekit/components-core";
import { setupMediaTrack, log as log2, isLocal, getTrackByIdentifier } from "@livekit/components-core";
import * as React24 from "react";
function useMediaTrackBySourceOrName(observerOptions, options = {}) {
  var _a;
  const [publication, setPublication] = React24.useState(getTrackByIdentifier(observerOptions));
  const [isMuted, setMuted] = React24.useState(publication == null ? void 0 : publication.isMuted);
  const [isSubscribed, setSubscribed] = React24.useState(publication == null ? void 0 : publication.isSubscribed);
  const [track, setTrack] = React24.useState(publication == null ? void 0 : publication.track);
  const [orientation, setOrientation] = React24.useState("landscape");
  const previousElement = React24.useRef();
  const { className, trackObserver } = React24.useMemo(() => {
    return setupMediaTrack(observerOptions);
  }, [
    (_a = observerOptions.participant.sid) != null ? _a : observerOptions.participant.identity,
    observerOptions.source,
    isTrackReference2(observerOptions) && observerOptions.publication.trackSid
  ]);
  React24.useEffect(() => {
    const subscription = trackObserver.subscribe((publication2) => {
      log2.debug("update track", publication2);
      setPublication(publication2);
      setMuted(publication2 == null ? void 0 : publication2.isMuted);
      setSubscribed(publication2 == null ? void 0 : publication2.isSubscribed);
      setTrack(publication2 == null ? void 0 : publication2.track);
    });
    return () => subscription == null ? void 0 : subscription.unsubscribe();
  }, [trackObserver]);
  React24.useEffect(() => {
    var _a2, _b;
    if (track) {
      if (previousElement.current) {
        track.detach(previousElement.current);
      }
      if (((_a2 = options.element) == null ? void 0 : _a2.current) && !(isLocal(observerOptions.participant) && (track == null ? void 0 : track.kind) === "audio")) {
        track.attach(options.element.current);
      }
    }
    previousElement.current = (_b = options.element) == null ? void 0 : _b.current;
    return () => {
      if (previousElement.current) {
        track == null ? void 0 : track.detach(previousElement.current);
      }
    };
  }, [track, options.element]);
  React24.useEffect(() => {
    var _a2, _b;
    if (typeof ((_a2 = publication == null ? void 0 : publication.dimensions) == null ? void 0 : _a2.width) === "number" && typeof ((_b = publication == null ? void 0 : publication.dimensions) == null ? void 0 : _b.height) === "number") {
      const orientation_ = publication.dimensions.width > publication.dimensions.height ? "landscape" : "portrait";
      setOrientation(orientation_);
    }
  }, [publication]);
  return {
    publication,
    isMuted,
    isSubscribed,
    track,
    elementProps: mergeProps2(options.props, __spreadValues({
      className,
      "data-lk-local-participant": observerOptions.participant.isLocal,
      "data-lk-source": publication == null ? void 0 : publication.source
    }, (publication == null ? void 0 : publication.kind) === "video" && { "data-lk-orientation": orientation }))
  };
}

// src/hooks/usePagination.ts
import * as React26 from "react";

// src/hooks/useVisualStableUpdate.ts
import { log as log3, sortTrackReferences, updatePages } from "@livekit/components-core";
import * as React25 from "react";
function useVisualStableUpdate(trackReferences, maxItemsOnPage, options = {}) {
  const lastTrackRefs = React25.useRef([]);
  const lastMaxItemsOnPage = React25.useRef(-1);
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
  const [currentPage, setCurrentPage] = React26.useState(1);
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

// src/hooks/useParticipantTile.ts
import { setupParticipantTile } from "@livekit/components-core";
import { Track } from "livekit-client";
import * as React27 from "react";
function useParticipantTile({
  trackRef,
  participant,
  source,
  publication,
  onParticipantClick,
  disableSpeakingIndicator,
  htmlProps
}) {
  const maybeTrackRef = useMaybeTrackRefContext();
  const p = useEnsureParticipant(participant);
  const trackReference = React27.useMemo(() => {
    var _a, _b, _c, _d, _e, _f;
    const _source = (_b = (_a = trackRef == null ? void 0 : trackRef.source) != null ? _a : maybeTrackRef == null ? void 0 : maybeTrackRef.source) != null ? _b : source;
    if (_source === void 0) {
      throw new Error(
        "Missing track `source`, provided it via `trackRef`, `source` property or via `TrackRefContext`."
      );
    }
    return {
      participant: (_d = (_c = trackRef == null ? void 0 : trackRef.participant) != null ? _c : maybeTrackRef == null ? void 0 : maybeTrackRef.participant) != null ? _d : p,
      publication: (_f = (_e = trackRef == null ? void 0 : trackRef.publication) != null ? _e : maybeTrackRef == null ? void 0 : maybeTrackRef.publication) != null ? _f : publication,
      source: _source
    };
  }, [
    trackRef == null ? void 0 : trackRef.participant,
    trackRef == null ? void 0 : trackRef.source,
    trackRef == null ? void 0 : trackRef.publication,
    maybeTrackRef == null ? void 0 : maybeTrackRef.participant,
    maybeTrackRef == null ? void 0 : maybeTrackRef.source,
    maybeTrackRef == null ? void 0 : maybeTrackRef.publication,
    p,
    source,
    publication
  ]);
  const mergedProps = React27.useMemo(() => {
    const { className } = setupParticipantTile();
    return mergeProps(htmlProps, {
      className,
      onClick: (event) => {
        var _a, _b;
        (_a = htmlProps.onClick) == null ? void 0 : _a.call(htmlProps, event);
        if (typeof onParticipantClick === "function") {
          const track = (_b = trackReference.publication) != null ? _b : trackReference.participant.getTrack(trackReference.source);
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
  const isVideoMuted = useIsMuted(Track.Source.Camera, { participant: trackReference.participant });
  const isAudioMuted = useIsMuted(Track.Source.Microphone, {
    participant: trackReference.participant
  });
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
import * as React28 from "react";
function useRemoteParticipants(options = {}) {
  const room = useEnsureRoom(options.room);
  const [participants, setParticipants] = React28.useState([]);
  React28.useEffect(() => {
    const listener = connectedParticipantsObserver(room, {
      additionalRoomEvents: options.updateOnlyOn
    }).subscribe(setParticipants);
    return () => listener.unsubscribe();
  }, [room, JSON.stringify(options.updateOnlyOn)]);
  return participants;
}

// src/hooks/useParticipants.ts
function useParticipants(options = {}) {
  const remoteParticipants = useRemoteParticipants(options);
  const { localParticipant } = useLocalParticipant(options);
  return [localParticipant, ...remoteParticipants];
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

// src/hooks/useStartAudio.ts
import { setupStartAudio } from "@livekit/components-core";
import * as React30 from "react";
function useStartAudio({ room, props }) {
  const roomEnsured = useEnsureRoom(room);
  const { className, roomAudioPlaybackAllowedObservable, handleStartAudioPlayback } = React30.useMemo(
    () => setupStartAudio(),
    []
  );
  const observable = React30.useMemo(
    () => roomAudioPlaybackAllowedObservable(roomEnsured),
    [roomEnsured, roomAudioPlaybackAllowedObservable]
  );
  const { canPlayAudio } = useObservableState(observable, {
    canPlayAudio: roomEnsured.canPlaybackAudio
  });
  const mergedProps = React30.useMemo(
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

// src/hooks/useSwipe.ts
import * as React31 from "react";
function useSwipe(element, options = {}) {
  var _a;
  const touchStart = React31.useRef(null);
  const touchEnd = React31.useRef(null);
  const minSwipeDistance = (_a = options.minSwipeDistance) != null ? _a : 50;
  const onTouchStart = (event) => {
    touchEnd.current = null;
    touchStart.current = event.targetTouches[0].clientX;
  };
  const onTouchMove = (event) => {
    touchEnd.current = event.targetTouches[0].clientX;
  };
  const onTouchEnd = React31.useCallback(() => {
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
  React31.useEffect(() => {
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
import * as React32 from "react";
function useChatToggle({ props }) {
  const { dispatch, state } = useLayoutContext().widget;
  const { className } = React32.useMemo(() => setupChatToggle(), []);
  const mergedProps = React32.useMemo(() => {
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

// src/hooks/useTrackMutedIndicator.ts
import {
  setupTrackMutedIndicator,
  getTrackReferenceId as getTrackReferenceId2
} from "@livekit/components-core";
import * as React33 from "react";
function useTrackMutedIndicator(trackRefOrSource, options = {}) {
  var _a, _b, _c;
  let ref = useMaybeTrackRefContext();
  const p = (_a = useMaybeParticipantContext()) != null ? _a : options.participant;
  if (typeof trackRefOrSource === "string") {
    if (!p) {
      throw Error(`Participant missing, either provide it via context or pass it in directly`);
    }
    ref = { participant: p, source: trackRefOrSource };
  } else if (trackRefOrSource) {
    ref = trackRefOrSource;
  } else {
    throw Error(`No track reference found, either provide it via context or pass it in directly`);
  }
  const { className, mediaMutedObserver } = React33.useMemo(
    () => setupTrackMutedIndicator(ref),
    [getTrackReferenceId2(ref)]
  );
  const isMuted = useObservableState(
    mediaMutedObserver,
    !!(((_b = ref.publication) == null ? void 0 : _b.isMuted) || ((_c = ref.participant.getTrack(ref.source)) == null ? void 0 : _c.isMuted))
  );
  return { isMuted, className };
}

// src/hooks/useTrackToggle.ts
import { setupMediaToggle, setupManualToggle, log as log4 } from "@livekit/components-core";
import * as React34 from "react";
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
  const track = (_a2 = room == null ? void 0 : room.localParticipant) == null ? void 0 : _a2.getTrack(source);
  const { toggle, className, pendingObserver, enabledObserver } = React34.useMemo(
    () => room ? setupMediaToggle(source, room, captureOptions) : setupManualToggle(),
    [room, source, JSON.stringify(captureOptions)]
  );
  const pending = useObservableState(pendingObserver, false);
  const enabled = useObservableState(enabledObserver, initialState != null ? initialState : !!(track == null ? void 0 : track.isEnabled));
  React34.useEffect(() => {
    onChange == null ? void 0 : onChange(enabled);
  }, [enabled, onChange]);
  React34.useEffect(() => {
    if (initialState !== void 0) {
      log4.debug("forcing initial toggle state", source, initialState);
      toggle(initialState);
    }
  }, []);
  const newProps = React34.useMemo(() => mergeProps(rest, { className }), [rest, className]);
  const clickHandler = React34.useCallback(
    (evt) => {
      var _a3;
      toggle();
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
  log as log5,
  trackReferencesObservable
} from "@livekit/components-core";
import { Track as Track2 } from "livekit-client";
import * as React35 from "react";
function useTracks(sources = [
  Track2.Source.Camera,
  Track2.Source.Microphone,
  Track2.Source.ScreenShare,
  Track2.Source.ScreenShareAudio,
  Track2.Source.Unknown
], options = {}) {
  const room = useEnsureRoom(options.room);
  const [trackReferences, setTrackReferences] = React35.useState([]);
  const [participants, setParticipants] = React35.useState([]);
  const sources_ = React35.useMemo(() => {
    return sources.map((s) => isSourceWitOptions(s) ? s.source : s);
  }, [JSON.stringify(sources)]);
  React35.useEffect(() => {
    const subscription = trackReferencesObservable(room, sources_, {
      additionalRoomEvents: options.updateOnlyOn,
      onlySubscribed: options.onlySubscribed
    }).subscribe(({ trackReferences: trackReferences2, participants: participants2 }) => {
      log5.debug("setting track bundles", trackReferences2, participants2);
      setTrackReferences(trackReferences2);
      setParticipants(participants2);
    });
    return () => subscription.unsubscribe();
  }, [room, JSON.stringify(options.updateOnlyOn), JSON.stringify(sources)]);
  const maybeTrackReferences = React35.useMemo(() => {
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
            log5.debug(
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
      const sourcesOfSubscribedTracks = participant.getTracks().map((pub) => {
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

// src/hooks/useTrack.ts
function useTrack(trackRef, options = {}) {
  return useMediaTrackBySourceOrName(trackRef, options);
}

// src/components/controls/MediaDeviceSelect.tsx
function MediaDeviceSelect(_a) {
  var _b = _a, {
    kind,
    initialSelection,
    onActiveDeviceChange,
    onDeviceListChange,
    onDeviceSelectError,
    exactMatch,
    track,
    requestPermissions
  } = _b, props = __objRest(_b, [
    "kind",
    "initialSelection",
    "onActiveDeviceChange",
    "onDeviceListChange",
    "onDeviceSelectError",
    "exactMatch",
    "track",
    "requestPermissions"
  ]);
  const room = useMaybeRoomContext();
  const { devices, activeDeviceId, setActiveMediaDevice, className } = useMediaDeviceSelect({
    kind,
    room,
    track,
    requestPermissions
  });
  React36.useEffect(() => {
    if (initialSelection !== void 0) {
      setActiveMediaDevice(initialSelection);
    }
  }, [setActiveMediaDevice]);
  React36.useEffect(() => {
    if (typeof onDeviceListChange === "function") {
      onDeviceListChange(devices);
    }
  }, [onDeviceListChange, devices]);
  React36.useEffect(() => {
    if (activeDeviceId && activeDeviceId !== "") {
      onActiveDeviceChange == null ? void 0 : onActiveDeviceChange(activeDeviceId);
    }
  }, [activeDeviceId]);
  const handleActiveDeviceChange = (deviceId) => __async(this, null, function* () {
    try {
      yield setActiveMediaDevice(deviceId, { exact: exactMatch });
    } catch (e) {
      if (e instanceof Error) {
        onDeviceSelectError == null ? void 0 : onDeviceSelectError(e);
      } else {
        throw e;
      }
    }
  });
  const mergedProps = React36.useMemo(
    () => mergeProps2(props, { className }, { className: "lk-list" }),
    [className, props]
  );
  function isActive(deviceId, activeDeviceId2, index) {
    return deviceId === activeDeviceId2 || index === 0 && activeDeviceId2 === "default";
  }
  return /* @__PURE__ */ React36.createElement("ul", __spreadValues({}, mergedProps), devices.map((device, index) => /* @__PURE__ */ React36.createElement(
    "li",
    {
      key: device.deviceId,
      id: device.deviceId,
      "data-lk-active": isActive(device.deviceId, activeDeviceId, index),
      "aria-selected": isActive(device.deviceId, activeDeviceId, index),
      role: "option"
    },
    /* @__PURE__ */ React36.createElement("button", { className: "lk-button", onClick: () => handleActiveDeviceChange(device.deviceId) }, device.label)
  )));
}

// src/prefabs/MediaDeviceMenu.tsx
import { log as log6 } from "@livekit/components-core";
function MediaDeviceMenu(_a) {
  var _b = _a, {
    kind,
    initialSelection,
    onActiveDeviceChange,
    tracks,
    requestPermissions = false
  } = _b, props = __objRest(_b, [
    "kind",
    "initialSelection",
    "onActiveDeviceChange",
    "tracks",
    "requestPermissions"
  ]);
  const [isOpen, setIsOpen] = React37.useState(false);
  const [devices, setDevices] = React37.useState([]);
  const [updateRequired, setUpdateRequired] = React37.useState(true);
  const handleActiveDeviceChange = (kind2, deviceId) => {
    log6.debug("handle device change");
    setIsOpen(false);
    onActiveDeviceChange == null ? void 0 : onActiveDeviceChange(kind2, deviceId);
  };
  const button = React37.useRef(null);
  const tooltip = React37.useRef(null);
  React37.useLayoutEffect(() => {
    if (button.current && tooltip.current && (devices || updateRequired)) {
      computeMenuPosition(button.current, tooltip.current).then(({ x, y }) => {
        if (tooltip.current) {
          Object.assign(tooltip.current.style, { left: `${x}px`, top: `${y}px` });
        }
      });
    }
    setUpdateRequired(false);
  }, [button, tooltip, devices, updateRequired]);
  const handleClickOutside = React37.useCallback(
    (event) => {
      if (!tooltip.current) {
        return;
      }
      if (event.target === button.current) {
        return;
      }
      if (isOpen && wasClickOutside(tooltip.current, event)) {
        setIsOpen(false);
      }
    },
    [isOpen, tooltip, button]
  );
  React37.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", () => setUpdateRequired(true));
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", () => setUpdateRequired(true));
    };
  }, [handleClickOutside, setUpdateRequired]);
  return /* @__PURE__ */ React37.createElement(React37.Fragment, null, /* @__PURE__ */ React37.createElement(
    "button",
    __spreadProps(__spreadValues({
      className: "lk-button lk-button-menu",
      "aria-pressed": isOpen
    }, props), {
      onClick: () => setIsOpen(!isOpen),
      ref: button
    }),
    props.children
  ), !props.disabled && /* @__PURE__ */ React37.createElement(
    "div",
    {
      className: "lk-device-menu",
      ref: tooltip,
      style: { visibility: isOpen ? "visible" : "hidden" }
    },
    kind ? /* @__PURE__ */ React37.createElement(
      MediaDeviceSelect,
      {
        initialSelection,
        onActiveDeviceChange: (deviceId) => handleActiveDeviceChange(kind, deviceId),
        onDeviceListChange: setDevices,
        kind,
        track: tracks == null ? void 0 : tracks[kind],
        requestPermissions
      }
    ) : /* @__PURE__ */ React37.createElement(React37.Fragment, null, /* @__PURE__ */ React37.createElement("div", { className: "lk-device-menu-heading" }, "Audio inputs"), /* @__PURE__ */ React37.createElement(
      MediaDeviceSelect,
      {
        kind: "audioinput",
        onActiveDeviceChange: (deviceId) => handleActiveDeviceChange("audioinput", deviceId),
        onDeviceListChange: setDevices,
        track: tracks == null ? void 0 : tracks.audioinput,
        requestPermissions
      }
    ), /* @__PURE__ */ React37.createElement("div", { className: "lk-device-menu-heading" }, "Video inputs"), /* @__PURE__ */ React37.createElement(
      MediaDeviceSelect,
      {
        kind: "videoinput",
        onActiveDeviceChange: (deviceId) => handleActiveDeviceChange("videoinput", deviceId),
        onDeviceListChange: setDevices,
        track: tracks == null ? void 0 : tracks.videoinput,
        requestPermissions
      }
    ))
  ));
}

// src/components/controls/TrackToggle.tsx
import * as React56 from "react";

// src/assets/icons/util.tsx
import * as React55 from "react";
import { ConnectionQuality as ConnectionQuality2, Track as Track3 } from "livekit-client";

// src/assets/icons/ChatIcon.tsx
import * as React38 from "react";
var SvgChatIcon = (props) => /* @__PURE__ */ React38.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 18, fill: "none" }, props), /* @__PURE__ */ React38.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M0 2.75A2.75 2.75 0 0 1 2.75 0h10.5A2.75 2.75 0 0 1 16 2.75v13.594a.75.75 0 0 1-1.234.572l-3.691-3.12a1.25 1.25 0 0 0-.807-.296H2.75A2.75 2.75 0 0 1 0 10.75v-8ZM2.75 1.5c-.69 0-1.25.56-1.25 1.25v8c0 .69.56 1.25 1.25 1.25h7.518c.65 0 1.279.23 1.775.65l2.457 2.077V2.75c0-.69-.56-1.25-1.25-1.25H2.75Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React38.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M3 4.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Z",
    clipRule: "evenodd"
  }
));
var ChatIcon_default = SvgChatIcon;

// src/assets/icons/Chevron.tsx
import * as React39 from "react";
var SvgChevron = (props) => /* @__PURE__ */ React39.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React39.createElement(
  "path",
  {
    fill: "currentcolor",
    fillRule: "evenodd",
    d: "M5.293 2.293a1 1 0 0 1 1.414 0l4.823 4.823a1.25 1.25 0 0 1 0 1.768l-4.823 4.823a1 1 0 0 1-1.414-1.414L9.586 8 5.293 3.707a1 1 0 0 1 0-1.414z",
    clipRule: "evenodd"
  }
));
var Chevron_default = SvgChevron;

// src/assets/icons/FocusToggleIcon.tsx
import * as React40 from "react";
var SvgFocusToggleIcon = (props) => /* @__PURE__ */ React40.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React40.createElement("g", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5 }, /* @__PURE__ */ React40.createElement("path", { d: "M10 1.75h4.25m0 0V6m0-4.25L9 7M6 14.25H1.75m0 0V10m0 4.25L7 9" })));
var FocusToggleIcon_default = SvgFocusToggleIcon;

// src/assets/icons/LeaveIcon.tsx
import * as React41 from "react";
var SvgLeaveIcon = (props) => /* @__PURE__ */ React41.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React41.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M2 2.75A2.75 2.75 0 0 1 4.75 0h6.5A2.75 2.75 0 0 1 14 2.75v10.5A2.75 2.75 0 0 1 11.25 16h-6.5A2.75 2.75 0 0 1 2 13.25v-.5a.75.75 0 0 1 1.5 0v.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V2.75c0-.69-.56-1.25-1.25-1.25h-6.5c-.69 0-1.25.56-1.25 1.25v.5a.75.75 0 0 1-1.5 0v-.5Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React41.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M8.78 7.47a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 1 1-1.06-1.06l.97-.97H1.75a.75.75 0 0 1 0-1.5h4.69l-.97-.97a.75.75 0 0 1 1.06-1.06l2.25 2.25Z",
    clipRule: "evenodd"
  }
));
var LeaveIcon_default = SvgLeaveIcon;

// src/assets/icons/LockLockedIcon.tsx
import * as React42 from "react";
var SvgLockLockedIcon = (props) => /* @__PURE__ */ React42.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React42.createElement(
  "path",
  {
    fill: "currentcolor",
    fillRule: "evenodd",
    d: "M4 6.104V4a4 4 0 1 1 8 0v2.104c1.154.326 2 1.387 2 2.646v4.5A2.75 2.75 0 0 1 11.25 16h-6.5A2.75 2.75 0 0 1 2 13.25v-4.5c0-1.259.846-2.32 2-2.646ZM5.5 4a2.5 2.5 0 0 1 5 0v2h-5V4Z",
    clipRule: "evenodd"
  }
));
var LockLockedIcon_default = SvgLockLockedIcon;

// src/assets/icons/QualityExcellentIcon.tsx
import * as React43 from "react";
var SvgQualityExcellentIcon = (props) => /* @__PURE__ */ React43.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentcolor" }, props), /* @__PURE__ */ React43.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React43.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }));
var QualityExcellentIcon_default = SvgQualityExcellentIcon;

// src/assets/icons/QualityGoodIcon.tsx
import * as React44 from "react";
var SvgQualityGoodIcon = (props) => /* @__PURE__ */ React44.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentcolor" }, props), /* @__PURE__ */ React44.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React44.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React44.createElement("g", { opacity: 0.25 }, /* @__PURE__ */ React44.createElement("path", { d: "M12 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React44.createElement("path", { d: "M12 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" })));
var QualityGoodIcon_default = SvgQualityGoodIcon;

// src/assets/icons/QualityPoorIcon.tsx
import * as React45 from "react";
var SvgQualityPoorIcon = (props) => /* @__PURE__ */ React45.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentcolor" }, props), /* @__PURE__ */ React45.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React45.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React45.createElement("g", { opacity: 0.25 }, /* @__PURE__ */ React45.createElement("path", { d: "M6 6.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React45.createElement("path", { d: "M6 6.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React45.createElement("path", { d: "M12 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" })));
var QualityPoorIcon_default = SvgQualityPoorIcon;

// src/assets/icons/QualityUnknownIcon.tsx
import * as React46 from "react";
var SvgQualityUnknownIcon = (props) => /* @__PURE__ */ React46.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentColor" }, props), /* @__PURE__ */ React46.createElement("g", { opacity: 0.25 }, /* @__PURE__ */ React46.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4Zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-9Zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V.5Z" }), /* @__PURE__ */ React46.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4Zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-9Zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V.5Z" })));
var QualityUnknownIcon_default = SvgQualityUnknownIcon;

// src/assets/icons/ScreenShareIcon.tsx
import * as React47 from "react";
var SvgScreenShareIcon = (props) => /* @__PURE__ */ React47.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 20, height: 16, fill: "none" }, props), /* @__PURE__ */ React47.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M0 2.75A2.75 2.75 0 0 1 2.75 0h14.5A2.75 2.75 0 0 1 20 2.75v10.5A2.75 2.75 0 0 1 17.25 16H2.75A2.75 2.75 0 0 1 0 13.25V2.75ZM2.75 1.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V2.75c0-.69-.56-1.25-1.25-1.25H2.75Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React47.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M9.47 4.22a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v4.69a.75.75 0 0 1-1.5 0V6.56l-.97.97a.75.75 0 0 1-1.06-1.06l2.25-2.25Z",
    clipRule: "evenodd"
  }
));
var ScreenShareIcon_default = SvgScreenShareIcon;

// src/assets/icons/ScreenShareStopIcon.tsx
import * as React48 from "react";
var SvgScreenShareStopIcon = (props) => /* @__PURE__ */ React48.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 20, height: 16, fill: "none" }, props), /* @__PURE__ */ React48.createElement("g", { fill: "currentColor" }, /* @__PURE__ */ React48.createElement("path", { d: "M7.28 4.22a.75.75 0 0 0-1.06 1.06L8.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L10 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L11.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L10 6.94z" }), /* @__PURE__ */ React48.createElement(
  "path",
  {
    fillRule: "evenodd",
    d: "M2.75 0A2.75 2.75 0 0 0 0 2.75v10.5A2.75 2.75 0 0 0 2.75 16h14.5A2.75 2.75 0 0 0 20 13.25V2.75A2.75 2.75 0 0 0 17.25 0zM1.5 2.75c0-.69.56-1.25 1.25-1.25h14.5c.69 0 1.25.56 1.25 1.25v10.5c0 .69-.56 1.25-1.25 1.25H2.75c-.69 0-1.25-.56-1.25-1.25z",
    clipRule: "evenodd"
  }
)));
var ScreenShareStopIcon_default = SvgScreenShareStopIcon;

// src/assets/icons/SpinnerIcon.tsx
import * as React49 from "react";
var SvgSpinnerIcon = (props) => /* @__PURE__ */ React49.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React49.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M8 0a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 8 0Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React49.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M8 12a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5A.75.75 0 0 1 8 12Z",
    clipRule: "evenodd",
    opacity: 0.7
  }
), /* @__PURE__ */ React49.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M12 1.072a.75.75 0 0 1 .274 1.024l-1.25 2.165a.75.75 0 0 1-1.299-.75l1.25-2.165A.75.75 0 0 1 12 1.072Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React49.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M6 11.464a.75.75 0 0 1 .274 1.025l-1.25 2.165a.75.75 0 0 1-1.299-.75l1.25-2.165A.75.75 0 0 1 6 11.464Z",
    clipRule: "evenodd",
    opacity: 0.6
  }
), /* @__PURE__ */ React49.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M14.928 4a.75.75 0 0 1-.274 1.025l-2.165 1.25a.75.75 0 1 1-.75-1.3l2.165-1.25A.75.75 0 0 1 14.928 4Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React49.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M4.536 10a.75.75 0 0 1-.275 1.024l-2.165 1.25a.75.75 0 0 1-.75-1.298l2.165-1.25A.75.75 0 0 1 4.536 10Z",
    clipRule: "evenodd",
    opacity: 0.5
  }
), /* @__PURE__ */ React49.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M16 8a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h2.5A.75.75 0 0 1 16 8Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React49.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M4 8a.75.75 0 0 1-.75.75H.75a.75.75 0 0 1 0-1.5h2.5A.75.75 0 0 1 4 8Z",
    clipRule: "evenodd",
    opacity: 0.4
  }
), /* @__PURE__ */ React49.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M14.928 12a.75.75 0 0 1-1.024.274l-2.165-1.25a.75.75 0 0 1 .75-1.299l2.165 1.25A.75.75 0 0 1 14.928 12Z",
    clipRule: "evenodd",
    opacity: 0.9
  }
), /* @__PURE__ */ React49.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M4.536 6a.75.75 0 0 1-1.025.275l-2.165-1.25a.75.75 0 1 1 .75-1.3l2.165 1.25A.75.75 0 0 1 4.536 6Z",
    clipRule: "evenodd",
    opacity: 0.3
  }
), /* @__PURE__ */ React49.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M12 14.928a.75.75 0 0 1-1.024-.274l-1.25-2.165a.75.75 0 0 1 1.298-.75l1.25 2.165A.75.75 0 0 1 12 14.928Z",
    clipRule: "evenodd",
    opacity: 0.8
  }
), /* @__PURE__ */ React49.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M6 4.536a.75.75 0 0 1-1.024-.275l-1.25-2.165a.75.75 0 1 1 1.299-.75l1.25 2.165A.75.75 0 0 1 6 4.536Z",
    clipRule: "evenodd",
    opacity: 0.2
  }
));
var SpinnerIcon_default = SvgSpinnerIcon;

// src/assets/icons/UnfocusToggleIcon.tsx
import * as React50 from "react";
var SvgUnfocusToggleIcon = (props) => /* @__PURE__ */ React50.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React50.createElement("g", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5 }, /* @__PURE__ */ React50.createElement("path", { d: "M13.25 7H9m0 0V2.75M9 7l5.25-5.25M2.75 9H7m0 0v4.25M7 9l-5.25 5.25" })));
var UnfocusToggleIcon_default = SvgUnfocusToggleIcon;

// src/assets/icons/tl/CameraDisabledIcon.tsx
import * as React51 from "react";
var SvgCameraDisabledIcon = (props) => /* @__PURE__ */ React51.createElement(
  "svg",
  __spreadValues({
    width: 18,
    height: 18,
    viewBox: "0 0 21 21",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props),
  /* @__PURE__ */ React51.createElement(
    "path",
    {
      d: "M14.6155 6.64973C14.6155 6.64973 14.6409 5.84659 14.6155 5.58451C14.4718 3.85986 13.3474 3.26807 11.1409 3.26807H5.80627C3.13476 3.26807 2.24707 4.15575 2.24707 6.82727V13.9457C2.24707 15.0109 2.56833 16.0846 3.40529 16.7694L3.9379 17.1498",
      stroke: "white",
      strokeWidth: "1.66",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ),
  /* @__PURE__ */ React51.createElement(
    "path",
    {
      d: "M14.7084 9.49878V13.9457C14.7084 16.6172 13.8207 17.5049 11.1492 17.5049H6.69385",
      stroke: "white",
      strokeWidth: "1.66",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ),
  /* @__PURE__ */ React51.createElement(
    "path",
    {
      d: "M19.1554 5.93958V13.6075C19.1554 15.0194 18.2085 15.5097 17.0588 14.6981L14.7085 13.0495",
      stroke: "white",
      strokeWidth: "1.66",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ),
  /* @__PURE__ */ React51.createElement(
    "path",
    {
      d: "M19.172 2.0929L2.26367 19.0012",
      stroke: "white",
      strokeWidth: "1.66",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  )
);
var CameraDisabledIcon_default = SvgCameraDisabledIcon;

// src/assets/icons/tl/CameraIcon.tsx
import * as React52 from "react";
var SvgCameraIcon = (props) => /* @__PURE__ */ React52.createElement(
  "svg",
  __spreadValues({
    width: 18,
    height: 18,
    viewBox: "0 0 21 21",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props),
  /* @__PURE__ */ React52.createElement(
    "path",
    {
      d: "M10.9042 17.5049H5.56116C2.88964 17.5049 2.00195 15.7295 2.00195 13.9457V6.82727C2.00195 4.15575 2.88964 3.26807 5.56116 3.26807H10.9042C13.5757 3.26807 14.4634 4.15575 14.4634 6.82727V13.9457C14.4634 16.6172 13.5673 17.5049 10.9042 17.5049Z",
      stroke: "white",
      strokeWidth: "1.66",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ),
  /* @__PURE__ */ React52.createElement(
    "path",
    {
      d: "M16.8136 14.6981L14.4634 13.0495V7.71495L16.8136 6.06638C17.9634 5.26324 18.9103 5.75358 18.9103 7.16543V13.6075C18.9103 15.0193 17.9634 15.5097 16.8136 14.6981Z",
      stroke: "white",
      strokeWidth: "1.66",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ),
  /* @__PURE__ */ React52.createElement(
    "path",
    {
      d: "M10.0333 9.54101C10.7336 9.54101 11.3014 8.97325 11.3014 8.27289C11.3014 7.57252 10.7336 7.00476 10.0333 7.00476C9.3329 7.00476 8.76514 7.57252 8.76514 8.27289C8.76514 8.97325 9.3329 9.54101 10.0333 9.54101Z",
      stroke: "white",
      strokeWidth: "1.66",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  )
);
var CameraIcon_default = SvgCameraIcon;

// src/assets/icons/tl/MicDisabledIcon.tsx
import * as React53 from "react";
var SvgMicDisabledIcon = (props) => /* @__PURE__ */ React53.createElement(
  "svg",
  __spreadValues({
    width: 18,
    height: 18,
    viewBox: "0 0 21 21",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props),
  /* @__PURE__ */ React53.createElement(
    "path",
    {
      d: "M14.222 5.74004V5.48647C14.222 3.61847 12.709 2.10547 10.841 2.10547C8.97296 2.10547 7.45996 3.61847 7.45996 5.48647V9.71272",
      stroke: "white",
      strokeWidth: "1.66129",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ),
  /* @__PURE__ */ React53.createElement(
    "path",
    {
      d: "M8.33936 12.4091C8.95639 13.0937 9.85235 13.5163 10.8413 13.5163C12.7093 13.5163 14.2223 12.0033 14.2223 10.1353V9.71271",
      stroke: "white",
      strokeWidth: "1.66129",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ),
  /* @__PURE__ */ React53.createElement(
    "path",
    {
      d: "M6.42871 14.7419C7.5867 15.8154 9.13351 16.4747 10.8409 16.4747C14.4079 16.4747 17.3071 13.5755 17.3071 10.0085V8.57159",
      stroke: "white",
      strokeWidth: "1.66129",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ),
  /* @__PURE__ */ React53.createElement(
    "path",
    {
      d: "M4.375 8.57159V10.0085C4.375 10.9045 4.5525 11.7497 4.88215 12.5274",
      stroke: "white",
      strokeWidth: "1.66129",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ),
  /* @__PURE__ */ React53.createElement(
    "path",
    {
      d: "M17.6624 2.81549L4.02002 16.4663",
      stroke: "white",
      strokeWidth: "1.66129",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ),
  /* @__PURE__ */ React53.createElement(
    "path",
    {
      d: "M9.99561 2.95068V5.48643",
      stroke: "white",
      strokeWidth: "1.66129",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ),
  /* @__PURE__ */ React53.createElement(
    "path",
    {
      d: "M10.8408 16.4747V19.0105",
      stroke: "white",
      strokeWidth: "1.66129",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  )
);
var MicDisabledIcon_default = SvgMicDisabledIcon;

// src/assets/icons/tl/MicIcon.tsx
import * as React54 from "react";
var SvgMicIcon = (props) => /* @__PURE__ */ React54.createElement(
  "svg",
  __spreadValues({
    width: 18,
    height: 18,
    viewBox: "0 0 22 21",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props),
  /* @__PURE__ */ React54.createElement(
    "path",
    {
      d: "M10.9049 13.3448C12.7729 13.3448 14.2859 11.8318 14.2859 9.96384V5.31496C14.2859 3.44696 12.7729 1.93396 10.9049 1.93396C9.03692 1.93396 7.52393 3.44696 7.52393 5.31496V9.96384C7.52393 11.8318 9.03692 13.3448 10.9049 13.3448Z",
      stroke: "white",
      strokeWidth: "1.66129",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ),
  /* @__PURE__ */ React54.createElement(
    "path",
    {
      d: "M4.43896 8.40009V9.83701C4.43896 13.404 7.33817 16.3032 10.9051 16.3032C14.4721 16.3032 17.3713 13.404 17.3713 9.83701V8.40009",
      stroke: "white",
      strokeWidth: "1.66129",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ),
  /* @__PURE__ */ React54.createElement(
    "path",
    {
      d: "M9.73047 5.67844C10.4912 5.39951 11.3195 5.39951 12.0803 5.67844",
      stroke: "white",
      strokeWidth: "1.66129",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ),
  /* @__PURE__ */ React54.createElement(
    "path",
    {
      d: "M10.229 7.47034C10.677 7.35201 11.1419 7.35201 11.5899 7.47034",
      stroke: "white",
      strokeWidth: "1.66129",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ),
  /* @__PURE__ */ React54.createElement(
    "path",
    {
      d: "M10.9048 16.3032V18.839",
      stroke: "white",
      strokeWidth: "1.66129",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  )
);
var MicIcon_default = SvgMicIcon;

// src/assets/icons/util.tsx
function getSourceIcon(source, enabled) {
  switch (source) {
    case Track3.Source.Microphone:
      return enabled ? /* @__PURE__ */ React55.createElement(MicIcon_default, null) : /* @__PURE__ */ React55.createElement(MicDisabledIcon_default, null);
    case Track3.Source.Camera:
      return enabled ? /* @__PURE__ */ React55.createElement(CameraIcon_default, null) : /* @__PURE__ */ React55.createElement(CameraDisabledIcon_default, null);
    case Track3.Source.ScreenShare:
      return enabled ? /* @__PURE__ */ React55.createElement(ScreenShareStopIcon_default, null) : /* @__PURE__ */ React55.createElement(ScreenShareIcon_default, null);
    default:
      return void 0;
  }
}
function getConnectionQualityIcon(quality) {
  switch (quality) {
    case ConnectionQuality2.Excellent:
      return /* @__PURE__ */ React55.createElement(QualityExcellentIcon_default, null);
    case ConnectionQuality2.Good:
      return /* @__PURE__ */ React55.createElement(QualityGoodIcon_default, null);
    case ConnectionQuality2.Poor:
      return /* @__PURE__ */ React55.createElement(QualityPoorIcon_default, null);
    default:
      return /* @__PURE__ */ React55.createElement(QualityUnknownIcon_default, null);
  }
}

// src/components/controls/TrackToggle.tsx
function TrackToggle(_a) {
  var _b = _a, { showIcon } = _b, props = __objRest(_b, ["showIcon"]);
  const { buttonProps, enabled } = useTrackToggle(props);
  return /* @__PURE__ */ React56.createElement("button", __spreadValues({}, buttonProps), (showIcon != null ? showIcon : true) && getSourceIcon(props.source, enabled), props.children);
}

// src/prefabs/PreJoin.tsx
import { log as log7 } from "@livekit/components-core";

// src/assets/images/ParticipantPlaceholder.tsx
import * as React57 from "react";
var SvgParticipantPlaceholder = (props) => /* @__PURE__ */ React57.createElement(
  "svg",
  __spreadValues({
    width: 320,
    height: 320,
    viewBox: "0 0 320 320",
    preserveAspectRatio: "xMidYMid meet",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props),
  /* @__PURE__ */ React57.createElement(
    "path",
    {
      d: "M160 180C204.182 180 240 144.183 240 100C240 55.8172 204.182 20 160 20C115.817 20 79.9997 55.8172 79.9997 100C79.9997 144.183 115.817 180 160 180Z",
      fill: "white",
      fillOpacity: 0.25
    }
  ),
  /* @__PURE__ */ React57.createElement(
    "path",
    {
      d: "M97.6542 194.614C103.267 191.818 109.841 192.481 115.519 195.141C129.025 201.466 144.1 205 159.999 205C175.899 205 190.973 201.466 204.48 195.141C210.158 192.481 216.732 191.818 222.345 194.614C262.703 214.719 291.985 253.736 298.591 300.062C300.15 310.997 291.045 320 280 320H39.9997C28.954 320 19.8495 310.997 21.4087 300.062C28.014 253.736 57.2966 214.72 97.6542 194.614Z",
      fill: "white",
      fillOpacity: 0.25
    }
  )
);
var ParticipantPlaceholder_default = SvgParticipantPlaceholder;

// src/prefabs/PreJoin.tsx
var DEFAULT_USER_CHOICES = {
  username: "",
  videoEnabled: true,
  audioEnabled: true,
  videoDeviceId: "default",
  audioDeviceId: "default",
  e2ee: false,
  sharedPassphrase: ""
};
function usePreviewTracks(options, onError) {
  const [tracks, setTracks] = React58.useState();
  React58.useEffect(() => {
    let trackPromise = void 0;
    let needsCleanup = false;
    if (options.audio || options.video) {
      trackPromise = createLocalTracks(options);
      trackPromise.then((tracks2) => {
        if (needsCleanup) {
          tracks2.forEach((tr) => tr.stop());
        } else {
          setTracks(tracks2);
        }
      }).catch(onError);
    }
    return () => {
      needsCleanup = true;
      trackPromise == null ? void 0 : trackPromise.then(
        (tracks2) => tracks2.forEach((track) => {
          track.stop();
        })
      );
    };
  }, [JSON.stringify(options)]);
  return tracks;
}
function usePreviewDevice(enabled, deviceId, kind) {
  const [deviceError, setDeviceError] = React58.useState(null);
  const [isCreatingTrack, setIsCreatingTrack] = React58.useState(false);
  const devices = useMediaDevices({ kind });
  const [selectedDevice, setSelectedDevice] = React58.useState(
    void 0
  );
  const [localTrack, setLocalTrack] = React58.useState();
  const [localDeviceId, setLocalDeviceId] = React58.useState(deviceId);
  React58.useEffect(() => {
    setLocalDeviceId(deviceId);
  }, [deviceId]);
  const createTrack = (deviceId2, kind2) => __async(this, null, function* () {
    try {
      const track = kind2 === "videoinput" ? yield createLocalVideoTrack({
        deviceId: deviceId2,
        resolution: VideoPresets.h720.resolution
      }) : yield createLocalAudioTrack({ deviceId: deviceId2 });
      const newDeviceId = yield track.getDeviceId();
      if (newDeviceId && deviceId2 !== newDeviceId) {
        prevDeviceId.current = newDeviceId;
        setLocalDeviceId(newDeviceId);
      }
      setLocalTrack(track);
    } catch (e) {
      if (e instanceof Error) {
        setDeviceError(e);
      }
    }
  });
  const switchDevice = (track, id) => __async(this, null, function* () {
    yield track.setDeviceId(id);
    prevDeviceId.current = id;
  });
  const prevDeviceId = React58.useRef(localDeviceId);
  React58.useEffect(() => {
    if (enabled && !localTrack && !deviceError && !isCreatingTrack) {
      log7.debug("creating track", kind);
      setIsCreatingTrack(true);
      createTrack(localDeviceId, kind).finally(() => {
        setIsCreatingTrack(false);
      });
    }
  }, [enabled, localTrack, deviceError, isCreatingTrack]);
  React58.useEffect(() => {
    if (!localTrack) {
      return;
    }
    if (!enabled) {
      log7.debug(`muting ${kind} track`);
      localTrack.mute().then(() => log7.debug(localTrack.mediaStreamTrack));
    } else if ((selectedDevice == null ? void 0 : selectedDevice.deviceId) && prevDeviceId.current !== (selectedDevice == null ? void 0 : selectedDevice.deviceId)) {
      log7.debug(`switching ${kind} device from`, prevDeviceId.current, selectedDevice.deviceId);
      switchDevice(localTrack, selectedDevice.deviceId);
    } else {
      log7.debug(`unmuting local ${kind} track`);
      localTrack.unmute();
    }
  }, [localTrack, selectedDevice, enabled, kind]);
  React58.useEffect(() => {
    return () => {
      if (localTrack) {
        log7.debug(`stopping local ${kind} track`);
        localTrack.stop();
        localTrack.mute();
      }
    };
  }, []);
  React58.useEffect(() => {
    setSelectedDevice(devices.find((dev) => dev.deviceId === localDeviceId));
  }, [localDeviceId, devices]);
  return {
    selectedDevice,
    localTrack,
    deviceError
  };
}
function PreJoin(_a) {
  var _b = _a, {
    defaults = {},
    onValidate,
    onSubmit,
    onError,
    debug,
    joinLabel = "Join Room",
    micLabel = "Microphone",
    camLabel = "Camera",
    userLabel = "Username",
    showE2EEOptions = false
  } = _b, htmlProps = __objRest(_b, [
    "defaults",
    "onValidate",
    "onSubmit",
    "onError",
    "debug",
    "joinLabel",
    "micLabel",
    "camLabel",
    "userLabel",
    "showE2EEOptions"
  ]);
  var _a2, _b2, _c, _d, _e, _f, _g;
  const [userChoices, setUserChoices] = React58.useState(DEFAULT_USER_CHOICES);
  const [username, setUsername] = React58.useState(
    (_a2 = defaults.username) != null ? _a2 : DEFAULT_USER_CHOICES.username
  );
  const [videoEnabled, setVideoEnabled] = React58.useState(
    (_b2 = defaults.videoEnabled) != null ? _b2 : DEFAULT_USER_CHOICES.videoEnabled
  );
  const initialVideoDeviceId = (_c = defaults.videoDeviceId) != null ? _c : DEFAULT_USER_CHOICES.videoDeviceId;
  const [videoDeviceId, setVideoDeviceId] = React58.useState(initialVideoDeviceId);
  const initialAudioDeviceId = (_d = defaults.audioDeviceId) != null ? _d : DEFAULT_USER_CHOICES.audioDeviceId;
  const [audioEnabled, setAudioEnabled] = React58.useState(
    (_e = defaults.audioEnabled) != null ? _e : DEFAULT_USER_CHOICES.audioEnabled
  );
  const [audioDeviceId, setAudioDeviceId] = React58.useState(initialAudioDeviceId);
  const [e2ee, setE2ee] = React58.useState((_f = defaults.e2ee) != null ? _f : DEFAULT_USER_CHOICES.e2ee);
  const [sharedPassphrase, setSharedPassphrase] = React58.useState(
    (_g = defaults.sharedPassphrase) != null ? _g : DEFAULT_USER_CHOICES.sharedPassphrase
  );
  const tracks = usePreviewTracks(
    {
      audio: audioEnabled ? { deviceId: initialAudioDeviceId } : false,
      video: videoEnabled ? { deviceId: initialVideoDeviceId } : false
    },
    onError
  );
  const videoEl = React58.useRef(null);
  const videoTrack = React58.useMemo(
    () => tracks == null ? void 0 : tracks.filter((track) => track.kind === Track4.Kind.Video)[0],
    [tracks]
  );
  const facingMode = React58.useMemo(() => {
    if (videoTrack) {
      const { facingMode: facingMode2 } = facingModeFromLocalTrack2(videoTrack);
      return facingMode2;
    } else {
      return "undefined";
    }
  }, [videoTrack]);
  const audioTrack = React58.useMemo(
    () => tracks == null ? void 0 : tracks.filter((track) => track.kind === Track4.Kind.Audio)[0],
    [tracks]
  );
  React58.useEffect(() => {
    if (videoEl.current && videoTrack) {
      videoTrack.unmute();
      videoTrack.attach(videoEl.current);
    }
    return () => {
      videoTrack == null ? void 0 : videoTrack.detach();
    };
  }, [videoTrack]);
  const [isValid, setIsValid] = React58.useState();
  const handleValidation = React58.useCallback(
    (values) => {
      if (typeof onValidate === "function") {
        return onValidate(values);
      } else {
        return values.username !== "";
      }
    },
    [onValidate]
  );
  React58.useEffect(() => {
    const newUserChoices = {
      username,
      videoEnabled,
      videoDeviceId,
      audioEnabled,
      audioDeviceId,
      e2ee,
      sharedPassphrase
    };
    setUserChoices(newUserChoices);
    setIsValid(handleValidation(newUserChoices));
  }, [
    username,
    videoEnabled,
    handleValidation,
    audioEnabled,
    audioDeviceId,
    videoDeviceId,
    sharedPassphrase,
    e2ee
  ]);
  function handleSubmit(event) {
    event.preventDefault();
    if (handleValidation(userChoices)) {
      if (typeof onSubmit === "function") {
        onSubmit(userChoices);
      }
    } else {
      log7.warn("Validation failed with: ", userChoices);
    }
  }
  return /* @__PURE__ */ React58.createElement("div", __spreadValues({ className: "lk-prejoin" }, htmlProps), /* @__PURE__ */ React58.createElement("div", { className: "lk-video-container" }, videoTrack && /* @__PURE__ */ React58.createElement("video", { ref: videoEl, width: "1280", height: "720", "data-lk-facing-mode": facingMode }), (!videoTrack || !videoEnabled) && /* @__PURE__ */ React58.createElement("div", { className: "lk-camera-off-note" }, /* @__PURE__ */ React58.createElement(ParticipantPlaceholder_default, null))), /* @__PURE__ */ React58.createElement("div", { className: "lk-button-group-container" }, /* @__PURE__ */ React58.createElement("div", { className: "lk-button-group audio" }, /* @__PURE__ */ React58.createElement(
    TrackToggle,
    {
      initialState: audioEnabled,
      source: Track4.Source.Microphone,
      onChange: (enabled) => setAudioEnabled(enabled)
    },
    micLabel
  ), /* @__PURE__ */ React58.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ React58.createElement(
    MediaDeviceMenu,
    {
      initialSelection: audioDeviceId,
      kind: "audioinput",
      disabled: !audioTrack,
      tracks: { audioinput: audioTrack },
      onActiveDeviceChange: (_, id) => setAudioDeviceId(id)
    }
  ))), /* @__PURE__ */ React58.createElement("div", { className: "lk-button-group video" }, /* @__PURE__ */ React58.createElement(
    TrackToggle,
    {
      initialState: videoEnabled,
      source: Track4.Source.Camera,
      onChange: (enabled) => setVideoEnabled(enabled)
    },
    camLabel
  ), /* @__PURE__ */ React58.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ React58.createElement(
    MediaDeviceMenu,
    {
      initialSelection: videoDeviceId,
      kind: "videoinput",
      disabled: !videoTrack,
      tracks: { videoinput: videoTrack },
      onActiveDeviceChange: (_, id) => setVideoDeviceId(id)
    }
  )))), /* @__PURE__ */ React58.createElement("form", { className: "lk-username-container" }, /* @__PURE__ */ React58.createElement(
    "input",
    {
      className: "lk-form-control",
      id: "username",
      name: "username",
      type: "text",
      defaultValue: username,
      placeholder: userLabel,
      onChange: (inputEl) => setUsername(inputEl.target.value),
      autoComplete: "off"
    }
  ), showE2EEOptions && /* @__PURE__ */ React58.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "1rem" } }, /* @__PURE__ */ React58.createElement("div", { style: { display: "flex", flexDirection: "row", gap: "1rem" } }, /* @__PURE__ */ React58.createElement(
    "input",
    {
      id: "use-e2ee",
      type: "checkbox",
      checked: e2ee,
      onChange: (ev) => setE2ee(ev.target.checked)
    }
  ), /* @__PURE__ */ React58.createElement("label", { htmlFor: "use-e2ee" }, "Enable end-to-end encryption")), e2ee && /* @__PURE__ */ React58.createElement("div", { style: { display: "flex", flexDirection: "row", gap: "1rem" } }, /* @__PURE__ */ React58.createElement("label", { htmlFor: "passphrase" }, "Passphrase"), /* @__PURE__ */ React58.createElement(
    "input",
    {
      id: "passphrase",
      type: "password",
      value: sharedPassphrase,
      onChange: (ev) => setSharedPassphrase(ev.target.value)
    }
  ))), /* @__PURE__ */ React58.createElement(
    "button",
    {
      className: "lk-button lk-join-button",
      type: "submit",
      onClick: handleSubmit,
      disabled: !isValid
    },
    joinLabel
  )), debug && /* @__PURE__ */ React58.createElement(React58.Fragment, null, /* @__PURE__ */ React58.createElement("strong", null, "User Choices:"), /* @__PURE__ */ React58.createElement("ul", { className: "lk-list", style: { overflow: "hidden", maxWidth: "15rem" } }, /* @__PURE__ */ React58.createElement("li", null, "Username: ", `${userChoices.username}`), /* @__PURE__ */ React58.createElement("li", null, "Video Enabled: ", `${userChoices.videoEnabled}`), /* @__PURE__ */ React58.createElement("li", null, "Audio Enabled: ", `${userChoices.audioEnabled}`), /* @__PURE__ */ React58.createElement("li", null, "Video Device: ", `${userChoices.videoDeviceId}`), /* @__PURE__ */ React58.createElement("li", null, "Audio Device: ", `${userChoices.audioDeviceId}`))));
}

// src/prefabs/VideoConference.tsx
import { isEqualTrackRef, isTrackReference as isTrackReference4, isWeb, log as log10, setupParticipantName as setupParticipantName3 } from "@livekit/components-core";
import { RoomEvent, Track as Track11 } from "livekit-client";
import * as React95 from "react";

// src/components/controls/ChatToggle.tsx
import * as React59 from "react";
function ChatToggle(props) {
  const { mergedProps } = useChatToggle({ props });
  return /* @__PURE__ */ React59.createElement("button", __spreadValues({}, mergedProps), props.children);
}

// src/components/controls/ShareLinkToggle.tsx
import * as React60 from "react";
import { setupShareLinkToggle } from "@livekit/components-core";
function useToggleShareLink({ props }) {
  const { dispatch, state } = useLayoutContext().widget;
  const { className } = React60.useMemo(() => setupShareLinkToggle(), []);
  const mergedProps = React60.useMemo(
    () => mergeProps2(props, {
      className,
      onClick: () => {
        if (dispatch)
          dispatch({ msg: "show_invite" });
      },
      "aria-pressed": (state == null ? void 0 : state.showChat) == "show_invite" ? "true" : "false"
    }),
    [props, className, dispatch]
  );
  return { mergedProps };
}
function ShareLinkToggle(props) {
  const { mergedProps } = useToggleShareLink({ props });
  return /* @__PURE__ */ React60.createElement("button", __spreadValues({}, mergedProps), props.children);
}

// src/components/controls/DisconnectButton.tsx
import * as React61 from "react";
function DisconnectButton(props) {
  const { buttonProps } = useDisconnectButton(props);
  return /* @__PURE__ */ React61.createElement("button", __spreadValues({}, buttonProps), props.children);
}

// src/components/controls/FocusToggle.tsx
import * as React62 from "react";
function FocusToggle(_a) {
  var _b = _a, { trackRef, trackSource, participant } = _b, props = __objRest(_b, ["trackRef", "trackSource", "participant"]);
  const trackRefFromContext = useMaybeTrackRefContext();
  const { mergedProps, inFocus } = useFocusToggle({
    trackRef: trackRef != null ? trackRef : trackRefFromContext,
    trackSource,
    participant,
    props
  });
  return /* @__PURE__ */ React62.createElement(LayoutContext.Consumer, null, (layoutContext) => layoutContext !== void 0 && /* @__PURE__ */ React62.createElement("button", __spreadValues({}, mergedProps), props.children ? props.children : inFocus ? /* @__PURE__ */ React62.createElement(UnfocusToggleIcon_default, null) : /* @__PURE__ */ React62.createElement(FocusToggleIcon_default, null)));
}

// src/components/controls/StartAudio.tsx
import * as React63 from "react";
function StartAudio(_a) {
  var _b = _a, { label = "Allow Audio" } = _b, props = __objRest(_b, ["label"]);
  const room = useRoomContext();
  const { mergedProps } = useStartAudio({ room, props });
  return /* @__PURE__ */ React63.createElement("button", __spreadValues({}, mergedProps), label);
}

// src/components/layout/FocusLayout.tsx
import * as React71 from "react";

// src/components/participant/ParticipantTile.tsx
import * as React70 from "react";
import { Track as Track5 } from "livekit-client";
import { isTrackReference as isTrackReference3, isTrackReferencePinned as isTrackReferencePinned2 } from "@livekit/components-core";

// src/components/participant/ConnectionQualityIndicator.tsx
import * as React64 from "react";
function ConnectionQualityIndicator(props) {
  var _a;
  const { className, quality } = useConnectionQualityIndicator(props);
  const elementProps = React64.useMemo(() => {
    return __spreadProps(__spreadValues({}, mergeProps2(props, { className })), { "data-lk-quality": quality });
  }, [quality, props, className]);
  return /* @__PURE__ */ React64.createElement("div", __spreadValues({}, elementProps), (_a = props.children) != null ? _a : getConnectionQualityIcon(quality));
}

// src/components/participant/ParticipantName.tsx
import { setupParticipantName } from "@livekit/components-core";
import * as React65 from "react";
function ParticipantName(_a) {
  var _b = _a, { participant } = _b, props = __objRest(_b, ["participant"]);
  const p = useEnsureParticipant(participant);
  const { className, infoObserver } = React65.useMemo(() => {
    return setupParticipantName(p);
  }, [p]);
  const { identity, name } = useObservableState(infoObserver, {
    name: p.name,
    identity: p.identity,
    metadata: p.metadata
  });
  const mergedProps = React65.useMemo(() => {
    return mergeProps2(props, { className, "data-lk-participant-name": name });
  }, [props, className, name]);
  return /* @__PURE__ */ React65.createElement("span", __spreadValues({}, mergedProps), name !== "" ? name : identity, props.children);
}

// src/components/participant/TrackMutedIndicator.tsx
import * as React66 from "react";
function TrackMutedIndicator(_a) {
  var _b = _a, {
    source,
    participant,
    trackRef,
    show = "always"
  } = _b, props = __objRest(_b, [
    "source",
    "participant",
    "trackRef",
    "show"
  ]);
  var _a2, _b2;
  const { className, isMuted } = useTrackMutedIndicator(trackRef != null ? trackRef : source, { participant });
  const showIndicator = show === "always" || show === "muted" && isMuted || show === "unmuted" && !isMuted;
  const htmlProps = React66.useMemo(
    () => mergeProps2(props, {
      className
    }),
    [className, props]
  );
  if (!showIndicator) {
    return null;
  }
  return /* @__PURE__ */ React66.createElement("div", __spreadProps(__spreadValues({}, htmlProps), { "data-lk-muted": isMuted }), (_b2 = props.children) != null ? _b2 : getSourceIcon((_a2 = trackRef == null ? void 0 : trackRef.source) != null ? _a2 : source, !isMuted));
}

// src/components/participant/VideoTrack.tsx
import {
  RemoteTrackPublication
} from "livekit-client";
import * as React67 from "react";
import * as useHooks from "usehooks-ts";
function VideoTrack(_a) {
  var _b = _a, {
    onTrackClick,
    onClick,
    onSubscriptionStatusChanged,
    trackRef,
    name,
    publication,
    source,
    participant: p,
    manageSubscription
  } = _b, props = __objRest(_b, [
    "onTrackClick",
    "onClick",
    "onSubscriptionStatusChanged",
    "trackRef",
    "name",
    "publication",
    "source",
    "participant",
    "manageSubscription"
  ]);
  var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j;
  const maybeTrackRef = useMaybeTrackRefContext();
  const _name = (_d = (_c = (_a2 = trackRef == null ? void 0 : trackRef.publication) == null ? void 0 : _a2.trackName) != null ? _c : (_b2 = maybeTrackRef == null ? void 0 : maybeTrackRef.publication) == null ? void 0 : _b2.trackName) != null ? _d : name;
  const _source = (_f = (_e = trackRef == null ? void 0 : trackRef.source) != null ? _e : maybeTrackRef == null ? void 0 : maybeTrackRef.source) != null ? _f : source;
  const _publication = (_h = (_g = trackRef == null ? void 0 : trackRef.publication) != null ? _g : maybeTrackRef == null ? void 0 : maybeTrackRef.publication) != null ? _h : publication;
  const _participant = (_j = (_i = trackRef == null ? void 0 : trackRef.participant) != null ? _i : maybeTrackRef == null ? void 0 : maybeTrackRef.participant) != null ? _j : p;
  if (_source === void 0) {
    throw new Error("VideoTrack: You must provide a trackRef or source property.");
  }
  const participant = useEnsureParticipant(_participant);
  const mediaEl = React67.useRef(null);
  const intersectionEntry = useHooks.useIntersectionObserver(mediaEl, {});
  const debouncedIntersectionEntry = useHooks.useDebounce(intersectionEntry, 3e3);
  React67.useEffect(() => {
    if (manageSubscription && _publication instanceof RemoteTrackPublication && (debouncedIntersectionEntry == null ? void 0 : debouncedIntersectionEntry.isIntersecting) === false && (intersectionEntry == null ? void 0 : intersectionEntry.isIntersecting) === false) {
      _publication.setSubscribed(false);
    }
  }, [debouncedIntersectionEntry, _publication, manageSubscription]);
  React67.useEffect(() => {
    if (manageSubscription && _publication instanceof RemoteTrackPublication && (intersectionEntry == null ? void 0 : intersectionEntry.isIntersecting) === true) {
      _publication.setSubscribed(true);
    }
  }, [intersectionEntry, _publication, manageSubscription]);
  const {
    elementProps,
    publication: pub,
    isSubscribed
  } = useMediaTrackBySourceOrName(
    { participant, name: _name, source: _source, publication: _publication },
    {
      element: mediaEl,
      props
    }
  );
  React67.useEffect(() => {
    onSubscriptionStatusChanged == null ? void 0 : onSubscriptionStatusChanged(!!isSubscribed);
  }, [isSubscribed, onSubscriptionStatusChanged]);
  const clickHandler = (evt) => {
    onClick == null ? void 0 : onClick(evt);
    onTrackClick == null ? void 0 : onTrackClick({ participant, track: pub });
  };
  return /* @__PURE__ */ React67.createElement("video", __spreadProps(__spreadValues({ ref: mediaEl }, elementProps), { muted: true, onClick: clickHandler }));
}

// src/components/participant/AudioTrack.tsx
import * as React68 from "react";
import { log as log8 } from "@livekit/components-core";
import { RemoteAudioTrack, RemoteTrackPublication as RemoteTrackPublication2 } from "livekit-client";
function AudioTrack(_a) {
  var _b = _a, {
    trackRef,
    onSubscriptionStatusChanged,
    volume,
    source,
    name,
    publication,
    participant: p
  } = _b, props = __objRest(_b, [
    "trackRef",
    "onSubscriptionStatusChanged",
    "volume",
    "source",
    "name",
    "publication",
    "participant"
  ]);
  var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j;
  const maybeTrackRef = useMaybeTrackRefContext();
  const _name = (_d = (_c = (_a2 = trackRef == null ? void 0 : trackRef.publication) == null ? void 0 : _a2.trackName) != null ? _c : (_b2 = maybeTrackRef == null ? void 0 : maybeTrackRef.publication) == null ? void 0 : _b2.trackName) != null ? _d : name;
  const _source = (_f = (_e = trackRef == null ? void 0 : trackRef.source) != null ? _e : maybeTrackRef == null ? void 0 : maybeTrackRef.source) != null ? _f : source;
  const _publication = (_h = (_g = trackRef == null ? void 0 : trackRef.publication) != null ? _g : maybeTrackRef == null ? void 0 : maybeTrackRef.publication) != null ? _h : publication;
  const _participant = (_j = (_i = trackRef == null ? void 0 : trackRef.participant) != null ? _i : maybeTrackRef == null ? void 0 : maybeTrackRef.participant) != null ? _j : p;
  if (_source === void 0) {
    throw new Error("The AudioTrack component expects a trackRef or source property.");
  }
  const mediaEl = React68.useRef(null);
  const participant = useEnsureParticipant(_participant);
  const {
    elementProps,
    isSubscribed,
    track,
    publication: pub
  } = useMediaTrackBySourceOrName(
    { source: _source, name: _name, participant, publication: _publication },
    {
      element: mediaEl,
      props
    }
  );
  React68.useEffect(() => {
    onSubscriptionStatusChanged == null ? void 0 : onSubscriptionStatusChanged(!!isSubscribed);
  }, [isSubscribed, onSubscriptionStatusChanged]);
  React68.useEffect(() => {
    if (track === void 0 || volume === void 0) {
      return;
    }
    if (track instanceof RemoteAudioTrack) {
      track.setVolume(volume);
    } else {
      log8.warn("Volume can only be set on remote audio tracks.");
    }
  }, [volume, track]);
  React68.useEffect(() => {
    if (pub === void 0 || props.muted === void 0) {
      return;
    }
    if (pub instanceof RemoteTrackPublication2) {
      pub.setEnabled(!props.muted);
    } else {
      log8.warn("Can only call setEnabled on remote track publications.");
    }
  }, [props.muted, pub, track]);
  return /* @__PURE__ */ React68.createElement("audio", __spreadValues({ ref: mediaEl }, elementProps));
}

// src/hooks/useIsEncrypted.ts
import * as React69 from "react";
import { LocalParticipant } from "livekit-client";
import { encryptionStatusObservable } from "@livekit/components-core";
function useIsEncrypted(participant) {
  const p = useEnsureParticipant(participant);
  const room = useEnsureRoom();
  const observer = React69.useMemo(() => encryptionStatusObservable(room, p), [room, p]);
  const isEncrypted = useObservableState(
    observer,
    p instanceof LocalParticipant ? p.isE2EEEnabled : p.isEncrypted
  );
  return isEncrypted;
}

// src/components/participant/ParticipantTile.tsx
function ParticipantContextIfNeeded(props) {
  const hasContext = !!useMaybeParticipantContext();
  return props.participant && !hasContext ? /* @__PURE__ */ React70.createElement(ParticipantContext.Provider, { value: props.participant }, props.children) : /* @__PURE__ */ React70.createElement(React70.Fragment, null, props.children);
}
function TrackRefContextIfNeeded(props) {
  const hasContext = !!useMaybeTrackRefContext();
  return props.trackRef && !hasContext ? /* @__PURE__ */ React70.createElement(TrackRefContext.Provider, { value: props.trackRef }, props.children) : /* @__PURE__ */ React70.createElement(React70.Fragment, null, props.children);
}
function ParticipantTile(_a) {
  var _b = _a, {
    trackRef,
    participant,
    children,
    source = Track5.Source.Camera,
    onParticipantClick,
    publication,
    disableSpeakingIndicator
  } = _b, htmlProps = __objRest(_b, [
    "trackRef",
    "participant",
    "children",
    "source",
    "onParticipantClick",
    "publication",
    "disableSpeakingIndicator"
  ]);
  var _a2, _b2;
  const maybeTrackRef = useMaybeTrackRefContext();
  const p = useEnsureParticipant(participant);
  const trackReference = React70.useMemo(() => {
    var _a3, _b3, _c, _d, _e, _f;
    return {
      participant: (_b3 = (_a3 = trackRef == null ? void 0 : trackRef.participant) != null ? _a3 : maybeTrackRef == null ? void 0 : maybeTrackRef.participant) != null ? _b3 : p,
      source: (_d = (_c = trackRef == null ? void 0 : trackRef.source) != null ? _c : maybeTrackRef == null ? void 0 : maybeTrackRef.source) != null ? _d : source,
      publication: (_f = (_e = trackRef == null ? void 0 : trackRef.publication) != null ? _e : maybeTrackRef == null ? void 0 : maybeTrackRef.publication) != null ? _f : publication
    };
  }, [maybeTrackRef, p, publication, source, trackRef]);
  const { elementProps } = useParticipantTile({
    participant: trackReference.participant,
    htmlProps,
    source: trackReference.source,
    publication: trackReference.publication,
    disableSpeakingIndicator,
    onParticipantClick
  });
  const isEncrypted = useIsEncrypted(p);
  const layoutContext = useMaybeLayoutContext();
  const autoManageSubscription = (_a2 = useFeatureContext()) == null ? void 0 : _a2.autoSubscription;
  const handleSubscribe = React70.useCallback(
    (subscribed) => {
      if (trackReference.source && !subscribed && layoutContext && layoutContext.pin.dispatch && isTrackReferencePinned2(trackReference, layoutContext.pin.state)) {
        layoutContext.pin.dispatch({ msg: "clear_pin" });
      }
    },
    [trackReference, layoutContext]
  );
  return /* @__PURE__ */ React70.createElement("div", __spreadValues({ style: { position: "relative" } }, elementProps), /* @__PURE__ */ React70.createElement(TrackRefContextIfNeeded, { trackRef: trackReference }, /* @__PURE__ */ React70.createElement(ParticipantContextIfNeeded, { participant: trackReference.participant }, children != null ? children : /* @__PURE__ */ React70.createElement(React70.Fragment, null, isTrackReference3(trackReference) && (((_b2 = trackReference.publication) == null ? void 0 : _b2.kind) === "video" || trackReference.source === Track5.Source.Camera || trackReference.source === Track5.Source.ScreenShare) ? /* @__PURE__ */ React70.createElement(
    VideoTrack,
    {
      trackRef: trackReference,
      onSubscriptionStatusChanged: handleSubscribe,
      manageSubscription: autoManageSubscription
    }
  ) : isTrackReference3(trackReference) && /* @__PURE__ */ React70.createElement(
    AudioTrack,
    {
      trackRef: trackReference,
      onSubscriptionStatusChanged: handleSubscribe
    }
  ), /* @__PURE__ */ React70.createElement("div", { className: "lk-participant-placeholder" }, /* @__PURE__ */ React70.createElement(ParticipantPlaceholder_default, null)), /* @__PURE__ */ React70.createElement("div", { className: "lk-participant-metadata" }, /* @__PURE__ */ React70.createElement("div", { className: "lk-participant-metadata-item" }, trackReference.source === Track5.Source.Camera ? /* @__PURE__ */ React70.createElement(React70.Fragment, null, isEncrypted && /* @__PURE__ */ React70.createElement(LockLockedIcon_default, { style: { marginRight: "0.25rem" } }), /* @__PURE__ */ React70.createElement(
    TrackMutedIndicator,
    {
      source: Track5.Source.Microphone,
      show: "muted"
    }
  ), /* @__PURE__ */ React70.createElement(ParticipantName, null)) : /* @__PURE__ */ React70.createElement(React70.Fragment, null, /* @__PURE__ */ React70.createElement(ScreenShareIcon_default, { style: { marginRight: "0.25rem" } }), /* @__PURE__ */ React70.createElement(ParticipantName, null, "'s screen"))), /* @__PURE__ */ React70.createElement(ConnectionQualityIndicator, { className: "lk-participant-metadata-item" }))), /* @__PURE__ */ React70.createElement(FocusToggle, { trackRef: trackReference }))));
}

// src/components/layout/FocusLayout.tsx
function FocusLayoutContainer(props) {
  const elementProps = mergeProps2(props, { className: "lk-focus-layout" });
  return /* @__PURE__ */ React71.createElement("div", __spreadValues({}, elementProps), props.children);
}
function FocusLayout(_a) {
  var _b = _a, { trackRef, track } = _b, htmlProps = __objRest(_b, ["trackRef", "track"]);
  const trackReference = trackRef != null ? trackRef : track;
  return /* @__PURE__ */ React71.createElement(ParticipantTile, __spreadValues(__spreadValues({}, trackReference), htmlProps));
}

// src/components/layout/GridLayout.tsx
import * as React75 from "react";

// src/components/TrackLoop.tsx
import * as React72 from "react";
import { getTrackReferenceId as getTrackReferenceId3 } from "@livekit/components-core";
function TrackLoop(_a) {
  var _b = _a, { tracks } = _b, props = __objRest(_b, ["tracks"]);
  return /* @__PURE__ */ React72.createElement(React72.Fragment, null, tracks.map((trackReference) => {
    return /* @__PURE__ */ React72.createElement(
      TrackRefContext.Provider,
      {
        value: trackReference,
        key: getTrackReferenceId3(trackReference)
      },
      cloneSingleChild(props.children)
    );
  }));
}

// src/components/controls/PaginationControl.tsx
import * as React73 from "react";
import { createInteractingObservable } from "@livekit/components-core";
function PaginationControl({
  totalPageCount,
  nextPage,
  prevPage,
  currentPage,
  pagesContainer: connectedElement
}) {
  const [interactive, setInteractive] = React73.useState(false);
  React73.useEffect(() => {
    let subscription;
    if (connectedElement) {
      subscription = createInteractingObservable(connectedElement.current, 2e3).subscribe(
        setInteractive
      );
    }
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [connectedElement]);
  return /* @__PURE__ */ React73.createElement("div", { className: "lk-pagination-control", "data-lk-user-interaction": interactive }, /* @__PURE__ */ React73.createElement("button", { className: "lk-button", onClick: prevPage }, /* @__PURE__ */ React73.createElement(Chevron_default, null)), /* @__PURE__ */ React73.createElement("span", { className: "lk-pagination-count" }, `${currentPage} of ${totalPageCount}`), /* @__PURE__ */ React73.createElement("button", { className: "lk-button", onClick: nextPage }, /* @__PURE__ */ React73.createElement(Chevron_default, null)));
}

// src/components/controls/PaginationIndicator.tsx
import * as React74 from "react";
function PaginationIndicator({ totalPageCount, currentPage }) {
  const bubbles = new Array(totalPageCount).fill("").map((_, index) => {
    if (index + 1 === currentPage) {
      return /* @__PURE__ */ React74.createElement("span", { "data-lk-active": true, key: index });
    } else {
      return /* @__PURE__ */ React74.createElement("span", { key: index });
    }
  });
  return /* @__PURE__ */ React74.createElement("div", { className: "lk-pagination-indicator" }, bubbles);
}

// src/components/layout/GridLayout.tsx
function GridLayout(_a) {
  var _b = _a, { tracks } = _b, props = __objRest(_b, ["tracks"]);
  const gridEl = React75.createRef();
  const elementProps = React75.useMemo(
    () => mergeProps2(props, { className: "lk-grid-layout" }),
    [props]
  );
  const { layout } = useGridLayout(gridEl, tracks.length);
  const pagination = usePagination(layout.maxTiles, tracks);
  useSwipe(gridEl, {
    onLeftSwipe: pagination.nextPage,
    onRightSwipe: pagination.prevPage
  });
  return /* @__PURE__ */ React75.createElement("div", __spreadValues({ ref: gridEl, "data-lk-pagination": pagination.totalPageCount > 1 }, elementProps), /* @__PURE__ */ React75.createElement(TrackLoop, { tracks: pagination.tracks }, props.children), tracks.length > layout.maxTiles && /* @__PURE__ */ React75.createElement(React75.Fragment, null, /* @__PURE__ */ React75.createElement(
    PaginationIndicator,
    {
      totalPageCount: pagination.totalPageCount,
      currentPage: pagination.currentPage
    }
  ), /* @__PURE__ */ React75.createElement(PaginationControl, __spreadValues({ pagesContainer: gridEl }, pagination))));
}

// src/components/layout/CarouselLayout.tsx
import { getScrollBarWidth } from "@livekit/components-core";
import * as React76 from "react";
var MIN_HEIGHT = 130;
var MIN_WIDTH = 140;
var MIN_VISIBLE_TILES = 1;
var ASPECT_RATIO = 16 / 10;
var ASPECT_RATIO_INVERT = (1 - ASPECT_RATIO) * -1;
function CarouselLayout(_a) {
  var _b = _a, { tracks, orientation } = _b, props = __objRest(_b, ["tracks", "orientation"]);
  const asideEl = React76.useRef(null);
  const [prevTiles, setPrevTiles] = React76.useState(0);
  const { width, height } = useSize(asideEl);
  const carouselOrientation = orientation ? orientation : height >= width ? "vertical" : "horizontal";
  const tileSpan = carouselOrientation === "vertical" ? Math.max(width * ASPECT_RATIO_INVERT, MIN_HEIGHT) : Math.max(height * ASPECT_RATIO, MIN_WIDTH);
  const scrollBarWidth = getScrollBarWidth();
  const tilesThatFit = carouselOrientation === "vertical" ? Math.max((height - scrollBarWidth) / tileSpan, MIN_VISIBLE_TILES) : Math.max((width - scrollBarWidth) / tileSpan, MIN_VISIBLE_TILES);
  let maxVisibleTiles = Math.round(tilesThatFit);
  if (Math.abs(tilesThatFit - prevTiles) < 0.5) {
    maxVisibleTiles = Math.round(prevTiles);
  } else if (prevTiles !== tilesThatFit) {
    setPrevTiles(tilesThatFit);
  }
  const sortedTiles = useVisualStableUpdate(tracks, maxVisibleTiles);
  React76.useLayoutEffect(() => {
    if (asideEl.current) {
      asideEl.current.dataset.lkOrientation = carouselOrientation;
      asideEl.current.style.setProperty("--lk-max-visible-tiles", maxVisibleTiles.toString());
    }
  }, [maxVisibleTiles, carouselOrientation]);
  return /* @__PURE__ */ React76.createElement("aside", __spreadValues({ key: carouselOrientation, className: "lk-carousel", ref: asideEl }, props), /* @__PURE__ */ React76.createElement(TrackLoop, { tracks: sortedTiles }, props.children));
}

// src/components/layout/LayoutContextProvider.tsx
import { log as log9 } from "@livekit/components-core";
import * as React77 from "react";
function LayoutContextProvider({
  value,
  onPinChange,
  onWidgetChange,
  children
}) {
  const layoutContextValue = useEnsureCreateLayoutContext(value);
  React77.useEffect(() => {
    log9.debug("PinState Updated", { state: layoutContextValue.pin.state });
    if (onPinChange && layoutContextValue.pin.state)
      onPinChange(layoutContextValue.pin.state);
  }, [layoutContextValue.pin.state, onPinChange]);
  React77.useEffect(() => {
    log9.debug("Chat Widget Updated", { widgetState: layoutContextValue.widget.state });
    if (onWidgetChange && layoutContextValue.widget.state) {
      onWidgetChange(layoutContextValue.widget.state);
    }
  }, [onWidgetChange, layoutContextValue.widget.state]);
  return /* @__PURE__ */ React77.createElement(LayoutContext.Provider, { value: layoutContextValue }, children);
}

// src/components/participant/AudioVisualizer.tsx
import { createAudioAnalyser, LocalAudioTrack, RemoteAudioTrack as RemoteAudioTrack2, Track as Track6 } from "livekit-client";
import * as React78 from "react";
function AudioVisualizer(_a) {
  var _b = _a, { participant, trackRef } = _b, props = __objRest(_b, ["participant", "trackRef"]);
  var _a2, _b2;
  const [volumeBars, setVolumeBars] = React78.useState([]);
  const svgWidth = 200;
  const svgHeight = 90;
  const barWidth = 6;
  const barSpacing = 4;
  const volMultiplier = 50;
  const barCount = 7;
  const p = (_a2 = useMaybeParticipantContext()) != null ? _a2 : participant;
  let ref = (_b2 = useMaybeTrackRefContext()) != null ? _b2 : trackRef;
  if (!ref) {
    if (!p) {
      throw Error(`Participant missing, provide it directly or within a context`);
    }
    ref = { participant: p, source: Track6.Source.Microphone };
  }
  const { track } = useTrack(ref);
  React78.useEffect(() => {
    if (!track || !(track instanceof LocalAudioTrack || track instanceof RemoteAudioTrack2)) {
      return;
    }
    const { analyser, cleanup } = createAudioAnalyser(track, {
      smoothingTimeConstant: 0.8,
      fftSize: 64
    });
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const calculateBars = () => {
      analyser.getByteFrequencyData(dataArray);
      const sums = new Array(barCount).fill(0);
      dataArray.slice(1);
      const binSize = 6;
      for (let i = 0; i < barCount / 2; i += 1) {
        const id = Math.floor(barCount / 2 - i);
        for (let k = 0; k < binSize; k += 1) {
          sums[id] += Math.pow(dataArray[i * binSize + k] / 255, 2);
        }
        sums[id] /= binSize;
      }
      for (let i = 0; i < barCount / 2; i += 1) {
        const id = Math.floor(barCount / 2 + i);
        if (sums[id] !== 0) {
          continue;
        }
        for (let k = 0; k < binSize; k += 1) {
          sums[id] += Math.pow(dataArray[i * binSize + k] / 255, 2);
        }
        sums[id] /= binSize;
      }
      return sums.map((s) => s * volMultiplier);
    };
    const calcInterval = setInterval(() => {
      const bars = calculateBars();
      setVolumeBars(bars);
    }, 100);
    return () => {
      clearInterval(calcInterval);
      cleanup();
    };
  }, [track]);
  return /* @__PURE__ */ React78.createElement(
    "svg",
    __spreadProps(__spreadValues({
      width: "100%",
      height: "100%",
      viewBox: `0 0 ${svgWidth} ${svgHeight}`
    }, props), {
      className: "lk-audio-visualizer"
    }),
    /* @__PURE__ */ React78.createElement("rect", { x: "0", y: "0", width: "100%", height: "100%" }),
    /* @__PURE__ */ React78.createElement(
      "g",
      {
        style: {
          transform: `translate(${(svgWidth - barCount * (barWidth + barSpacing)) / 2}px, 0)`
        }
      },
      volumeBars.map((vol, idx) => /* @__PURE__ */ React78.createElement(
        "rect",
        {
          key: idx,
          x: idx * (barWidth + barSpacing),
          y: svgHeight / 2 - vol / 2,
          width: barWidth,
          height: vol
        }
      ))
    )
  );
}

// src/components/ParticipantLoop.tsx
import * as React79 from "react";
function ParticipantLoop(_a) {
  var _b = _a, { participants } = _b, props = __objRest(_b, ["participants"]);
  return /* @__PURE__ */ React79.createElement(React79.Fragment, null, participants.map((participant) => /* @__PURE__ */ React79.createElement(ParticipantContext.Provider, { value: participant, key: participant.identity }, cloneSingleChild(props.children))));
}

// src/components/RoomAudioRenderer.tsx
import { getTrackReferenceId as getTrackReferenceId4, isLocal as isLocal2 } from "@livekit/components-core";
import { Track as Track7 } from "livekit-client";
import * as React80 from "react";
function RoomAudioRenderer({ volume, muted }) {
  const tracks = useTracks(
    [Track7.Source.Microphone, Track7.Source.ScreenShareAudio, Track7.Source.Unknown],
    {
      updateOnlyOn: [],
      onlySubscribed: false
    }
  ).filter((ref) => !isLocal2(ref.participant) && ref.publication.kind === Track7.Kind.Audio);
  React80.useEffect(() => {
    for (const track of tracks) {
      track.publication.setSubscribed(true);
    }
  }, [tracks]);
  return /* @__PURE__ */ React80.createElement("div", { style: { display: "none" } }, tracks.map((trackRef) => /* @__PURE__ */ React80.createElement(
    AudioTrack,
    {
      key: getTrackReferenceId4(trackRef),
      trackRef,
      volume,
      muted
    }
  )));
}

// src/components/Toast.tsx
import * as React81 from "react";
function Toast(props) {
  const htmlProps = React81.useMemo(() => mergeProps2(props, { className: "lk-toast" }), [props]);
  return /* @__PURE__ */ React81.createElement("div", __spreadValues({}, htmlProps), props.children);
}

// src/components/participant/ParticipantAudioTile.tsx
import * as React82 from "react";
import { Track as Track8 } from "livekit-client";
function ParticipantAudioTile(_a) {
  var _b = _a, {
    participant,
    children,
    source,
    publication,
    disableSpeakingIndicator,
    onParticipantClick
  } = _b, htmlProps = __objRest(_b, [
    "participant",
    "children",
    "source",
    "publication",
    "disableSpeakingIndicator",
    "onParticipantClick"
  ]);
  const p = useEnsureParticipant(participant);
  const { elementProps } = useParticipantTile({
    participant: p,
    htmlProps,
    disableSpeakingIndicator,
    source: Track8.Source.Microphone,
    publication,
    onParticipantClick
  });
  return /* @__PURE__ */ React82.createElement("div", __spreadValues({ style: { position: "relative" } }, elementProps), /* @__PURE__ */ React82.createElement(ParticipantContextIfNeeded, { participant: p }, children != null ? children : /* @__PURE__ */ React82.createElement(React82.Fragment, null, /* @__PURE__ */ React82.createElement(AudioTrack, { source: source != null ? source : Track8.Source.Microphone }), /* @__PURE__ */ React82.createElement(AudioVisualizer, null), /* @__PURE__ */ React82.createElement("div", { className: "lk-participant-metadata" }, /* @__PURE__ */ React82.createElement("div", { className: "lk-participant-metadata-item" }, /* @__PURE__ */ React82.createElement(TrackMutedIndicator, { source: Track8.Source.Microphone }), /* @__PURE__ */ React82.createElement(ParticipantName, null)), /* @__PURE__ */ React82.createElement(ConnectionQualityIndicator, { className: "lk-participant-metadata-item" })))));
}

// src/components/ConnectionStateToast.tsx
import { ConnectionState as ConnectionState2 } from "livekit-client";
import * as React83 from "react";
function ConnectionStateToast(props) {
  const [notification, setNotification] = React83.useState(void 0);
  const state = useConnectionState(props.room);
  React83.useEffect(() => {
    switch (state) {
      case ConnectionState2.Reconnecting:
        setNotification(
          /* @__PURE__ */ React83.createElement(React83.Fragment, null, /* @__PURE__ */ React83.createElement(SpinnerIcon_default, { className: "lk-spinner" }), " Reconnecting")
        );
        break;
      case ConnectionState2.Connecting:
        setNotification(
          /* @__PURE__ */ React83.createElement(React83.Fragment, null, /* @__PURE__ */ React83.createElement(SpinnerIcon_default, { className: "lk-spinner" }), " Connecting")
        );
        break;
      case ConnectionState2.Disconnected:
        setNotification(/* @__PURE__ */ React83.createElement(React83.Fragment, null, "Disconnected"));
        break;
      default:
        setNotification(void 0);
        break;
    }
  }, [state]);
  return notification ? /* @__PURE__ */ React83.createElement(Toast, { className: "lk-toast-connection-state" }, notification) : /* @__PURE__ */ React83.createElement(React83.Fragment, null);
}

// src/prefabs/ControlBar.tsx
import { Track as Track9 } from "livekit-client";
import * as React88 from "react";

// src/prefabs/HostEndMeetingMenu.tsx
import { computeMenuPosition as computeMenuPosition2, setupDisconnectButton as setupDisconnectButton2, wasClickOutside as wasClickOutside2 } from "@livekit/components-core";
import * as React84 from "react";
function HostEndMeetingMenu(_a) {
  var _b = _a, {
    leave,
    leaveButton,
    endForAll,
    showIcon,
    showText
  } = _b, props = __objRest(_b, [
    "leave",
    "leaveButton",
    "endForAll",
    "showIcon",
    "showText"
  ]);
  const [isOpen, setIsOpen] = React84.useState(false);
  const [updateRequired, setUpdateRequired] = React84.useState(true);
  const room = useRoomContext();
  const button = React84.useRef(null);
  const leaveButtonRef = React84.useRef(null);
  const tooltip = React84.useRef(null);
  const { disconnect } = setupDisconnectButton2(room);
  const [showDropdown, setShowDropdown] = React84.useState(false);
  const [value, setValue] = React84.useState("");
  const participants = useParticipants();
  const { localParticipant } = useLocalParticipant();
  const remoteParticipants = participants.filter((participant) => participant.identity !== localParticipant.identity);
  const meta = localParticipant.metadata ? JSON.parse(localParticipant.metadata) : {};
  React84.useLayoutEffect(() => {
    if (button.current && tooltip.current && updateRequired) {
      computeMenuPosition2(button.current, tooltip.current).then(({ x, y }) => {
        if (tooltip.current) {
          Object.assign(tooltip.current.style, { left: `${x}px`, top: `${y + 5}px` });
        }
      });
      setUpdateRequired(false);
    }
  }, [button, tooltip, updateRequired]);
  const handleClickOutside = React84.useCallback(
    (event) => {
      if (!tooltip.current) {
        return;
      }
      if (event.target === leaveButtonRef.current) {
        return;
      }
      if (event.target === button.current) {
        return;
      }
      if (isOpen && wasClickOutside2(tooltip.current, event)) {
        setIsOpen(false);
        setShowDropdown(false);
      }
    },
    [isOpen, tooltip, button]
  );
  React84.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", () => setUpdateRequired(true));
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", () => setUpdateRequired(true));
    };
  }, [handleClickOutside]);
  function endMeeting() {
    return __async(this, null, function* () {
      const postData = {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          room: room.name,
          token: meta.host
        })
      };
      fetch(`/api/end-meeting`, postData).then((res) => __async(this, null, function* () {
        if (res.ok) {
          localStorage.removeItem("host");
          localStorage.removeItem("limited");
          console.log("Meeting ended");
        } else {
          throw Error("Error fetching server url, check server logs");
        }
      }));
    });
  }
  function makeNewHost(identity) {
    return __async(this, null, function* () {
      const postData = {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          room: room.name,
          identity,
          token: meta.host
        })
      };
      yield fetch(`/api/make-host`, postData).then((res) => __async(this, null, function* () {
        if (res.ok) {
          console.log("Host leave and new host assigned");
          disconnect(true);
          setIsOpen(false);
          setShowDropdown(false);
        } else {
          throw Error("Error fetching server url, check server logs");
        }
      }));
    });
  }
  const [hostError, setHostError] = React84.useState(false);
  const handleChange = () => {
    if (value !== "") {
      setIsOpen(false);
      setValue(value);
      makeNewHost(value);
    } else {
      console.log("Must have to select participant");
      setHostError(true);
    }
  };
  React84.useEffect(() => {
    let timer;
    if (hostError) {
      timer = setTimeout(() => {
        setHostError(false);
      }, 5e3);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [hostError]);
  const handleLeave = () => {
    if (remoteParticipants.length) {
      console.log("Openning dropdown");
      setShowDropdown(true);
      setIsOpen(true);
    } else {
      console.log("No Participant present to leaving meeting");
      disconnect(true);
    }
  };
  const handleCancel = () => {
    setShowDropdown(false);
  };
  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };
  return /* @__PURE__ */ React84.createElement(React84.Fragment, null, /* @__PURE__ */ React84.createElement(
    "button",
    __spreadProps(__spreadValues({
      className: "lk-button lk-button-menu",
      "aria-pressed": isOpen
    }, props), {
      onClick: () => setIsOpen(!isOpen),
      ref: button
    }),
    props.children
  ), /* @__PURE__ */ React84.createElement(
    "div",
    {
      className: "lk-device-menu",
      ref: tooltip,
      style: { visibility: isOpen ? "visible" : "hidden" }
    },
    /* @__PURE__ */ React84.createElement("ul", { className: "lk-media-device-select lk-list", style: { display: !showDropdown ? "unset" : "none" } }, endForAll && /* @__PURE__ */ React84.createElement("li", null, /* @__PURE__ */ React84.createElement(DisconnectButton, { onClick: endMeeting }, endForAll)), leave && /* @__PURE__ */ React84.createElement("li", null, /* @__PURE__ */ React84.createElement("button", { ref: leaveButtonRef, className: "lk-disconnect-button", onClick: handleLeave }, "Leave Meeting"))),
    showDropdown && /* @__PURE__ */ React84.createElement("div", { className: "assign-menu" }, hostError && /* @__PURE__ */ React84.createElement("span", { className: "text-invalid" }, "Must have to select participant"), /* @__PURE__ */ React84.createElement("select", { value, onChange: handleChangeValue }, /* @__PURE__ */ React84.createElement("option", { value: "" }, "Select meeting host"), remoteParticipants.map((participant) => /* @__PURE__ */ React84.createElement("option", { value: participant.identity, key: participant.identity }, participant == null ? void 0 : participant.name))), /* @__PURE__ */ React84.createElement("div", { className: "button-container" }, /* @__PURE__ */ React84.createElement("button", { className: "lk-button tl-cancel", onClick: handleCancel }, "Cancel"), /* @__PURE__ */ React84.createElement("button", { className: "lk-button tl-ok", onClick: handleChange }, "Ok"))),
    /* @__PURE__ */ React84.createElement("div", { className: "arrow" }, /* @__PURE__ */ React84.createElement("div", { className: "arrow-shape" }))
  ));
}

// src/components/controls/UserToggle.tsx
import * as React85 from "react";
import { setupUserToggle } from "@livekit/components-core";
function useToggleUserLink({ props }) {
  const { dispatch, state } = useLayoutContext().widget;
  const { className } = React85.useMemo(() => setupUserToggle(), []);
  const mergedProps = React85.useMemo(
    () => mergeProps2(props, {
      className,
      onClick: () => {
        if (dispatch)
          dispatch({ msg: "show_users" });
      },
      "aria-pressed": (state == null ? void 0 : state.showChat) == "show_users" ? "true" : "false"
    }),
    [props, className, dispatch]
  );
  return { mergedProps };
}
function UserToggle(props) {
  const { mergedProps } = useToggleUserLink({ props });
  return /* @__PURE__ */ React85.createElement("button", __spreadValues({}, mergedProps), props.children);
}

// src/assets/icons/InviteIcon.tsx
import * as React86 from "react";
var SvgInviteIcon = (props) => /* @__PURE__ */ React86.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 25, height: 20, fill: "none" }, props), /* @__PURE__ */ React86.createElement(
  "path",
  {
    d: "M20.33 3.66996C20.1408 3.48213 19.9035 3.35008 19.6442 3.28833C19.3849 3.22659 19.1135 3.23753 18.86 3.31996L4.23 8.19996C3.95867 8.28593 3.71891 8.45039 3.54099 8.67255C3.36307 8.89471 3.25498 9.16462 3.23037 9.44818C3.20576 9.73174 3.26573 10.0162 3.40271 10.2657C3.5397 10.5152 3.74754 10.7185 4 10.85L10.07 13.85L13.07 19.94C13.1906 20.1783 13.3751 20.3785 13.6029 20.518C13.8307 20.6575 14.0929 20.7309 14.36 20.73H14.46C14.7461 20.7089 15.0192 20.6023 15.2439 20.4239C15.4686 20.2456 15.6345 20.0038 15.72 19.73L20.67 5.13996C20.7584 4.88789 20.7734 4.6159 20.7132 4.35565C20.653 4.09541 20.5201 3.85762 20.33 3.66996ZM4.85 9.57996L17.62 5.31996L10.53 12.41L4.85 9.57996ZM14.43 19.15L11.59 13.47L18.68 6.37996L14.43 19.15Z",
    fill: "#ffffff"
  }
));
var InviteIcon_default = SvgInviteIcon;

// src/assets/icons/UsersIcon.tsx
import * as React87 from "react";
var SvgUserIcon = (props) => /* @__PURE__ */ React87.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 20, height: 20, fill: "none" }, props), /* @__PURE__ */ React87.createElement(
  "path",
  {
    id: "Vector",
    d: "M17 20C17 18.3431 14.7614 17 12 17C9.23858 17 7 18.3431 7 20M21 17.0004C21 15.7702 19.7659 14.7129 18 14.25M3 17.0004C3 15.7702 4.2341 14.7129 6 14.25M18 10.2361C18.6137 9.68679 19 8.8885 19 8C19 6.34315 17.6569 5 16 5C15.2316 5 14.5308 5.28885 14 5.76389M6 10.2361C5.38625 9.68679 5 8.8885 5 8C5 6.34315 6.34315 5 8 5C8.76835 5 9.46924 5.28885 10 5.76389M12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z",
    stroke: "#ffffff",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "#ffffff"
  }
));
var UsersIcon_default = SvgUserIcon;

// src/prefabs/ControlBar.tsx
import { supportsScreenSharing } from "@livekit/components-core";
function ControlBar(_a) {
  var _b = _a, {
    variation,
    controls,
    waitingRoomCount,
    screenShareTracks
  } = _b, props = __objRest(_b, [
    "variation",
    "controls",
    "waitingRoomCount",
    "screenShareTracks"
  ]);
  var _a2, _b2, _c, _d, _e, _f, _g;
  const layoutContext = useMaybeLayoutContext();
  const [isChatOpen, setIsChatOpen] = React88.useState(false);
  const [isShareLinkOpen, setIsShareLinkOpen] = React88.useState(false);
  const [isUserOpen, setIsUserOpen] = React88.useState(false);
  const { state } = useLayoutContext().widget;
  React88.useEffect(() => {
    var _a3, _b3, _c2, _d2, _e2, _f2;
    if (((_a3 = layoutContext == null ? void 0 : layoutContext.widget.state) == null ? void 0 : _a3.showChat) == "show_chat") {
      setIsChatOpen(((_b3 = layoutContext == null ? void 0 : layoutContext.widget.state) == null ? void 0 : _b3.showChat) == "show_chat");
    } else if (((_c2 = layoutContext == null ? void 0 : layoutContext.widget.state) == null ? void 0 : _c2.showChat) == "show_invite") {
      setIsShareLinkOpen(((_d2 = layoutContext == null ? void 0 : layoutContext.widget.state) == null ? void 0 : _d2.showChat) == "show_invite");
    } else if (((_e2 = layoutContext == null ? void 0 : layoutContext.widget.state) == null ? void 0 : _e2.showChat) == "show_users") {
      setIsUserOpen(((_f2 = layoutContext == null ? void 0 : layoutContext.widget.state) == null ? void 0 : _f2.showChat) == "show_users");
    }
  }, [(_a2 = layoutContext == null ? void 0 : layoutContext.widget.state) == null ? void 0 : _a2.showChat]);
  const isTooLittleSpace = useMediaQuery(
    `(max-width: ${isChatOpen || isShareLinkOpen || isUserOpen ? 1e3 : 760}px)`
  );
  const defaultVariation = isTooLittleSpace ? "minimal" : "verbose";
  variation != null ? variation : variation = defaultVariation;
  const visibleControls = __spreadValues({ leave: true }, controls);
  const localPermissions = useLocalParticipantPermissions();
  if (!localPermissions) {
    visibleControls.camera = false;
    visibleControls.chat = false;
    visibleControls.microphone = false;
    visibleControls.screenShare = false;
    visibleControls.sharelink = false;
    visibleControls.users = false;
  } else {
    (_b2 = visibleControls.camera) != null ? _b2 : visibleControls.camera = localPermissions.canPublish;
    (_c = visibleControls.microphone) != null ? _c : visibleControls.microphone = localPermissions.canPublish;
    (_d = visibleControls.screenShare) != null ? _d : visibleControls.screenShare = localPermissions.canPublish;
    (_e = visibleControls.chat) != null ? _e : visibleControls.chat = localPermissions.canPublishData && (controls == null ? void 0 : controls.chat);
    (_f = visibleControls.sharelink) != null ? _f : visibleControls.sharelink = localPermissions.canPublishData && (controls == null ? void 0 : controls.sharelink);
    (_g = visibleControls.users) != null ? _g : visibleControls.users = localPermissions.canPublishData && (controls == null ? void 0 : controls.users);
  }
  const showIcon = React88.useMemo(
    () => variation === "minimal" || variation === "verbose",
    [variation]
  );
  const showText = React88.useMemo(
    () => variation === "textOnly" || variation === "verbose",
    [variation]
  );
  const browserSupportsScreenSharing = supportsScreenSharing();
  const [isScreenShareEnabled, setIsScreenShareEnabled] = React88.useState(false);
  const onScreenShareChange = (enabled) => {
    setIsScreenShareEnabled(enabled);
  };
  const htmlProps = mergeProps2({ className: "lk-control-bar" }, props);
  React88.useEffect(() => {
    const buttons = document.querySelectorAll("[data-lk-source]");
    if (!isScreenShareEnabled && screenShareTracks !== 0) {
      buttons.forEach((button) => {
        const source = button.getAttribute("data-lk-source");
        if (source === "screen_share") {
          button.disabled = true;
        }
      });
    } else {
      buttons.forEach((button) => {
        const source = button.getAttribute("data-lk-source");
        if (source === "screen_share") {
          button.disabled = false;
        }
      });
    }
  }, [screenShareTracks, isScreenShareEnabled]);
  return /* @__PURE__ */ React88.createElement("div", __spreadValues({}, htmlProps), visibleControls.microphone && /* @__PURE__ */ React88.createElement("div", { className: "lk-button-group" }, /* @__PURE__ */ React88.createElement(TrackToggle, { source: Track9.Source.Microphone, showIcon }, showText && "Microphone"), /* @__PURE__ */ React88.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ React88.createElement(MediaDeviceMenu, { kind: "audioinput" }))), visibleControls.camera && /* @__PURE__ */ React88.createElement("div", { className: "lk-button-group" }, /* @__PURE__ */ React88.createElement(TrackToggle, { source: Track9.Source.Camera, showIcon }, showText && "Camera"), /* @__PURE__ */ React88.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ React88.createElement(MediaDeviceMenu, { kind: "videoinput" }))), visibleControls.screenShare && browserSupportsScreenSharing && /* @__PURE__ */ React88.createElement(
    TrackToggle,
    {
      source: Track9.Source.ScreenShare,
      captureOptions: { audio: true, selfBrowserSurface: "include" },
      showIcon,
      onChange: onScreenShareChange,
      disabled: !isScreenShareEnabled && screenShareTracks !== 0,
      title: !isScreenShareEnabled && screenShareTracks !== 0 ? "Someone has shared screen" : isScreenShareEnabled ? "You're sharing your scrren" : "You can share your screen"
    },
    showText && (isScreenShareEnabled ? "Stop screen share" : "Share screen")
  ), visibleControls.chat && /* @__PURE__ */ React88.createElement(ChatToggle, null, showIcon && /* @__PURE__ */ React88.createElement(ChatIcon_default, null), showText && "Chat", state && state.unreadMessages !== 0 && /* @__PURE__ */ React88.createElement("span", { className: "waiting-count" }, state.unreadMessages < 10 ? state.unreadMessages.toFixed(0) : "9+")), visibleControls.sharelink && /* @__PURE__ */ React88.createElement(ShareLinkToggle, null, showIcon && /* @__PURE__ */ React88.createElement(InviteIcon_default, null), showText && "Invite"), visibleControls.users && /* @__PURE__ */ React88.createElement(UserToggle, null, showIcon && /* @__PURE__ */ React88.createElement(UsersIcon_default, null), showText && "Participants", waitingRoomCount !== 0 && /* @__PURE__ */ React88.createElement("span", { className: "waiting-count" }, waitingRoomCount)), visibleControls.endForAll ? /* @__PURE__ */ React88.createElement("div", { className: "tl-leave lk-button-group" }, /* @__PURE__ */ React88.createElement("button", { className: "lk-disconnect-button" }, showIcon && /* @__PURE__ */ React88.createElement(LeaveIcon_default, null), showText && "Leave"), /* @__PURE__ */ React88.createElement("div", { className: "tl-leave-btn lk-button-group-menu" }, /* @__PURE__ */ React88.createElement(
    HostEndMeetingMenu,
    {
      leave: visibleControls.leave,
      leaveButton: visibleControls.leaveButton,
      endForAll: visibleControls.endForAll,
      showIcon,
      showText
    }
  ))) : /* @__PURE__ */ React88.createElement(DisconnectButton, null, showIcon && /* @__PURE__ */ React88.createElement(LeaveIcon_default, null), showText && visibleControls.leaveButton), /* @__PURE__ */ React88.createElement(StartAudio, { label: "Start Audio" }));
}

// src/prefabs/Users.tsx
import * as React93 from "react";

// src/components/participant/ParticipantList.tsx
import * as React89 from "react";
import { Track as Track10 } from "livekit-client";
var ParticipantList = (_a) => {
  var _b = _a, {
    participant,
    children,
    publication,
    disableSpeakingIndicator,
    onParticipantClick
  } = _b, htmlProps = __objRest(_b, [
    "participant",
    "children",
    "publication",
    "disableSpeakingIndicator",
    "onParticipantClick"
  ]);
  const p = useEnsureParticipant(participant);
  const { elementProps } = useParticipantTile({
    participant: p,
    htmlProps,
    disableSpeakingIndicator,
    source: Track10.Source.Microphone,
    publication,
    onParticipantClick
  });
  return /* @__PURE__ */ React89.createElement("div", __spreadValues({ style: { position: "relative" } }, elementProps), /* @__PURE__ */ React89.createElement(ParticipantContextIfNeeded, { participant: p }, children != null ? children : /* @__PURE__ */ React89.createElement(React89.Fragment, null, /* @__PURE__ */ React89.createElement("div", { className: "lk-participant-metadata" }, /* @__PURE__ */ React89.createElement("div", { className: "lk-participant-metadata-item" }, /* @__PURE__ */ React89.createElement(ParticipantName, null)), /* @__PURE__ */ React89.createElement("div", { className: "display-flex" }, /* @__PURE__ */ React89.createElement(
    TrackMutedIndicator,
    {
      source: Track10.Source.Microphone,
      show: "always"
    }
  ), /* @__PURE__ */ React89.createElement(
    TrackMutedIndicator,
    {
      source: Track10.Source.Camera,
      show: "always"
    }
  ))))));
};

// src/components/ToggleSwitch.tsx
import React90 from "react";
var ToggleSwitch = ({
  id,
  name,
  checked,
  onChange,
  optionLabels,
  small,
  disabled
}) => {
  function handleKeyPress(e) {
    if (e.keyCode !== 32)
      return;
    e.preventDefault();
    onChange(!checked);
  }
  return /* @__PURE__ */ React90.createElement("div", { className: "toggle-switch" + (small ? " small-switch" : "") }, /* @__PURE__ */ React90.createElement(
    "input",
    {
      type: "checkbox",
      name,
      className: "toggle-switch-checkbox",
      id,
      checked,
      onChange: (e) => onChange(e.target.checked),
      disabled
    }
  ), id ? /* @__PURE__ */ React90.createElement(
    "label",
    {
      className: "toggle-switch-label",
      tabIndex: disabled ? -1 : 1,
      onKeyDown: (e) => handleKeyPress(e),
      htmlFor: id
    },
    /* @__PURE__ */ React90.createElement(
      "span",
      {
        className: disabled ? "toggle-switch-inner toggle-switch-disabled" : "toggle-switch-inner",
        "data-yes": optionLabels[0],
        "data-no": optionLabels[1],
        tabIndex: -1
      }
    ),
    /* @__PURE__ */ React90.createElement(
      "span",
      {
        className: disabled ? "toggle-switch-switch toggle-switch-disabled" : "toggle-switch-switch",
        tabIndex: -1
      }
    )
  ) : null);
};

// src/assets/icons/ApproveIcon.tsx
import * as React91 from "react";
var SvgApproveIcon = (props) => /* @__PURE__ */ React91.createElement(
  "svg",
  __spreadValues({
    width: "15",
    height: "11",
    viewBox: "0 0 17 13",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props),
  /* @__PURE__ */ React91.createElement(
    "path",
    {
      d: "M6.44587 12.3181C6.35059 12.3854 6.21756 12.3816 6.13768 12.2966C5.87427 12.0164 5.62193 11.7435 5.3696 11.4706C3.87981 9.87788 2.38394 8.27905 0.900223 6.68022C0.225256 5.95072 0.316468 4.8747 1.09481 4.30933C1.73937 3.83516 2.60284 3.91419 3.18052 4.52211C4.17777 5.57381 5.16286 6.63767 6.14794 7.69545C6.18071 7.73039 6.21348 7.76612 6.24709 7.80263C6.35423 7.919 6.5347 7.92887 6.64657 7.81703V7.81703C8.25798 6.30939 9.86939 4.80175 11.4869 3.30019C12.399 2.4491 13.305 1.60409 14.2232 0.765159C15.1293 -0.0676915 16.5461 0.357852 16.8258 1.54938C16.9717 2.1573 16.7832 2.68011 16.3211 3.11173C15.0928 4.25462 13.8705 5.39751 12.6483 6.5404C11.4565 7.65289 10.2646 8.76539 9.0728 9.87788C8.20696 10.689 7.33509 11.4881 6.4692 12.2991C6.46178 12.3061 6.45416 12.3123 6.44587 12.3181V12.3181Z",
      fill: "white"
    }
  )
);
var ApproveIcon_default = SvgApproveIcon;

// src/assets/icons/RejectIcon.tsx
import * as React92 from "react";
var SvgRejectIcon = (props) => /* @__PURE__ */ React92.createElement(
  "svg",
  __spreadValues({
    width: "15",
    height: "11",
    viewBox: "0 0 13 13",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props),
  /* @__PURE__ */ React92.createElement(
    "path",
    {
      d: "M6.70508 8.22715C6.03352 8.9047 5.39471 9.54143 4.74772 10.1863C4.16624 10.7659 3.59295 11.3455 3.01147 11.9169C2.61836 12.3006 2.15154 12.4231 1.62739 12.2271C1.136 12.0475 0.849362 11.672 0.775653 11.1578C0.710135 10.7006 0.8985 10.3251 1.2179 10.0067C2.33991 8.88837 3.46191 7.77001 4.58392 6.65165C4.66582 6.57001 4.76409 6.51287 4.87875 6.43124C4.7559 6.30063 4.6822 6.21899 4.60849 6.14553C3.47829 5.01084 2.33991 3.88431 1.20971 2.74962C0.677375 2.21085 0.620047 1.49248 1.0623 0.953708C1.57826 0.325139 2.43819 0.292486 3.05242 0.896565C4.18262 2.01493 5.31281 3.14146 6.43482 4.27614C6.51672 4.35778 6.57404 4.45574 6.66413 4.57002C6.78698 4.45574 6.86888 4.38227 6.94259 4.3088C8.08097 3.17411 9.21117 2.03942 10.3496 0.912892C10.931 0.333302 11.7336 0.325139 12.2578 0.863913C12.7655 1.3782 12.7655 2.16187 12.2414 2.7088C11.6845 3.28839 11.103 3.85166 10.5297 4.42308C9.88273 5.06798 9.22755 5.72104 8.55598 6.39042C8.64607 6.48838 8.71978 6.56185 8.79349 6.64348C9.92368 7.77001 11.0457 8.89654 12.1759 10.0231C12.5199 10.3659 12.7082 10.7659 12.6099 11.2639C12.5117 11.7537 12.2168 12.0884 11.75 12.2516C11.2668 12.4231 10.8164 12.3169 10.4396 11.9741C10.0711 11.6312 9.72713 11.272 9.37496 10.921C8.49046 10.0231 7.61415 9.14143 6.70508 8.22715Z",
      fill: "white"
    }
  )
);
var RejectIcon_default = SvgRejectIcon;

// src/prefabs/Users.tsx
function Users(_a) {
  var _b = _a, { onWaitingRoomChange } = _b, props = __objRest(_b, ["onWaitingRoomChange"]);
  const ulRef = React93.useRef(null);
  const participants = useParticipants();
  const [waitingRoom, setWaitingRoom] = React93.useState([]);
  const [toggleWaiting, setToggleWaiting] = React93.useState(true);
  const room = useRoomContext();
  function getWaitingRoomState() {
    return __async(this, null, function* () {
      const postData = {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          meeting_id: room.name
        })
      };
      fetch(`/api/get-waitingroom-state`, postData).then((res) => __async(this, null, function* () {
        if (res.ok) {
          const body = yield res.json();
          setToggleWaiting(body.waiting_room);
        } else {
          throw Error("Error fetching server url, check server logs");
        }
      }));
    });
  }
  function usersList() {
    return __async(this, null, function* () {
      const postData = {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          meeting_id: room.name
        })
      };
      fetch(`/api/get-waiting-room-users`, postData).then((res) => __async(this, null, function* () {
        if (res.ok) {
          const body = yield res.json();
          setWaitingRoom(body.users);
        } else {
          throw Error("Error fetching server url, check server logs");
        }
      }));
    });
  }
  React93.useEffect(() => {
    if (room.name) {
      usersList();
    }
  }, [room.name]);
  React93.useEffect(() => {
    const interval = setInterval(() => {
      usersList();
    }, 2e3);
    return () => clearInterval(interval);
  }, []);
  React93.useEffect(() => {
    getWaitingRoomState();
  }, []);
  React93.useEffect(() => {
    onWaitingRoomChange(waitingRoom.length);
  }, [onWaitingRoomChange, waitingRoom]);
  React93.useEffect(() => {
    var _a2;
    if (ulRef) {
      (_a2 = ulRef.current) == null ? void 0 : _a2.scrollTo({ top: ulRef.current.scrollHeight });
    }
  }, [ulRef]);
  function admitUser(identity, type) {
    return __async(this, null, function* () {
      const postData = {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ room: room.name, identity, type })
      };
      fetch(`/api/accept-request`, postData).then((res) => __async(this, null, function* () {
        if (res.status) {
          const remaining = waitingRoom.filter(
            (item) => item.identity !== identity
          );
          setWaitingRoom(remaining);
        } else {
          throw Error("Error fetching server url, check server logs");
        }
      }));
    });
  }
  function approveAll() {
    return __async(this, null, function* () {
      const postData = {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ meeting_id: room.name })
      };
      fetch(`/api/approve-all-participant`, postData).then((res) => __async(this, null, function* () {
        if (res.status) {
          setWaitingRoom([]);
        } else {
          throw Error("Error fetching server url, check server logs");
        }
      }));
    });
  }
  const onToggleWaitingChange = (checked) => {
    const postData = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ room: room.name, waiting_room: checked })
    };
    fetch(`/api/set-waitingroom`, postData).then((res) => __async(this, null, function* () {
      if (res.status) {
        setToggleWaiting(checked);
      } else {
        throw Error("Error fetching server url, check server logs");
      }
    }));
  };
  return /* @__PURE__ */ React93.createElement("div", __spreadProps(__spreadValues({}, props), { className: "lk-chat lk-users" }), /* @__PURE__ */ React93.createElement("div", { className: "lk-waitinroom" }, /* @__PURE__ */ React93.createElement("div", { className: "tl-waitingroom-heading" }, /* @__PURE__ */ React93.createElement("h3", null, "Waiting Room"), /* @__PURE__ */ React93.createElement("div", { className: "tl-toggle-switch" }, /* @__PURE__ */ React93.createElement(
    ToggleSwitch,
    {
      id: "toggleSwitch",
      checked: toggleWaiting,
      onChange: onToggleWaitingChange,
      name: "toggleSwitch",
      optionLabels: ["On", "Off"],
      small: false,
      disabled: false
    }
  )), toggleWaiting && waitingRoom.length ? /* @__PURE__ */ React93.createElement(
    "button",
    {
      className: "lk-button tl-info tl-approve",
      onClick: () => approveAll()
    },
    "Approve All"
  ) : ""), waitingRoom.map((item) => /* @__PURE__ */ React93.createElement("div", { className: "tl-participant-li", key: item.username }, /* @__PURE__ */ React93.createElement("div", { className: "lk-participant-metadata" }, /* @__PURE__ */ React93.createElement("div", { className: "lk-participant-metadata-item" }, item.username), /* @__PURE__ */ React93.createElement("div", { className: "display-flex" }, /* @__PURE__ */ React93.createElement(
    "button",
    {
      className: "lk-button lk-waiting-room lk-success",
      onClick: () => admitUser(item.identity, "accepted")
    },
    /* @__PURE__ */ React93.createElement(ApproveIcon_default, null)
  ), /* @__PURE__ */ React93.createElement(
    "button",
    {
      className: "lk-button lk-waiting-room lk-danger",
      onClick: () => admitUser(item.identity, "rejected")
    },
    /* @__PURE__ */ React93.createElement(RejectIcon_default, null)
  )))))), /* @__PURE__ */ React93.createElement("div", { className: "lk-participants" }, /* @__PURE__ */ React93.createElement("div", { className: "tl-participants-heading" }, /* @__PURE__ */ React93.createElement("h3", null, "Participants  ", /* @__PURE__ */ React93.createElement("span", null, "(", participants.length, ")"))), (participants == null ? void 0 : participants.length) ? /* @__PURE__ */ React93.createElement(ParticipantLoop, { participants }, /* @__PURE__ */ React93.createElement(ParticipantList, null)) : /* @__PURE__ */ React93.createElement("div", null, /* @__PURE__ */ React93.createElement("h5", null, "No Participants"))));
}

// src/prefabs/ShareLink.tsx
import * as React94 from "react";
import { setupParticipantName as setupParticipantName2 } from "@livekit/components-core";
function useGetLink() {
  const host = getHostUrl();
  const link = `${host}/join/${useGetRoom().name}`;
  return { link };
}
function useGetRoom() {
  const room = useRoomContext();
  return room;
}
function getHostUrl() {
  return typeof window ? window.location.origin : "";
}
function ShareLink(_a) {
  var props = __objRest(_a, []);
  const inputRef = React94.useRef(null);
  const ulRef = React94.useRef(null);
  const { link } = useGetLink();
  const [users, setUsers] = React94.useState([]);
  const [searched, setSearched] = React94.useState([]);
  const [showToast, setShowToast] = React94.useState(false);
  const room = useGetRoom();
  function searchUsers(key) {
    return __async(this, null, function* () {
      if (key) {
        const filteredData = users.filter(function(item) {
          return item.user_name.toLocaleLowerCase().startsWith(key.toLocaleLowerCase());
        });
        setSearched(filteredData);
      } else {
        setSearched(users);
      }
    });
  }
  function getUsers() {
    return __async(this, null, function* () {
      const data = {
        method: "POST",
        // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          meeting_id: room.name
        })
      };
      fetch(`${getHostUrl()}/api/get-users`, data).then((res) => __async(this, null, function* () {
        if (res.ok) {
          const body = yield res.json();
          setUsers(body);
          setSearched(body);
        } else {
          throw Error("Error fetching server url, check server logs");
        }
      }));
    });
  }
  React94.useEffect(() => {
    if (room.name) {
      getUsers();
    }
  }, [room.name]);
  function handleSubmit(event) {
    return __async(this, null, function* () {
      event.preventDefault();
      if (inputRef.current && inputRef.current.value.trim() !== "") {
        searchUsers(inputRef.current.value);
      } else {
        setSearched(users);
      }
    });
  }
  function handleInvite(user) {
    return __async(this, null, function* () {
      const data = {
        method: "POST",
        // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "users": JSON.stringify([user]),
          // body data type must match "Content-Type" header
          "message": link,
          "meeting_id": room.name
        })
      };
      fetch(`/api/invite-user`, data).then((res) => __async(this, null, function* () {
        if (res.ok) {
          user.invited = true;
          const currentUserIndex = users.findIndex((item) => item.user_id === user.user_id);
          const updatedUser = __spreadProps(__spreadValues({}, users[currentUserIndex]), { invited: true });
          const newUsers = [
            ...users.slice(0, currentUserIndex),
            updatedUser,
            ...users.slice(currentUserIndex + 1)
          ];
          setUsers(newUsers);
          const currentSearchedIndex = searched.findIndex((item) => item.user_id === user.user_id);
          const updatedSearched = __spreadProps(__spreadValues({}, searched[currentSearchedIndex]), { invited: true });
          const newSearched = [
            ...searched.slice(0, currentSearchedIndex),
            updatedSearched,
            ...searched.slice(currentSearchedIndex + 1)
          ];
          setSearched(newSearched);
        } else {
          throw Error("Error fetching server url, check server logs");
        }
      }));
    });
  }
  const { localParticipant } = useLocalParticipant();
  const p = useEnsureParticipant(localParticipant);
  const { infoObserver } = React94.useMemo(() => {
    return setupParticipantName2(p);
  }, [p]);
  const { metadata } = useObservableState(infoObserver, {
    name: p.name,
    identity: p.identity,
    metadata: p.metadata
  });
  const meta = metadata ? JSON.parse(metadata) : {};
  const [showInviteUser, setShowInviteUser] = React94.useState(true);
  React94.useEffect(() => {
    if (meta && meta.host && meta.limited) {
      setShowInviteUser(false);
    }
  }, [meta]);
  React94.useEffect(() => {
    const pmeta = p.metadata ? JSON.parse(p.metadata) : {};
    if (pmeta && pmeta.host && meta.limited) {
      setShowInviteUser(false);
    }
  }, [p]);
  function handleCopy() {
    return __async(this, null, function* () {
      navigator.clipboard.writeText(link);
      setShowToast(true);
    });
  }
  React94.useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 3e3);
    }
  }, [showToast]);
  React94.useEffect(() => {
    var _a2;
    if (ulRef) {
      (_a2 = ulRef.current) == null ? void 0 : _a2.scrollTo({ top: ulRef.current.scrollHeight });
    }
  }, [ulRef, users]);
  return /* @__PURE__ */ React94.createElement("div", __spreadProps(__spreadValues({}, props), { className: "lk-chat lk-sharelink" }), /* @__PURE__ */ React94.createElement("form", { className: "lk-chat-form" }, /* @__PURE__ */ React94.createElement("input", { className: "lk-form-control lk-chat-form-input", type: "text", value: link, readOnly: true }), /* @__PURE__ */ React94.createElement("button", { type: "button", className: "lk-button lk-chat-form-button", onClick: handleCopy }, "Copy")), showToast ? /* @__PURE__ */ React94.createElement(Toast, { className: "lk-toast-connection-state" }, "Copied") : /* @__PURE__ */ React94.createElement(React94.Fragment, null), showInviteUser ? /* @__PURE__ */ React94.createElement("form", { className: "lk-chat-form", onSubmit: handleSubmit }, /* @__PURE__ */ React94.createElement(
    "input",
    {
      className: "lk-form-control lk-chat-form-input",
      ref: inputRef,
      type: "text",
      placeholder: "Search User...",
      onChange: handleSubmit
    }
  )) : /* @__PURE__ */ React94.createElement(React94.Fragment, null), showInviteUser && searched.length > 0 ? /* @__PURE__ */ React94.createElement("ul", { className: "lk-list lk-chat-messages", ref: ulRef }, searched.map((user, index) => {
    return /* @__PURE__ */ React94.createElement("li", { key: index, className: "lk-chat-entry" }, /* @__PURE__ */ React94.createElement("div", null, /* @__PURE__ */ React94.createElement("span", { className: "lk-message-body" }, user.full_name, " ", user.ext_no ? ` - ${user.ext_no}` : ""), /* @__PURE__ */ React94.createElement("span", { className: "lk-message-body lk-message-text" }, user.designation)), /* @__PURE__ */ React94.createElement("button", { type: "button", onClick: () => handleInvite(user), className: "lk-button lk-chat-form-button" + (user.invited ? " invited" : "") }, user.invited ? "Invited" : "Invite"));
  })) : "");
}

// src/prefabs/VideoConference.tsx
function VideoConference(_a) {
  var _b = _a, {
    chatMessageFormatter,
    chatMessageDecoder,
    chatMessageEncoder
  } = _b, props = __objRest(_b, [
    "chatMessageFormatter",
    "chatMessageDecoder",
    "chatMessageEncoder"
  ]);
  var _a2, _b2;
  const [widgetState, setWidgetState] = React95.useState({
    showChat: null,
    unreadMessages: 0
  });
  const lastAutoFocusedScreenShareTrack = React95.useRef(null);
  const { localParticipant } = useLocalParticipant();
  const p = useEnsureParticipant(localParticipant);
  const { infoObserver } = React95.useMemo(() => {
    return setupParticipantName3(p);
  }, [p]);
  const { metadata } = useObservableState(infoObserver, {
    name: p.name,
    identity: p.identity,
    metadata: p.metadata
  });
  const [showShareButton, setShowShareButton] = React95.useState(false);
  const [showParticipantButton, setShowParticipantButton] = React95.useState(false);
  const [leaveButton, setLeaveButton] = React95.useState("Leave");
  const [endForAll, setEndForAll] = React95.useState(false);
  const meta = metadata ? JSON.parse(metadata) : {};
  const [waitingRoomCount, setWaitingRoomCount] = React95.useState(0);
  const tracks = useTracks(
    [
      { source: Track11.Source.Camera, withPlaceholder: true },
      { source: Track11.Source.ScreenShare, withPlaceholder: false }
    ],
    { updateOnlyOn: [RoomEvent.ActiveSpeakersChanged], onlySubscribed: false }
  );
  const widgetUpdate = (state) => {
    log10.debug("updating widget state", state);
    setWidgetState(state);
  };
  const updateCount = (count) => {
    log10.debug("count ", count);
    setWaitingRoomCount(count);
  };
  const layoutContext = useCreateLayoutContext();
  const screenShareTracks = tracks.filter(isTrackReference4).filter((track) => track.publication.source === Track11.Source.ScreenShare);
  const focusTrack = (_a2 = usePinnedTracks(layoutContext)) == null ? void 0 : _a2[0];
  const carouselTracks = tracks.filter((track) => !isEqualTrackRef(track, focusTrack));
  React95.useEffect(() => {
    if (meta && meta.host) {
      localStorage.setItem("host", meta.host);
      if (meta.limited) {
        localStorage.setItem("limited", meta.limited);
      }
      setShowShareButton(true);
      setShowParticipantButton(true);
      setLeaveButton("Leave Meeting");
      setEndForAll("End Meeting for All");
    }
  }, [meta]);
  React95.useEffect(() => {
    const pmeta = p.metadata ? JSON.parse(p.metadata) : {};
    if (pmeta && pmeta.host) {
      localStorage.setItem("host", meta.host);
      if (meta.limited) {
        localStorage.setItem("limited", meta.limited);
      }
      setShowShareButton(true);
      setShowParticipantButton(true);
      setLeaveButton("Leave Meeting");
      setEndForAll("End Meeting for All");
    }
  }, [p]);
  React95.useEffect(() => {
    var _a3, _b3, _c, _d;
    if (screenShareTracks.some((track) => track.publication.isSubscribed) && lastAutoFocusedScreenShareTrack.current === null) {
      log10.debug("Auto set screen share focus:", { newScreenShareTrack: screenShareTracks[0] });
      (_b3 = (_a3 = layoutContext.pin).dispatch) == null ? void 0 : _b3.call(_a3, { msg: "set_pin", trackReference: screenShareTracks[0] });
      lastAutoFocusedScreenShareTrack.current = screenShareTracks[0];
    } else if (lastAutoFocusedScreenShareTrack.current && !screenShareTracks.some(
      (track) => {
        var _a4, _b4;
        return track.publication.trackSid === ((_b4 = (_a4 = lastAutoFocusedScreenShareTrack.current) == null ? void 0 : _a4.publication) == null ? void 0 : _b4.trackSid);
      }
    )) {
      log10.debug("Auto clearing screen share focus.");
      (_d = (_c = layoutContext.pin).dispatch) == null ? void 0 : _d.call(_c, { msg: "clear_pin" });
      lastAutoFocusedScreenShareTrack.current = null;
    }
  }, [
    screenShareTracks.map((ref) => `${ref.publication.trackSid}_${ref.publication.isSubscribed}`).join(),
    (_b2 = focusTrack == null ? void 0 : focusTrack.publication) == null ? void 0 : _b2.trackSid
  ]);
  return /* @__PURE__ */ React95.createElement("div", __spreadValues({ className: "lk-video-conference" }, props), isWeb() && /* @__PURE__ */ React95.createElement(
    LayoutContextProvider,
    {
      value: layoutContext,
      onWidgetChange: widgetUpdate
    },
    /* @__PURE__ */ React95.createElement("div", { className: "lk-video-conference-inner" }, !focusTrack ? /* @__PURE__ */ React95.createElement("div", { className: "lk-grid-layout-wrapper" }, /* @__PURE__ */ React95.createElement(GridLayout, { tracks }, /* @__PURE__ */ React95.createElement(ParticipantTile, null))) : /* @__PURE__ */ React95.createElement("div", { className: "lk-focus-layout-wrapper" }, /* @__PURE__ */ React95.createElement(FocusLayoutContainer, null, /* @__PURE__ */ React95.createElement(CarouselLayout, { tracks: carouselTracks }, /* @__PURE__ */ React95.createElement(ParticipantTile, null)), focusTrack && /* @__PURE__ */ React95.createElement(FocusLayout, { trackRef: focusTrack }))), /* @__PURE__ */ React95.createElement(
      ControlBar,
      {
        controls: {
          chat: true,
          sharelink: showShareButton,
          users: showParticipantButton,
          leaveButton,
          endForAll
        },
        waitingRoomCount,
        screenShareTracks: screenShareTracks.length
      }
    )),
    showShareButton ? /* @__PURE__ */ React95.createElement(ShareLink, { style: {
      display: widgetState.showChat == "show_invite" ? "flex" : "none"
    } }) : /* @__PURE__ */ React95.createElement(React95.Fragment, null),
    showParticipantButton ? /* @__PURE__ */ React95.createElement(
      Users,
      {
        style: { display: widgetState.showChat == "show_users" ? "flex" : "none" },
        onWaitingRoomChange: updateCount
      }
    ) : /* @__PURE__ */ React95.createElement(React95.Fragment, null),
    /* @__PURE__ */ React95.createElement(
      Chat,
      {
        style: { display: widgetState.showChat == "show_chat" ? "flex" : "none" },
        messageFormatter: chatMessageFormatter,
        messageEncoder: chatMessageEncoder,
        messageDecoder: chatMessageDecoder
      }
    )
  ), /* @__PURE__ */ React95.createElement(RoomAudioRenderer, null), /* @__PURE__ */ React95.createElement(ConnectionStateToast, null));
}

// src/prefabs/AudioConference.tsx
import * as React96 from "react";
function AudioConference(_a) {
  var props = __objRest(_a, []);
  const [widgetState, setWidgetState] = React96.useState({
    showChat: null,
    unreadMessages: 0
  });
  const participants = useParticipants();
  return /* @__PURE__ */ React96.createElement(LayoutContextProvider, { onWidgetChange: setWidgetState }, /* @__PURE__ */ React96.createElement("div", __spreadValues({ className: "lk-audio-conference" }, props), /* @__PURE__ */ React96.createElement("div", { className: "lk-audio-conference-stage" }, /* @__PURE__ */ React96.createElement(ParticipantLoop, { participants }, /* @__PURE__ */ React96.createElement(ParticipantAudioTile, null))), /* @__PURE__ */ React96.createElement(
    ControlBar,
    {
      controls: { microphone: true, screenShare: false, camera: false, chat: true },
      waitingRoomCount: 0
    }
  ), widgetState.showChat == "show_chat" && /* @__PURE__ */ React96.createElement(Chat, null)));
}
export {
  AudioConference,
  Chat,
  ControlBar,
  MediaDeviceMenu,
  PreJoin,
  VideoConference,
  usePreviewDevice,
  usePreviewTracks
};
//# sourceMappingURL=index.mjs.map