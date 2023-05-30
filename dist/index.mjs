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

// src/components/controls/ClearPinButton.tsx
import { setupClearPinButton } from "@livekit/components-core";
import * as React6 from "react";

// src/utils.ts
import * as React from "react";

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
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child) && React.Children.only(children)) {
      return React.cloneElement(child, __spreadProps(__spreadValues({}, props), { key }));
    }
    return child;
  });
}

// src/context/chat-context.ts
function chatReducer(state, action) {
  if (action.msg && action.msg !== state.showChat) {
    if (action.msg === "show_chat") {
      return __spreadProps(__spreadValues({}, state), { showChat: "show_chat" });
    } else if (action.msg === "show_invite") {
      return __spreadProps(__spreadValues({}, state), { showChat: "show_invite" });
    } else if (action.msg === "show_users") {
      return __spreadProps(__spreadValues({}, state), { showChat: "show_users" });
    } else {
      return __spreadProps(__spreadValues({}, state), { showChat: null });
    }
  } else {
    return __spreadProps(__spreadValues({}, state), { showChat: null });
  }
}

// src/context/layout-context.ts
import { PIN_DEFAULT_STATE, WIDGET_DEFAULT_STATE } from "@livekit/components-core";
import * as React2 from "react";

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
var LayoutContext = React2.createContext(void 0);
function useLayoutContext() {
  const layoutContext = React2.useContext(LayoutContext);
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
  const [pinState, pinDispatch] = React2.useReducer(pinReducer, PIN_DEFAULT_STATE);
  const [widgetState, widgetDispatch] = React2.useReducer(chatReducer, WIDGET_DEFAULT_STATE);
  return {
    pin: { dispatch: pinDispatch, state: pinState },
    widget: { dispatch: widgetDispatch, state: widgetState }
  };
}
function useEnsureCreateLayoutContext(layoutContext) {
  const [pinState, pinDispatch] = React2.useReducer(pinReducer, PIN_DEFAULT_STATE);
  const [widgetState, widgetDispatch] = React2.useReducer(chatReducer, WIDGET_DEFAULT_STATE);
  return layoutContext != null ? layoutContext : {
    pin: { dispatch: pinDispatch, state: pinState },
    widget: { dispatch: widgetDispatch, state: widgetState }
  };
}
function useMaybeLayoutContext() {
  return React2.useContext(LayoutContext);
}

// src/context/participant-context.ts
import * as React4 from "react";

// src/context/track-context.ts
import * as React3 from "react";
var TrackContext = React3.createContext(void 0);
function useTrackContext() {
  const trackReference = React3.useContext(TrackContext);
  if (!trackReference) {
    throw Error("tried to access track context outside of track context provider");
  }
  return trackReference;
}
function useMaybeTrackContext() {
  return React3.useContext(TrackContext);
}
function useEnsureTrackReference(track) {
  const context = useMaybeTrackContext();
  const trackRef = track != null ? track : context;
  if (!trackRef) {
    throw new Error(
      "No TrackReference provided, make sure you are inside a track context or pass the track reference explicitly"
    );
  }
  return trackRef;
}

// src/context/participant-context.ts
var ParticipantContext = React4.createContext(void 0);
function useParticipantContext() {
  const participant = React4.useContext(ParticipantContext);
  if (!participant) {
    throw Error("tried to access participant context outside of participant context provider");
  }
  return participant;
}
function useMaybeParticipantContext() {
  return React4.useContext(ParticipantContext);
}
function useEnsureParticipant(participant) {
  var _a;
  const context = useMaybeParticipantContext();
  const trackContext = useMaybeTrackContext();
  const p = (_a = participant != null ? participant : context) != null ? _a : trackContext == null ? void 0 : trackContext.participant;
  if (!p) {
    throw new Error(
      "No participant provided, make sure you are inside a participant context or pass the participant explicitly"
    );
  }
  return p;
}

// src/context/room-context.ts
import * as React5 from "react";
var RoomContext = React5.createContext(void 0);
function useRoomContext() {
  const ctx = React5.useContext(RoomContext);
  if (!ctx) {
    throw Error("tried to access room context outside of livekit room component");
  }
  return ctx;
}
function useMaybeRoomContext() {
  return React5.useContext(RoomContext);
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

// src/components/controls/ClearPinButton.tsx
function useClearPinButton(props) {
  const { state, dispatch } = useLayoutContext().pin;
  const buttonProps = React6.useMemo(() => {
    const { className } = setupClearPinButton();
    const mergedProps = mergeProps2(props, {
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
function ClearPinButton(props) {
  const { buttonProps } = useClearPinButton(props);
  return /* @__PURE__ */ React6.createElement("button", __spreadValues({}, buttonProps), props.children);
}

// src/components/ConnectionState.tsx
import { connectionStateObserver } from "@livekit/components-core";
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

// src/components/ConnectionState.tsx
function useConnectionState(room) {
  const r = useEnsureRoom(room);
  const observable = React8.useMemo(() => connectionStateObserver(r), [r]);
  const connectionState = useObservableState(observable, r.state);
  return connectionState;
}
function ConnectionState(_a) {
  var _b = _a, { room } = _b, props = __objRest(_b, ["room"]);
  const connectionState = useConnectionState(room);
  return /* @__PURE__ */ React8.createElement("div", __spreadValues({}, props), connectionState);
}

// src/components/controls/ChatToggle.tsx
import { setupChatToggle } from "@livekit/components-core";
import * as React9 from "react";
function useToggleChat({ props }) {
  const { dispatch } = useLayoutContext().widget;
  const { className } = React9.useMemo(() => setupChatToggle(), []);
  const mergedProps = React9.useMemo(
    () => mergeProps2(props, {
      className,
      onClick: () => {
        if (dispatch)
          dispatch({ msg: "show_chat" });
      }
    }),
    [props, className, dispatch]
  );
  return { mergedProps };
}
function ChatToggle(props) {
  const { mergedProps } = useToggleChat({ props });
  return /* @__PURE__ */ React9.createElement("button", __spreadValues({}, mergedProps), props.children);
}

// src/components/controls/ShareLinkToggle.tsx
import * as React10 from "react";
import { setupShareLinkToggle } from "@livekit/components-core";
function useToggleShareLink({ props }) {
  const { dispatch } = useLayoutContext().widget;
  const { className } = React10.useMemo(() => setupShareLinkToggle(), []);
  const mergedProps = React10.useMemo(
    () => mergeProps2(props, {
      className,
      onClick: () => {
        if (dispatch)
          dispatch({ msg: "show_invite" });
      }
    }),
    [props, className, dispatch]
  );
  return { mergedProps };
}
function ShareLinkToggle(props) {
  const { mergedProps } = useToggleShareLink({ props });
  return /* @__PURE__ */ React10.createElement("button", __spreadValues({}, mergedProps), props.children);
}

// src/components/controls/DisconnectButton.tsx
import { ConnectionState as ConnectionState2 } from "livekit-client";
import { setupDisconnectButton } from "@livekit/components-core";
import * as React11 from "react";
function useDisconnectButton(props) {
  const room = useRoomContext();
  const connectionState = useConnectionState(room);
  const buttonProps = React11.useMemo(() => {
    const { className, disconnect } = setupDisconnectButton(room);
    const mergedProps = mergeProps2(props, {
      className,
      onClick: () => {
        var _a;
        return disconnect((_a = props.stopTracks) != null ? _a : true);
      },
      disabled: connectionState === ConnectionState2.Disconnected
    });
    return mergedProps;
  }, [room, props, connectionState]);
  return { buttonProps };
}
function DisconnectButton(props) {
  const { buttonProps } = useDisconnectButton(props);
  return /* @__PURE__ */ React11.createElement("button", __spreadValues({}, buttonProps), props.children);
}

// src/components/controls/FocusToggle.tsx
import { isTrackReferencePinned, setupFocusToggle } from "@livekit/components-core";
import * as React28 from "react";

// src/assets/icons/CameraDisabledIcon.tsx
import * as React12 from "react";
var SvgCameraDisabledIcon = (props) => /* @__PURE__ */ React12.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentColor" }, props), /* @__PURE__ */ React12.createElement("path", { d: "M1.354.646a.5.5 0 1 0-.708.708l14 14a.5.5 0 0 0 .708-.708L11 10.293V4.5A1.5 1.5 0 0 0 9.5 3H3.707zM0 4.5a1.5 1.5 0 0 1 .943-1.393l9.532 9.533c-.262.224-.603.36-.975.36h-8A1.5 1.5 0 0 1 0 11.5z" }), /* @__PURE__ */ React12.createElement("path", { d: "m15.2 3.6-2.8 2.1a1 1 0 0 0-.4.8v3a1 1 0 0 0 .4.8l2.8 2.1a.5.5 0 0 0 .8-.4V4a.5.5 0 0 0-.8-.4z" }));
var CameraDisabledIcon_default = SvgCameraDisabledIcon;

// src/assets/icons/CameraIcon.tsx
import * as React13 from "react";
var SvgCameraIcon = (props) => /* @__PURE__ */ React13.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentColor" }, props), /* @__PURE__ */ React13.createElement("path", { d: "M0 4.5A1.5 1.5 0 0 1 1.5 3h8A1.5 1.5 0 0 1 11 4.5v7A1.5 1.5 0 0 1 9.5 13h-8A1.5 1.5 0 0 1 0 11.5zM15.2 3.6l-2.8 2.1a1 1 0 0 0-.4.8v3a1 1 0 0 0 .4.8l2.8 2.1a.5.5 0 0 0 .8-.4V4a.5.5 0 0 0-.8-.4z" }));
var CameraIcon_default = SvgCameraIcon;

// src/assets/icons/ChatIcon.tsx
import * as React14 from "react";
var SvgChatIcon = (props) => /* @__PURE__ */ React14.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 18, fill: "none" }, props), /* @__PURE__ */ React14.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M0 2.75A2.75 2.75 0 0 1 2.75 0h10.5A2.75 2.75 0 0 1 16 2.75v13.594a.75.75 0 0 1-1.234.572l-3.691-3.12a1.25 1.25 0 0 0-.807-.296H2.75A2.75 2.75 0 0 1 0 10.75v-8ZM2.75 1.5c-.69 0-1.25.56-1.25 1.25v8c0 .69.56 1.25 1.25 1.25h7.518c.65 0 1.279.23 1.775.65l2.457 2.077V2.75c0-.69-.56-1.25-1.25-1.25H2.75Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React14.createElement(
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
import * as React15 from "react";
var SvgChevron = (props) => /* @__PURE__ */ React15.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React15.createElement(
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
import * as React16 from "react";
var SvgFocusToggleIcon = (props) => /* @__PURE__ */ React16.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React16.createElement("g", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5 }, /* @__PURE__ */ React16.createElement("path", { d: "M10 1.75h4.25m0 0V6m0-4.25L9 7M6 14.25H1.75m0 0V10m0 4.25L7 9" })));
var FocusToggleIcon_default = SvgFocusToggleIcon;

// src/assets/icons/LeaveIcon.tsx
import * as React17 from "react";
var SvgLeaveIcon = (props) => /* @__PURE__ */ React17.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React17.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M2 2.75A2.75 2.75 0 0 1 4.75 0h6.5A2.75 2.75 0 0 1 14 2.75v10.5A2.75 2.75 0 0 1 11.25 16h-6.5A2.75 2.75 0 0 1 2 13.25v-.5a.75.75 0 0 1 1.5 0v.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V2.75c0-.69-.56-1.25-1.25-1.25h-6.5c-.69 0-1.25.56-1.25 1.25v.5a.75.75 0 0 1-1.5 0v-.5Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React17.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M8.78 7.47a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 1 1-1.06-1.06l.97-.97H1.75a.75.75 0 0 1 0-1.5h4.69l-.97-.97a.75.75 0 0 1 1.06-1.06l2.25 2.25Z",
    clipRule: "evenodd"
  }
));
var LeaveIcon_default = SvgLeaveIcon;

// src/assets/icons/MicDisabledIcon.tsx
import * as React18 from "react";
var SvgMicDisabledIcon = (props) => /* @__PURE__ */ React18.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentColor" }, props), /* @__PURE__ */ React18.createElement("path", { d: "M12.227 11.52a5.477 5.477 0 0 0 1.246-2.97.5.5 0 0 0-.995-.1 4.478 4.478 0 0 1-.962 2.359l-1.07-1.07C10.794 9.247 11 8.647 11 8V3a3 3 0 0 0-6 0v1.293L1.354.646a.5.5 0 1 0-.708.708l14 14a.5.5 0 0 0 .708-.708zM8 12.5c.683 0 1.33-.152 1.911-.425l.743.743c-.649.359-1.378.59-2.154.66V15h2a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h2v-1.522a5.502 5.502 0 0 1-4.973-4.929.5.5 0 0 1 .995-.098A4.5 4.5 0 0 0 8 12.5z" }), /* @__PURE__ */ React18.createElement("path", { d: "M8.743 10.907 5 7.164V8a3 3 0 0 0 3.743 2.907z" }));
var MicDisabledIcon_default = SvgMicDisabledIcon;

// src/assets/icons/MicIcon.tsx
import * as React19 from "react";
var SvgMicIcon = (props) => /* @__PURE__ */ React19.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentColor" }, props), /* @__PURE__ */ React19.createElement(
  "path",
  {
    fillRule: "evenodd",
    d: "M2.975 8.002a.5.5 0 0 1 .547.449 4.5 4.5 0 0 0 8.956 0 .5.5 0 1 1 .995.098A5.502 5.502 0 0 1 8.5 13.478V15h2a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h2v-1.522a5.502 5.502 0 0 1-4.973-4.929.5.5 0 0 1 .448-.547z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React19.createElement("path", { d: "M5 3a3 3 0 1 1 6 0v5a3 3 0 0 1-6 0z" }));
var MicIcon_default = SvgMicIcon;

// src/assets/icons/QualityExcellentIcon.tsx
import * as React20 from "react";
var SvgQualityExcellentIcon = (props) => /* @__PURE__ */ React20.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentcolor" }, props), /* @__PURE__ */ React20.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React20.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }));
var QualityExcellentIcon_default = SvgQualityExcellentIcon;

// src/assets/icons/QualityGoodIcon.tsx
import * as React21 from "react";
var SvgQualityGoodIcon = (props) => /* @__PURE__ */ React21.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentcolor" }, props), /* @__PURE__ */ React21.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React21.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React21.createElement("g", { opacity: 0.25 }, /* @__PURE__ */ React21.createElement("path", { d: "M12 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React21.createElement("path", { d: "M12 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" })));
var QualityGoodIcon_default = SvgQualityGoodIcon;

// src/assets/icons/QualityPoorIcon.tsx
import * as React22 from "react";
var SvgQualityPoorIcon = (props) => /* @__PURE__ */ React22.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentcolor" }, props), /* @__PURE__ */ React22.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React22.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React22.createElement("g", { opacity: 0.25 }, /* @__PURE__ */ React22.createElement("path", { d: "M6 6.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React22.createElement("path", { d: "M6 6.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React22.createElement("path", { d: "M12 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" })));
var QualityPoorIcon_default = SvgQualityPoorIcon;

// src/assets/icons/QualityUnknownIcon.tsx
import * as React23 from "react";
var SvgQualityUnknownIcon = (props) => /* @__PURE__ */ React23.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentColor" }, props), /* @__PURE__ */ React23.createElement("g", { opacity: 0.25 }, /* @__PURE__ */ React23.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4Zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-9Zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V.5Z" }), /* @__PURE__ */ React23.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4Zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-9Zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V.5Z" })));
var QualityUnknownIcon_default = SvgQualityUnknownIcon;

// src/assets/icons/ScreenShareIcon.tsx
import * as React24 from "react";
var SvgScreenShareIcon = (props) => /* @__PURE__ */ React24.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 20, height: 16, fill: "none" }, props), /* @__PURE__ */ React24.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M0 2.75A2.75 2.75 0 0 1 2.75 0h14.5A2.75 2.75 0 0 1 20 2.75v10.5A2.75 2.75 0 0 1 17.25 16H2.75A2.75 2.75 0 0 1 0 13.25V2.75ZM2.75 1.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V2.75c0-.69-.56-1.25-1.25-1.25H2.75Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React24.createElement(
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
import * as React25 from "react";
var SvgScreenShareStopIcon = (props) => /* @__PURE__ */ React25.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 20, height: 16, fill: "none" }, props), /* @__PURE__ */ React25.createElement("g", { fill: "currentColor" }, /* @__PURE__ */ React25.createElement("path", { d: "M7.28 4.22a.75.75 0 0 0-1.06 1.06L8.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L10 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L11.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L10 6.94z" }), /* @__PURE__ */ React25.createElement(
  "path",
  {
    fillRule: "evenodd",
    d: "M2.75 0A2.75 2.75 0 0 0 0 2.75v10.5A2.75 2.75 0 0 0 2.75 16h14.5A2.75 2.75 0 0 0 20 13.25V2.75A2.75 2.75 0 0 0 17.25 0zM1.5 2.75c0-.69.56-1.25 1.25-1.25h14.5c.69 0 1.25.56 1.25 1.25v10.5c0 .69-.56 1.25-1.25 1.25H2.75c-.69 0-1.25-.56-1.25-1.25z",
    clipRule: "evenodd"
  }
)));
var ScreenShareStopIcon_default = SvgScreenShareStopIcon;

// src/assets/icons/SpinnerIcon.tsx
import * as React26 from "react";
var SvgSpinnerIcon = (props) => /* @__PURE__ */ React26.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React26.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M8 0a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 8 0Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React26.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M8 12a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5A.75.75 0 0 1 8 12Z",
    clipRule: "evenodd",
    opacity: 0.7
  }
), /* @__PURE__ */ React26.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M12 1.072a.75.75 0 0 1 .274 1.024l-1.25 2.165a.75.75 0 0 1-1.299-.75l1.25-2.165A.75.75 0 0 1 12 1.072Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React26.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M6 11.464a.75.75 0 0 1 .274 1.025l-1.25 2.165a.75.75 0 0 1-1.299-.75l1.25-2.165A.75.75 0 0 1 6 11.464Z",
    clipRule: "evenodd",
    opacity: 0.6
  }
), /* @__PURE__ */ React26.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M14.928 4a.75.75 0 0 1-.274 1.025l-2.165 1.25a.75.75 0 1 1-.75-1.3l2.165-1.25A.75.75 0 0 1 14.928 4Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React26.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M4.536 10a.75.75 0 0 1-.275 1.024l-2.165 1.25a.75.75 0 0 1-.75-1.298l2.165-1.25A.75.75 0 0 1 4.536 10Z",
    clipRule: "evenodd",
    opacity: 0.5
  }
), /* @__PURE__ */ React26.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M16 8a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h2.5A.75.75 0 0 1 16 8Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React26.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M4 8a.75.75 0 0 1-.75.75H.75a.75.75 0 0 1 0-1.5h2.5A.75.75 0 0 1 4 8Z",
    clipRule: "evenodd",
    opacity: 0.4
  }
), /* @__PURE__ */ React26.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M14.928 12a.75.75 0 0 1-1.024.274l-2.165-1.25a.75.75 0 0 1 .75-1.299l2.165 1.25A.75.75 0 0 1 14.928 12Z",
    clipRule: "evenodd",
    opacity: 0.9
  }
), /* @__PURE__ */ React26.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M4.536 6a.75.75 0 0 1-1.025.275l-2.165-1.25a.75.75 0 1 1 .75-1.3l2.165 1.25A.75.75 0 0 1 4.536 6Z",
    clipRule: "evenodd",
    opacity: 0.3
  }
), /* @__PURE__ */ React26.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M12 14.928a.75.75 0 0 1-1.024-.274l-1.25-2.165a.75.75 0 0 1 1.298-.75l1.25 2.165A.75.75 0 0 1 12 14.928Z",
    clipRule: "evenodd",
    opacity: 0.8
  }
), /* @__PURE__ */ React26.createElement(
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
import * as React27 from "react";
var SvgUnfocusToggleIcon = (props) => /* @__PURE__ */ React27.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React27.createElement("g", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5 }, /* @__PURE__ */ React27.createElement("path", { d: "M13.25 7H9m0 0V2.75M9 7l5.25-5.25M2.75 9H7m0 0v4.25M7 9l-5.25 5.25" })));
var UnfocusToggleIcon_default = SvgUnfocusToggleIcon;

// src/components/controls/FocusToggle.tsx
function useFocusToggle({ trackSource, participant, props }) {
  const p = useEnsureParticipant(participant);
  const layoutContext = useMaybeLayoutContext();
  const { className } = React28.useMemo(() => setupFocusToggle(), []);
  const inFocus = React28.useMemo(() => {
    const track = p.getTrack(trackSource);
    if ((layoutContext == null ? void 0 : layoutContext.pin.state) && track) {
      return isTrackReferencePinned(
        { participant: p, source: trackSource, publication: track },
        layoutContext.pin.state
      );
    } else {
      return false;
    }
  }, [p, trackSource, layoutContext]);
  const mergedProps = React28.useMemo(
    () => mergeProps2(props, {
      className,
      onClick: (event) => {
        var _a;
        (_a = props.onClick) == null ? void 0 : _a.call(props, event);
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
    }),
    [props, className, p, trackSource, inFocus, layoutContext]
  );
  return { mergedProps, inFocus };
}
function FocusToggle(_a) {
  var _b = _a, { trackSource, participant } = _b, props = __objRest(_b, ["trackSource", "participant"]);
  const { mergedProps, inFocus } = useFocusToggle({ trackSource, participant, props });
  return /* @__PURE__ */ React28.createElement(LayoutContext.Consumer, null, (layoutContext) => layoutContext !== void 0 && /* @__PURE__ */ React28.createElement("button", __spreadValues({}, mergedProps), props.children ? props.children : inFocus ? /* @__PURE__ */ React28.createElement(UnfocusToggleIcon_default, null) : /* @__PURE__ */ React28.createElement(FocusToggleIcon_default, null)));
}

// src/components/controls/MediaDeviceSelect.tsx
import * as React29 from "react";
import { setupDeviceSelector, createMediaDeviceObserver } from "@livekit/components-core";
function useMediaDevices({ kind }) {
  const deviceObserver = React29.useMemo(() => createMediaDeviceObserver(kind), [kind]);
  const devices = useObservableState(deviceObserver, []);
  return devices;
}
function useMediaDeviceSelect({ kind, room }) {
  const roomContext = useMaybeRoomContext();
  const deviceObserver = React29.useMemo(() => createMediaDeviceObserver(kind), [kind]);
  const devices = useObservableState(deviceObserver, []);
  const [currentDeviceId, setCurrentDeviceId] = React29.useState("");
  const { className, activeDeviceObservable, setActiveMediaDevice } = React29.useMemo(
    () => setupDeviceSelector(kind, room != null ? room : roomContext),
    [kind, room, roomContext]
  );
  React29.useEffect(() => {
    const listener = activeDeviceObservable.subscribe((deviceId) => {
      if (deviceId)
        setCurrentDeviceId(deviceId);
    });
    return () => {
      listener == null ? void 0 : listener.unsubscribe();
    };
  }, [activeDeviceObservable]);
  return { devices, className, activeDeviceId: currentDeviceId, setActiveMediaDevice };
}
function MediaDeviceSelect(_a) {
  var _b = _a, {
    kind,
    initialSelection,
    onActiveDeviceChange,
    onDeviceListChange
  } = _b, props = __objRest(_b, [
    "kind",
    "initialSelection",
    "onActiveDeviceChange",
    "onDeviceListChange"
  ]);
  const room = useMaybeRoomContext();
  const { devices, activeDeviceId, setActiveMediaDevice, className } = useMediaDeviceSelect({
    kind,
    room
  });
  React29.useEffect(() => {
    if (initialSelection) {
      setActiveMediaDevice(initialSelection);
    }
  });
  React29.useEffect(() => {
    if (typeof onDeviceListChange === "function") {
      onDeviceListChange(devices);
    }
  }, [onDeviceListChange, devices]);
  const handleActiveDeviceChange = (deviceId) => __async(this, null, function* () {
    setActiveMediaDevice(deviceId);
    onActiveDeviceChange == null ? void 0 : onActiveDeviceChange(deviceId);
  });
  const mergedProps = React29.useMemo(
    () => mergeProps2(props, { className }, { className: "lk-list" }),
    [className, props]
  );
  return /* @__PURE__ */ React29.createElement("ul", __spreadValues({}, mergedProps), devices.map((device) => /* @__PURE__ */ React29.createElement(
    "li",
    {
      key: device.deviceId,
      id: device.deviceId,
      "data-lk-active": device.deviceId === activeDeviceId,
      "aria-selected": device.deviceId === activeDeviceId,
      role: "option"
    },
    /* @__PURE__ */ React29.createElement("button", { className: "lk-button", onClick: () => handleActiveDeviceChange(device.deviceId) }, device.label)
  )));
}

// src/components/controls/StartAudio.tsx
import { setupStartAudio } from "@livekit/components-core";
import * as React30 from "react";
function useStartAudio({ room, props }) {
  const { className, roomAudioPlaybackAllowedObservable, handleStartAudioPlayback } = React30.useMemo(
    () => setupStartAudio(),
    []
  );
  const observable = React30.useMemo(
    () => roomAudioPlaybackAllowedObservable(room),
    [room, roomAudioPlaybackAllowedObservable]
  );
  const { canPlayAudio } = useObservableState(observable, { canPlayAudio: false });
  const mergedProps = React30.useMemo(
    () => mergeProps2(props, {
      className,
      onClick: () => {
        handleStartAudioPlayback(room);
      },
      style: { display: canPlayAudio ? "none" : "block" }
    }),
    [props, className, canPlayAudio, handleStartAudioPlayback, room]
  );
  return { mergedProps, canPlayAudio };
}
function StartAudio(_a) {
  var _b = _a, { label = "Allow Audio" } = _b, props = __objRest(_b, ["label"]);
  const room = useRoomContext();
  const { mergedProps } = useStartAudio({ room, props });
  return /* @__PURE__ */ React30.createElement("button", __spreadValues({}, mergedProps), label);
}

// src/components/controls/TrackToggle.tsx
import { log, setupManualToggle, setupMediaToggle } from "@livekit/components-core";
import * as React32 from "react";

// src/assets/icons/util.tsx
import * as React31 from "react";
import { ConnectionQuality, Track } from "livekit-client";
function getSourceIcon(source, enabled) {
  switch (source) {
    case Track.Source.Microphone:
      return enabled ? /* @__PURE__ */ React31.createElement(MicIcon_default, null) : /* @__PURE__ */ React31.createElement(MicDisabledIcon_default, null);
    case Track.Source.Camera:
      return enabled ? /* @__PURE__ */ React31.createElement(CameraIcon_default, null) : /* @__PURE__ */ React31.createElement(CameraDisabledIcon_default, null);
    case Track.Source.ScreenShare:
      return enabled ? /* @__PURE__ */ React31.createElement(ScreenShareStopIcon_default, null) : /* @__PURE__ */ React31.createElement(ScreenShareIcon_default, null);
    default:
      return void 0;
  }
}
function getConnectionQualityIcon(quality) {
  switch (quality) {
    case ConnectionQuality.Excellent:
      return /* @__PURE__ */ React31.createElement(QualityExcellentIcon_default, null);
    case ConnectionQuality.Good:
      return /* @__PURE__ */ React31.createElement(QualityGoodIcon_default, null);
    case ConnectionQuality.Poor:
      return /* @__PURE__ */ React31.createElement(QualityPoorIcon_default, null);
    default:
      return /* @__PURE__ */ React31.createElement(QualityUnknownIcon_default, null);
  }
}

// src/components/controls/TrackToggle.tsx
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
  const { toggle, className, pendingObserver, enabledObserver } = React32.useMemo(
    () => room ? setupMediaToggle(source, room, captureOptions) : setupManualToggle(),
    [room, source, JSON.stringify(captureOptions)]
  );
  const pending = useObservableState(pendingObserver, false);
  const enabled = useObservableState(enabledObserver, initialState != null ? initialState : !!(track == null ? void 0 : track.isEnabled));
  React32.useEffect(() => {
    onChange == null ? void 0 : onChange(enabled);
  }, [enabled, onChange]);
  React32.useEffect(() => {
    if (initialState !== void 0) {
      log.debug("forcing initial toggle state", source, initialState);
      toggle(initialState);
    }
  }, []);
  const newProps = React32.useMemo(() => mergeProps(rest, { className }), [rest, className]);
  const clickHandler = React32.useCallback(
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
      disabled: pending || rest.disabled,
      onClick: clickHandler
    })
  };
}
function TrackToggle(_a) {
  var _b = _a, { showIcon } = _b, props = __objRest(_b, ["showIcon"]);
  const { buttonProps, enabled } = useTrackToggle(props);
  return /* @__PURE__ */ React32.createElement("button", __spreadValues({}, buttonProps), (showIcon != null ? showIcon : true) && getSourceIcon(props.source, enabled), props.children);
}

// src/components/layout/FocusLayout.tsx
import * as React60 from "react";

// src/components/participant/ParticipantTile.tsx
import * as React59 from "react";
import { Track as Track4 } from "livekit-client";
import { isParticipantSourcePinned, setupParticipantTile } from "@livekit/components-core";

// src/components/participant/ConnectionQualityIndicator.tsx
import * as React33 from "react";
import { setupConnectionQualityIndicator } from "@livekit/components-core";
import { ConnectionQuality as ConnectionQuality2 } from "livekit-client";
function useConnectionQualityIndicator(options = {}) {
  const p = useEnsureParticipant(options.participant);
  const { className, connectionQualityObserver } = React33.useMemo(
    () => setupConnectionQualityIndicator(p),
    [p]
  );
  const quality = useObservableState(connectionQualityObserver, ConnectionQuality2.Unknown);
  return { className, quality };
}
function ConnectionQualityIndicator(props) {
  var _a;
  const { className, quality } = useConnectionQualityIndicator(props);
  const elementProps = React33.useMemo(() => {
    return __spreadProps(__spreadValues({}, mergeProps2(props, { className })), { "data-lk-quality": quality });
  }, [quality, props, className]);
  return /* @__PURE__ */ React33.createElement("div", __spreadValues({}, elementProps), (_a = props.children) != null ? _a : getConnectionQualityIcon(quality));
}

// src/components/participant/ParticipantName.tsx
import { participantInfoObserver, setupParticipantName } from "@livekit/components-core";
import * as React34 from "react";
function useParticipantInfo(props = {}) {
  const p = useEnsureParticipant(props.participant);
  const infoObserver = React34.useMemo(() => participantInfoObserver(p), [p]);
  const { identity, name, metadata } = useObservableState(infoObserver, {
    name: p.name,
    identity: p.identity,
    metadata: p.metadata
  });
  return { identity, name, metadata };
}
function ParticipantName(_a) {
  var _b = _a, { participant } = _b, props = __objRest(_b, ["participant"]);
  const p = useEnsureParticipant(participant);
  const { className, infoObserver } = React34.useMemo(() => {
    return setupParticipantName(p);
  }, [p]);
  const { identity, name } = useObservableState(infoObserver, {
    name: p.name,
    identity: p.identity,
    metadata: p.metadata
  });
  const mergedProps = React34.useMemo(() => {
    return mergeProps2(props, { className, "data-lk-participant-name": name });
  }, [props, className, name]);
  return /* @__PURE__ */ React34.createElement("span", __spreadValues({}, mergedProps), name !== "" ? name : identity, props.children);
}

// src/components/participant/TrackMutedIndicator.tsx
import * as React35 from "react";
import { setupTrackMutedIndicator } from "@livekit/components-core";
var useTrackMutedIndicator = (source, options = {}) => {
  var _a;
  const p = useEnsureParticipant(options.participant);
  const { className, mediaMutedObserver } = React35.useMemo(
    () => setupTrackMutedIndicator(p, source),
    [p, source]
  );
  const isMuted = useObservableState(mediaMutedObserver, !!((_a = p.getTrack(source)) == null ? void 0 : _a.isMuted));
  return { isMuted, className };
};
var TrackMutedIndicator = (_a) => {
  var _b = _a, {
    source,
    participant,
    show = "always"
  } = _b, props = __objRest(_b, [
    "source",
    "participant",
    "show"
  ]);
  var _a2;
  const { className, isMuted } = useTrackMutedIndicator(source, { participant });
  const showIndicator = show === "always" || show === "muted" && isMuted || show === "unmuted" && !isMuted;
  const htmlProps = React35.useMemo(
    () => mergeProps2(props, {
      className
    }),
    [className, props]
  );
  if (!showIndicator) {
    return null;
  }
  return /* @__PURE__ */ React35.createElement("div", __spreadProps(__spreadValues({}, htmlProps), { "data-lk-muted": isMuted }), (_a2 = props.children) != null ? _a2 : getSourceIcon(source, !isMuted));
};

// src/hooks/useDataChannel.ts
import { setupDataMessageHandler } from "@livekit/components-core";
import * as React38 from "react";

// src/hooks/internal/useResizeObserver.ts
import * as React36 from "react";
import useLatest from "@react-hook/latest";
function useResizeObserver(target, callback) {
  const resizeObserver = getResizeObserver();
  const storedCallback = useLatest(callback);
  React36.useLayoutEffect(() => {
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
  const [size, setSize] = React36.useState({ width: 0, height: 0 });
  React36.useLayoutEffect(() => {
    if (target.current) {
      const { width, height } = target.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, [target.current]);
  const resizeCallback = React36.useCallback(
    (entry) => setSize(entry.contentRect),
    []
  );
  useResizeObserver(target, resizeCallback);
  return size;
};

// src/hooks/internal/useMediaQuery.ts
import * as React37 from "react";
function useMediaQuery(query) {
  const getMatches = (query2) => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query2).matches;
    }
    return false;
  };
  const [matches, setMatches] = React37.useState(getMatches(query));
  function handleChange() {
    setMatches(getMatches(query));
  }
  React37.useEffect(() => {
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

// src/hooks/useDataChannel.ts
function useDataChannel(topic, onMessage) {
  const room = useRoomContext();
  const { send, messageObservable, isSendingObservable } = React38.useMemo(
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

// src/hooks/useGridLayout.ts
import { GRID_LAYOUTS, selectGridLayout } from "@livekit/components-core";
import * as React39 from "react";
function useGridLayout(gridElement, trackCount) {
  const { width, height } = useSize(gridElement);
  const layout = width > 0 && height > 0 ? selectGridLayout(GRID_LAYOUTS, trackCount, width, height) : GRID_LAYOUTS[0];
  React39.useEffect(() => {
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
import { mutedObserver } from "@livekit/components-core";
import * as React40 from "react";
function useIsMuted(source, options = {}) {
  var _a;
  const p = useEnsureParticipant(options.participant);
  const [isMuted, setIsMuted] = React40.useState(!!((_a = p.getTrack(source)) == null ? void 0 : _a.isMuted));
  React40.useEffect(() => {
    const listener = mutedObserver(p, source).subscribe(setIsMuted);
    return () => listener.unsubscribe();
  }, [p, source]);
  return isMuted;
}

// src/hooks/useIsSpeaking.ts
import { createIsSpeakingObserver } from "@livekit/components-core";
import * as React41 from "react";
function useIsSpeaking(participant) {
  const p = useEnsureParticipant(participant);
  const observable = React41.useMemo(() => createIsSpeakingObserver(p), [p]);
  const isSpeaking = useObservableState(observable, p.isSpeaking);
  return isSpeaking;
}

// src/hooks/useLocalParticipant.ts
import { observeParticipantMedia } from "@livekit/components-core";
import * as React42 from "react";
var useLocalParticipant = (options = {}) => {
  const room = useEnsureRoom(options.room);
  const [localParticipant, setLocalParticipant] = React42.useState(room.localParticipant);
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = React42.useState(
    localParticipant.isMicrophoneEnabled
  );
  const [isCameraEnabled, setIsCameraEnabled] = React42.useState(
    localParticipant.isMicrophoneEnabled
  );
  const [isScreenShareEnabled, setIsScreenShareEnabled] = React42.useState(
    localParticipant.isMicrophoneEnabled
  );
  const [microphoneTrack, setMicrophoneTrack] = React42.useState(
    void 0
  );
  const [cameraTrack, setCameraTrack] = React42.useState(void 0);
  const handleUpdate = (media) => {
    setIsCameraEnabled(media.isCameraEnabled);
    setIsMicrophoneEnabled(media.isMicrophoneEnabled);
    setIsScreenShareEnabled(media.isScreenShareEnabled);
    setCameraTrack(media.cameraTrack);
    setMicrophoneTrack(media.microphoneTrack);
    setLocalParticipant(media.participant);
  };
  React42.useEffect(() => {
    const listener = observeParticipantMedia(localParticipant).subscribe(handleUpdate);
    return () => listener.unsubscribe();
  }, [localParticipant]);
  return {
    isMicrophoneEnabled,
    isScreenShareEnabled,
    isCameraEnabled,
    microphoneTrack,
    cameraTrack,
    localParticipant
  };
};

// src/hooks/useLocalParticipantPermissions.ts
import { participantPermissionObserver } from "@livekit/components-core";
import * as React43 from "react";
function useLocalParticipantPermissions() {
  const room = useRoomContext();
  const permissionObserver = React43.useMemo(
    () => participantPermissionObserver(room.localParticipant),
    [room]
  );
  const permissions = useObservableState(permissionObserver, room.localParticipant.permissions);
  return permissions;
}

// src/hooks/useMediaTrackBySourceOrName.ts
import { isTrackReference } from "@livekit/components-core";
import { setupMediaTrack, log as log2, isLocal, getTrackByIdentifier } from "@livekit/components-core";
import { Track as Track2 } from "livekit-client";
import * as React44 from "react";
function useMediaTrackBySourceOrName(observerOptions, options = {}) {
  const [publication, setPublication] = React44.useState(getTrackByIdentifier(observerOptions));
  const [isMuted, setMuted] = React44.useState(publication == null ? void 0 : publication.isMuted);
  const [isSubscribed, setSubscribed] = React44.useState(publication == null ? void 0 : publication.isSubscribed);
  const [track, setTrack] = React44.useState(publication == null ? void 0 : publication.track);
  const [orientation, setOrientation] = React44.useState("landscape");
  const previousElement = React44.useRef();
  const { className, trackObserver } = React44.useMemo(() => {
    return setupMediaTrack(observerOptions);
  }, [
    observerOptions.participant.identity,
    observerOptions.source,
    isTrackReference(observerOptions) && observerOptions.publication.trackSid
  ]);
  React44.useEffect(() => {
    const subscription = trackObserver.subscribe((publication2) => {
      log2.debug("update track", publication2);
      setPublication(publication2);
      setMuted(publication2 == null ? void 0 : publication2.isMuted);
      setSubscribed(publication2 == null ? void 0 : publication2.isSubscribed);
      setTrack(publication2 == null ? void 0 : publication2.track);
    });
    return () => subscription == null ? void 0 : subscription.unsubscribe();
  }, [trackObserver]);
  React44.useEffect(() => {
    var _a, _b;
    if (track) {
      if (previousElement.current) {
        track.detach(previousElement.current);
      }
      if (((_a = options.element) == null ? void 0 : _a.current) && !(isLocal(observerOptions.participant) && (track == null ? void 0 : track.kind) === "audio")) {
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
  React44.useEffect(() => {
    var _a, _b;
    if (typeof ((_a = publication == null ? void 0 : publication.dimensions) == null ? void 0 : _a.width) === "number" && typeof ((_b = publication == null ? void 0 : publication.dimensions) == null ? void 0 : _b.height) === "number") {
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
    }, (publication == null ? void 0 : publication.source) === Track2.Source.Camera || (publication == null ? void 0 : publication.source) === Track2.Source.ScreenShare ? { "data-lk-orientation": orientation } : {}))
  };
}

// src/hooks/useMediaTrack.ts
function useMediaTrack(source, participant, options = {}) {
  const p = useEnsureParticipant(participant);
  return useMediaTrackBySourceOrName({ source, participant: p }, options);
}

// src/hooks/useMediaTrackByName.ts
function useMediaTrackByName(name, participant, options = {}) {
  const p = useEnsureParticipant(participant);
  return useMediaTrackBySourceOrName({ name, participant: p }, options);
}

// src/hooks/usePagination.ts
import * as React46 from "react";

// src/hooks/useVisualStableUpdate.ts
import { log as log3, sortTrackReferences, updatePages } from "@livekit/components-core";
import * as React45 from "react";
function useVisualStableUpdate(trackReferences, maxItemsOnPage, options = {}) {
  const lastTrackRefs = React45.useRef([]);
  const lastMaxItemsOnPage = React45.useRef(-1);
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
  const [currentPage, setCurrentPage] = React46.useState(1);
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
  return {
    totalPageCount,
    nextPage: () => changePage("next"),
    prevPage: () => changePage("previous"),
    setPage: goToPage,
    firstItemIndex,
    lastItemIndex,
    tracks: updatedTrackReferences.slice(firstItemIndex, lastItemIndex),
    currentPage
  };
}

// src/hooks/useParticipantPermissions.ts
import * as React47 from "react";
import { participantPermissionObserver as participantPermissionObserver2 } from "@livekit/components-core";
function useParticipantPermissions(options = {}) {
  const p = useEnsureParticipant(options.participant);
  const permissionObserver = React47.useMemo(() => participantPermissionObserver2(p), [p]);
  const permissions = useObservableState(permissionObserver, p.permissions);
  return permissions;
}

// src/hooks/useRemoteParticipants.ts
import { connectedParticipantsObserver } from "@livekit/components-core";
import * as React48 from "react";
var useRemoteParticipants = (options = {}) => {
  const room = useEnsureRoom(options.room);
  const [participants, setParticipants] = React48.useState([]);
  React48.useEffect(() => {
    const listener = connectedParticipantsObserver(room, {
      additionalRoomEvents: options.updateOnlyOn
    }).subscribe(setParticipants);
    return () => listener.unsubscribe();
  }, [room, JSON.stringify(options.updateOnlyOn)]);
  return participants;
};

// src/hooks/useParticipants.ts
var useParticipants = (options = {}) => {
  const remoteParticipants = useRemoteParticipants(options);
  const { localParticipant } = useLocalParticipant(options);
  return [localParticipant, ...remoteParticipants];
};

// src/hooks/useRemoteParticipant.ts
import { connectedParticipantObserver } from "@livekit/components-core";
import * as React49 from "react";
var useRemoteParticipant = (identity, options = {}) => {
  const room = useRoomContext();
  const [updateOnlyOn] = React49.useState(options.updateOnlyOn);
  const observable = React49.useMemo(
    () => connectedParticipantObserver(room, identity, { additionalEvents: updateOnlyOn }),
    [room, identity, updateOnlyOn]
  );
  const participant = useObservableState(
    observable,
    room.getParticipantByIdentity(identity)
  );
  return participant;
};

// src/hooks/useSortedParticipants.ts
import { sortParticipants } from "@livekit/components-core";
import * as React51 from "react";

// src/hooks/useSpeakingParticipants.ts
import { activeSpeakerObserver } from "@livekit/components-core";
import * as React50 from "react";
var useSpeakingParticipants = () => {
  const room = useRoomContext();
  const speakerObserver = React50.useMemo(() => activeSpeakerObserver(room), [room]);
  const activeSpeakers = useObservableState(speakerObserver, room.activeSpeakers);
  return activeSpeakers;
};

// src/hooks/useSortedParticipants.ts
function useSortedParticipants(participants) {
  const [sortedParticipants, setSortedParticipants] = React51.useState(
    sortParticipants(participants)
  );
  const activeSpeakers = useSpeakingParticipants();
  React51.useEffect(() => {
    setSortedParticipants(sortParticipants(participants));
  }, [activeSpeakers, participants]);
  return sortedParticipants;
}

// src/hooks/useToken.ts
import { log as log4 } from "@livekit/components-core";
import * as React52 from "react";
function useToken(tokenEndpoint, roomName, options = {}) {
  const [token, setToken] = React52.useState(void 0);
  React52.useEffect(() => {
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
      const { accessToken } = yield res.json();
      setToken(accessToken);
    });
    tokenFetcher();
  }, [tokenEndpoint, roomName, options]);
  return token;
}

// src/hooks/useTracks.ts
import {
  isSourcesWithOptions,
  isSourceWitOptions,
  log as log5,
  trackReferencesObservable
} from "@livekit/components-core";
import { Track as Track3 } from "livekit-client";
import * as React53 from "react";
function useTracks(sources = [
  Track3.Source.Camera,
  Track3.Source.Microphone,
  Track3.Source.ScreenShare,
  Track3.Source.ScreenShareAudio,
  Track3.Source.Unknown
], options = {}) {
  const room = useEnsureRoom(options.room);
  const [trackReferences, setTrackReferences] = React53.useState([]);
  const [participants, setParticipants] = React53.useState([]);
  const sources_ = React53.useMemo(() => {
    return sources.map((s) => isSourceWitOptions(s) ? s.source : s);
  }, [JSON.stringify(sources)]);
  React53.useEffect(() => {
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
  const maybeTrackReferences = React53.useMemo(() => {
    if (isSourcesWithOptions(sources)) {
      const requirePlaceholder = requiredPlaceholders(sources, participants);
      const trackReferencesWithPlaceholders = Array.from(
        trackReferences
      );
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

// src/hooks/usePinnedTracks.ts
import * as React54 from "react";
function usePinnedTracks(layoutContext) {
  layoutContext = useEnsureLayoutContext(layoutContext);
  return React54.useMemo(() => {
    if ((layoutContext == null ? void 0 : layoutContext.pin.state) !== void 0 && layoutContext.pin.state.length >= 1) {
      return layoutContext.pin.state;
    }
    return [];
  }, [layoutContext]);
}

// src/hooks/useSwipe.ts
import * as React55 from "react";
function useSwipe(element, options = {}) {
  var _a;
  const touchStart = React55.useRef(null);
  const touchEnd = React55.useRef(null);
  const minSwipeDistance = (_a = options.minSwipeDistance) != null ? _a : 50;
  const onTouchStart = (event) => {
    touchEnd.current = null;
    touchStart.current = event.targetTouches[0].clientX;
  };
  const onTouchMove = (event) => {
    touchEnd.current = event.targetTouches[0].clientX;
  };
  const onTouchEnd = React55.useCallback(() => {
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
  React55.useEffect(() => {
    const elementCopy = element.current;
    if (elementCopy) {
      elementCopy.addEventListener("touchstart", onTouchStart);
      elementCopy.addEventListener("touchmove", onTouchMove);
      elementCopy.addEventListener("touchend", onTouchEnd);
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

// src/assets/images/ParticipantPlaceholder.tsx
import * as React56 from "react";
var SvgParticipantPlaceholder = (props) => /* @__PURE__ */ React56.createElement(
  "svg",
  __spreadValues({
    width: 320,
    height: 320,
    viewBox: "0 0 320 320",
    preserveAspectRatio: "xMidYMid meet",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props),
  /* @__PURE__ */ React56.createElement(
    "path",
    {
      d: "M160 180C204.182 180 240 144.183 240 100C240 55.8172 204.182 20 160 20C115.817 20 79.9997 55.8172 79.9997 100C79.9997 144.183 115.817 180 160 180Z",
      fill: "white",
      fillOpacity: 0.25
    }
  ),
  /* @__PURE__ */ React56.createElement(
    "path",
    {
      d: "M97.6542 194.614C103.267 191.818 109.841 192.481 115.519 195.141C129.025 201.466 144.1 205 159.999 205C175.899 205 190.973 201.466 204.48 195.141C210.158 192.481 216.732 191.818 222.345 194.614C262.703 214.719 291.985 253.736 298.591 300.062C300.15 310.997 291.045 320 280 320H39.9997C28.954 320 19.8495 310.997 21.4087 300.062C28.014 253.736 57.2966 214.72 97.6542 194.614Z",
      fill: "white",
      fillOpacity: 0.25
    }
  )
);
var ParticipantPlaceholder_default = SvgParticipantPlaceholder;

// src/components/participant/VideoTrack.tsx
import * as React57 from "react";
function VideoTrack(_a) {
  var _b = _a, {
    onTrackClick,
    onClick,
    onSubscriptionStatusChanged,
    name,
    publication,
    source
  } = _b, props = __objRest(_b, [
    "onTrackClick",
    "onClick",
    "onSubscriptionStatusChanged",
    "name",
    "publication",
    "source"
  ]);
  const mediaEl = React57.useRef(null);
  const participant = useEnsureParticipant(props.participant);
  const {
    elementProps,
    publication: pub,
    isSubscribed
  } = useMediaTrackBySourceOrName(
    { participant, name, source, publication },
    {
      element: mediaEl,
      props
    }
  );
  React57.useEffect(() => {
    onSubscriptionStatusChanged == null ? void 0 : onSubscriptionStatusChanged(!!isSubscribed);
  }, [isSubscribed, onSubscriptionStatusChanged]);
  const clickHandler = (evt) => {
    onClick == null ? void 0 : onClick(evt);
    onTrackClick == null ? void 0 : onTrackClick({ participant, track: pub });
  };
  return /* @__PURE__ */ React57.createElement("video", __spreadProps(__spreadValues({ ref: mediaEl }, elementProps), { muted: true, onClick: clickHandler }));
}

// src/components/participant/AudioTrack.tsx
import * as React58 from "react";
import { log as log6 } from "@livekit/components-core";
import { RemoteAudioTrack } from "livekit-client";
function AudioTrack(_a) {
  var _b = _a, { onSubscriptionStatusChanged, volume } = _b, props = __objRest(_b, ["onSubscriptionStatusChanged", "volume"]);
  const { source, name, publication } = props;
  const mediaEl = React58.useRef(null);
  const participant = useEnsureParticipant(props.participant);
  const { elementProps, isSubscribed, track } = useMediaTrackBySourceOrName(
    { source, name, participant, publication },
    {
      element: mediaEl,
      props
    }
  );
  React58.useEffect(() => {
    onSubscriptionStatusChanged == null ? void 0 : onSubscriptionStatusChanged(!!isSubscribed);
  }, [isSubscribed, onSubscriptionStatusChanged]);
  React58.useEffect(() => {
    if (volume && track instanceof RemoteAudioTrack) {
      track.setVolume(volume);
    } else {
      log6.warn("volume can only be set on remote audio tracks");
    }
  }, [volume, track]);
  return /* @__PURE__ */ React58.createElement("audio", __spreadValues({ ref: mediaEl }, elementProps));
}

// src/components/participant/ParticipantTile.tsx
function useParticipantTile({
  participant,
  source,
  publication,
  onParticipantClick,
  disableSpeakingIndicator,
  htmlProps
}) {
  const p = useEnsureParticipant(participant);
  const mergedProps = React59.useMemo(() => {
    const { className } = setupParticipantTile();
    return mergeProps2(htmlProps, {
      className,
      onClick: (event) => {
        var _a;
        (_a = htmlProps.onClick) == null ? void 0 : _a.call(htmlProps, event);
        if (typeof onParticipantClick === "function") {
          const track = publication != null ? publication : p.getTrack(source);
          onParticipantClick({ participant: p, track });
        }
      }
    });
  }, [htmlProps, source, onParticipantClick, p, publication]);
  const isVideoMuted = useIsMuted(Track4.Source.Camera, { participant });
  const isAudioMuted = useIsMuted(Track4.Source.Microphone, { participant });
  const isSpeaking = useIsSpeaking(participant);
  return {
    elementProps: __spreadValues({
      "data-lk-audio-muted": isAudioMuted,
      "data-lk-video-muted": isVideoMuted,
      "data-lk-speaking": disableSpeakingIndicator === true ? false : isSpeaking,
      "data-lk-local-participant": participant.isLocal,
      "data-lk-source": source
    }, mergedProps)
  };
}
function ParticipantContextIfNeeded(props) {
  const hasContext = !!useMaybeParticipantContext();
  return props.participant && !hasContext ? /* @__PURE__ */ React59.createElement(ParticipantContext.Provider, { value: props.participant }, props.children) : /* @__PURE__ */ React59.createElement(React59.Fragment, null, props.children);
}
var ParticipantTile = (_a) => {
  var _b = _a, {
    participant,
    children,
    source = Track4.Source.Camera,
    onParticipantClick,
    publication,
    disableSpeakingIndicator
  } = _b, htmlProps = __objRest(_b, [
    "participant",
    "children",
    "source",
    "onParticipantClick",
    "publication",
    "disableSpeakingIndicator"
  ]);
  const p = useEnsureParticipant(participant);
  const { elementProps } = useParticipantTile({
    participant: p,
    htmlProps,
    source,
    publication,
    disableSpeakingIndicator,
    onParticipantClick
  });
  const layoutContext = useMaybeLayoutContext();
  const handleSubscribe = React59.useCallback(
    (subscribed) => {
      if (source && !subscribed && layoutContext && layoutContext.pin.dispatch && isParticipantSourcePinned(p, source, layoutContext.pin.state)) {
        layoutContext.pin.dispatch({ msg: "clear_pin" });
      }
    },
    [p, layoutContext, source]
  );
  return /* @__PURE__ */ React59.createElement("div", __spreadValues({ style: { position: "relative" } }, elementProps), /* @__PURE__ */ React59.createElement(ParticipantContextIfNeeded, { participant: p }, children != null ? children : /* @__PURE__ */ React59.createElement(React59.Fragment, null, (publication == null ? void 0 : publication.kind) === "video" || source === Track4.Source.Camera || source === Track4.Source.ScreenShare ? /* @__PURE__ */ React59.createElement(
    VideoTrack,
    {
      participant: p,
      source,
      publication,
      onSubscriptionStatusChanged: handleSubscribe
    }
  ) : /* @__PURE__ */ React59.createElement(
    AudioTrack,
    {
      participant: p,
      source,
      publication,
      onSubscriptionStatusChanged: handleSubscribe
    }
  ), /* @__PURE__ */ React59.createElement("div", { className: "lk-participant-placeholder" }, /* @__PURE__ */ React59.createElement(ParticipantPlaceholder_default, null)), /* @__PURE__ */ React59.createElement("div", { className: "lk-participant-metadata" }, /* @__PURE__ */ React59.createElement("div", { className: "lk-participant-metadata-item" }, source === Track4.Source.Camera ? /* @__PURE__ */ React59.createElement(React59.Fragment, null, /* @__PURE__ */ React59.createElement(
    TrackMutedIndicator,
    {
      source: Track4.Source.Microphone,
      show: "muted"
    }
  ), /* @__PURE__ */ React59.createElement(ParticipantName, null)) : /* @__PURE__ */ React59.createElement(React59.Fragment, null, /* @__PURE__ */ React59.createElement(ScreenShareIcon_default, { style: { marginRight: "0.25rem" } }), /* @__PURE__ */ React59.createElement(ParticipantName, null, "'s screen"))), /* @__PURE__ */ React59.createElement(ConnectionQualityIndicator, { className: "lk-participant-metadata-item" }))), /* @__PURE__ */ React59.createElement(FocusToggle, { trackSource: source })));
};

// src/components/layout/FocusLayout.tsx
function FocusLayoutContainer(props) {
  const elementProps = mergeProps2(props, { className: "lk-focus-layout" });
  return /* @__PURE__ */ React60.createElement("div", __spreadValues({}, elementProps), props.children);
}
function FocusLayout(_a) {
  var _b = _a, { track } = _b, htmlProps = __objRest(_b, ["track"]);
  return /* @__PURE__ */ React60.createElement(ParticipantTile, __spreadValues(__spreadValues({}, track), htmlProps));
}

// src/components/layout/GridLayout.tsx
import * as React64 from "react";

// src/components/TrackLoop.tsx
import { isTrackReference as isTrackReference2 } from "@livekit/components-core";
import * as React61 from "react";
var TrackLoop = (_a) => {
  var _b = _a, { tracks } = _b, props = __objRest(_b, ["tracks"]);
  return /* @__PURE__ */ React61.createElement(React61.Fragment, null, tracks.map((trackReference) => {
    const trackSource = isTrackReference2(trackReference) ? trackReference.publication.source : trackReference.source;
    return /* @__PURE__ */ React61.createElement(
      TrackContext.Provider,
      {
        value: trackReference,
        key: `${trackReference.participant.identity}_${trackSource}`
      },
      cloneSingleChild(props.children)
    );
  }));
};

// src/components/controls/PaginationControl.tsx
import * as React62 from "react";
import { createInteractingObservable } from "@livekit/components-core";
function PaginationControl({
  totalPageCount,
  nextPage,
  prevPage,
  currentPage,
  pagesContainer: connectedElement
}) {
  const [interactive, setInteractive] = React62.useState(false);
  React62.useEffect(() => {
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
  return /* @__PURE__ */ React62.createElement("div", { className: "lk-pagination-control", "data-lk-user-interaction": interactive }, /* @__PURE__ */ React62.createElement("button", { className: "lk-button", onClick: prevPage }, /* @__PURE__ */ React62.createElement(Chevron_default, null)), /* @__PURE__ */ React62.createElement("span", { className: "lk-pagination-count" }, `${currentPage} of ${totalPageCount}`), /* @__PURE__ */ React62.createElement("button", { className: "lk-button", onClick: nextPage }, /* @__PURE__ */ React62.createElement(Chevron_default, null)));
}

// src/components/controls/PaginationIndicator.tsx
import * as React63 from "react";
function PaginationIndicator({ totalPageCount, currentPage }) {
  const bubbles = new Array(totalPageCount).fill("").map((_, index) => {
    if (index + 1 === currentPage) {
      return /* @__PURE__ */ React63.createElement("span", { "data-lk-active": true, key: index });
    } else {
      return /* @__PURE__ */ React63.createElement("span", { key: index });
    }
  });
  return /* @__PURE__ */ React63.createElement("div", { className: "lk-pagination-indicator" }, bubbles);
}

// src/components/layout/GridLayout.tsx
function GridLayout(_a) {
  var _b = _a, { tracks } = _b, props = __objRest(_b, ["tracks"]);
  const gridEl = React64.createRef();
  const elementProps = React64.useMemo(
    () => mergeProps2(props, { className: "lk-grid-layout" }),
    [props]
  );
  const { layout } = useGridLayout(gridEl, tracks.length);
  const pagination = usePagination(layout.maxTiles, tracks);
  useSwipe(gridEl, {
    onLeftSwipe: pagination.nextPage,
    onRightSwipe: pagination.prevPage
  });
  return /* @__PURE__ */ React64.createElement("div", __spreadValues({ ref: gridEl, "data-lk-pagination": pagination.totalPageCount > 1 }, elementProps), /* @__PURE__ */ React64.createElement(TrackLoop, { tracks: pagination.tracks }, props.children), tracks.length > layout.maxTiles && /* @__PURE__ */ React64.createElement(React64.Fragment, null, /* @__PURE__ */ React64.createElement(
    PaginationIndicator,
    {
      totalPageCount: pagination.totalPageCount,
      currentPage: pagination.currentPage
    }
  ), /* @__PURE__ */ React64.createElement(PaginationControl, __spreadValues({ pagesContainer: gridEl }, pagination))));
}

// src/components/layout/CarouselLayout.tsx
import { getScrollBarWidth } from "@livekit/components-core";
import * as React65 from "react";
var MIN_HEIGHT = 130;
var MIN_WIDTH = 140;
var MIN_VISIBLE_TILES = 1;
var ASPECT_RATIO = 16 / 10;
var ASPECT_RATIO_INVERT = (1 - ASPECT_RATIO) * -1;
function CarouselLayout(_a) {
  var _b = _a, { tracks, orientation } = _b, props = __objRest(_b, ["tracks", "orientation"]);
  const asideEl = React65.useRef(null);
  const { width, height } = useSize(asideEl);
  const carouselOrientation = orientation ? orientation : height >= width ? "vertical" : "horizontal";
  const tileHeight = Math.max(width * ASPECT_RATIO_INVERT, MIN_HEIGHT);
  const tileWidth = Math.max(height * ASPECT_RATIO, MIN_WIDTH);
  let maxVisibleTiles = carouselOrientation === "vertical" ? Math.max(Math.floor(height / tileHeight), MIN_VISIBLE_TILES) : Math.max(Math.floor(width / tileWidth), MIN_VISIBLE_TILES);
  if (tracks.length > maxVisibleTiles) {
    const scrollBarWidth = getScrollBarWidth();
    maxVisibleTiles = carouselOrientation === "vertical" ? Math.max(Math.floor(height / (tileHeight - scrollBarWidth)), MIN_VISIBLE_TILES) : Math.max(Math.floor(width / (tileWidth - scrollBarWidth)), MIN_VISIBLE_TILES);
  }
  const sortedTiles = useVisualStableUpdate(tracks, maxVisibleTiles);
  React65.useLayoutEffect(() => {
    if (asideEl.current) {
      asideEl.current.dataset.lkOrientation = carouselOrientation;
      asideEl.current.style.setProperty("--lk-max-visible-tiles", maxVisibleTiles.toString());
    }
  }, [maxVisibleTiles, carouselOrientation]);
  return /* @__PURE__ */ React65.createElement("aside", __spreadValues({ key: carouselOrientation, className: "lk-carousel", ref: asideEl }, props), /* @__PURE__ */ React65.createElement(TrackLoop, { tracks: sortedTiles }, props.children));
}

// src/components/layout/LayoutContextProvider.tsx
import { log as log7 } from "@livekit/components-core";
import * as React66 from "react";
function LayoutContextProvider({
  value,
  onPinChange,
  onWidgetChange,
  children
}) {
  const layoutContextValue = useEnsureCreateLayoutContext(value);
  React66.useEffect(() => {
    log7.debug("PinState Updated", { state: layoutContextValue.pin.state });
    if (onPinChange && layoutContextValue.pin.state)
      onPinChange(layoutContextValue.pin.state);
  }, [layoutContextValue.pin.state, onPinChange]);
  React66.useEffect(() => {
    log7.debug("Chat Widget Updated", { widgetState: layoutContextValue.widget.state });
    if (onWidgetChange && layoutContextValue.widget.state) {
      onWidgetChange(layoutContextValue.widget.state);
    }
  }, [onWidgetChange, layoutContextValue.widget.state]);
  return /* @__PURE__ */ React66.createElement(LayoutContext.Provider, { value: layoutContextValue }, children);
}

// src/components/LiveKitRoom.tsx
import { log as log8, setupLiveKitRoom } from "@livekit/components-core";
import { ConnectionState as ConnectionState3, MediaDeviceFailure, Room, RoomEvent } from "livekit-client";
import * as React67 from "react";
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
    "simulateParticipants"
  ]);
  if (options && passedRoom) {
    log8.warn(
      "when using a manually created room, the options object will be ignored. set the desired options directly when creating the room instead."
    );
  }
  const [room, setRoom] = React67.useState();
  React67.useEffect(() => {
    setRoom(passedRoom != null ? passedRoom : new Room(options));
  }, [options, passedRoom]);
  const htmlProps = React67.useMemo(() => mergeProps2(rest, setupLiveKitRoom()), [rest]);
  React67.useEffect(() => {
    if (!room)
      return;
    const onSignalConnected = () => {
      const localP = room.localParticipant;
      try {
        log8.debug("trying to publish local tracks");
        localP.setMicrophoneEnabled(!!audio, typeof audio !== "boolean" ? audio : void 0);
        localP.setCameraEnabled(!!video, typeof video !== "boolean" ? video : void 0);
        localP.setScreenShareEnabled(!!screen, typeof screen !== "boolean" ? screen : void 0);
      } catch (e) {
        log8.warn(e);
        onError == null ? void 0 : onError(e);
      }
    };
    const onMediaDeviceError = (e) => {
      const mediaDeviceFailure = MediaDeviceFailure.getFailure(e);
      onMediaDeviceFailure == null ? void 0 : onMediaDeviceFailure(mediaDeviceFailure);
    };
    room.on(RoomEvent.SignalConnected, onSignalConnected);
    room.on(RoomEvent.MediaDevicesError, onMediaDeviceError);
    return () => {
      room.off(RoomEvent.SignalConnected, onSignalConnected);
      room.off(RoomEvent.MediaDevicesError, onMediaDeviceError);
    };
  }, [room, audio, video, screen, onError]);
  React67.useEffect(() => {
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
      log8.debug("no token yet");
      return;
    }
    if (!serverUrl) {
      log8.warn("no livekit url provided");
      onError == null ? void 0 : onError(Error("no livekit url provided"));
      return;
    }
    if (connect) {
      log8.debug("connecting");
      room.connect(serverUrl, token, connectOptions).catch((e) => {
        log8.warn(e);
        onError == null ? void 0 : onError(e);
      });
    } else {
      log8.debug("disconnecting because connect is false");
      room.disconnect();
    }
  }, [connect, token, connectOptions, room, onError, serverUrl, simulateParticipants]);
  React67.useEffect(() => {
    if (!room)
      return;
    const connectionStateChangeListener = (state) => {
      switch (state) {
        case ConnectionState3.Disconnected:
          if (onDisconnected)
            onDisconnected();
          break;
        case ConnectionState3.Connected:
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
  React67.useEffect(() => {
    if (!room)
      return;
    return () => {
      log8.info("disconnecting on onmount");
      room.disconnect();
    };
  }, [room]);
  return { room, htmlProps };
}
function LiveKitRoom(props) {
  const { room, htmlProps } = useLiveKitRoom(props);
  return /* @__PURE__ */ React67.createElement("div", __spreadValues({}, htmlProps), room && /* @__PURE__ */ React67.createElement(RoomContext.Provider, { value: room }, props.children));
}

// src/components/participant/AudioVisualizer.tsx
import { createAudioAnalyser, LocalAudioTrack, RemoteAudioTrack as RemoteAudioTrack2, Track as Track5 } from "livekit-client";
import * as React68 from "react";
function AudioVisualizer(_a) {
  var _b = _a, { participant } = _b, props = __objRest(_b, ["participant"]);
  const [volumeBars, setVolumeBars] = React68.useState([]);
  const svgWidth = 200;
  const svgHeight = 90;
  const barWidth = 6;
  const barSpacing = 4;
  const volMultiplier = 50;
  const barCount = 7;
  const { track } = useMediaTrack(Track5.Source.Microphone, participant);
  React68.useEffect(() => {
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
  return /* @__PURE__ */ React68.createElement(
    "svg",
    __spreadProps(__spreadValues({
      width: "100%",
      height: "100%",
      viewBox: `0 0 ${svgWidth} ${svgHeight}`
    }, props), {
      className: "lk-audio-visualizer"
    }),
    /* @__PURE__ */ React68.createElement("rect", { x: "0", y: "0", width: "100%", height: "100%" }),
    /* @__PURE__ */ React68.createElement(
      "g",
      {
        style: {
          transform: `translate(${(svgWidth - barCount * (barWidth + barSpacing)) / 2}px, 0)`
        }
      },
      volumeBars.map((vol, idx) => /* @__PURE__ */ React68.createElement(
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
import * as React69 from "react";
var ParticipantLoop = (_a) => {
  var _b = _a, { participants } = _b, props = __objRest(_b, ["participants"]);
  return /* @__PURE__ */ React69.createElement(React69.Fragment, null, participants.map((participant) => /* @__PURE__ */ React69.createElement(ParticipantContext.Provider, { value: participant, key: participant.identity }, cloneSingleChild(props.children))));
};

// src/components/RoomAudioRenderer.tsx
import { isLocal as isLocal2 } from "@livekit/components-core";
import { Track as Track6 } from "livekit-client";
import * as React70 from "react";
var RoomAudioRenderer = () => {
  const tracks = useTracks([Track6.Source.Microphone, Track6.Source.ScreenShareAudio], {
    updateOnlyOn: []
  }).filter((ref) => !isLocal2(ref.participant));
  return /* @__PURE__ */ React70.createElement("div", { style: { display: "none" } }, tracks.map((trackRef) => /* @__PURE__ */ React70.createElement(AudioTrack, __spreadValues({ key: trackRef.publication.trackSid }, trackRef))));
};

// src/components/RoomName.tsx
import { roomInfoObserver } from "@livekit/components-core";
import * as React71 from "react";
function useRoomInfo(options = {}) {
  const room = useEnsureRoom(options.room);
  const infoObserver = React71.useMemo(() => roomInfoObserver(room), [room]);
  const { name, metadata } = useObservableState(infoObserver, {
    name: room.name,
    metadata: room.metadata
  });
  return { name, metadata };
}
var RoomName = (_a) => {
  var _b = _a, {
    childrenPosition = "before",
    children
  } = _b, htmlAttributes = __objRest(_b, [
    "childrenPosition",
    "children"
  ]);
  const { name } = useRoomInfo();
  return /* @__PURE__ */ React71.createElement("span", __spreadValues({}, htmlAttributes), childrenPosition === "before" && children, name, childrenPosition === "after" && children);
};

// src/components/Toast.tsx
import { ConnectionState as ConnectionState4 } from "livekit-client";
import * as React72 from "react";
function Toast(props) {
  const htmlProps = React72.useMemo(() => mergeProps2(props, { className: "lk-toast" }), [props]);
  return /* @__PURE__ */ React72.createElement("div", __spreadValues({}, htmlProps), props.children);
}
function ConnectionStateToast(props) {
  const [notification, setNotification] = React72.useState(void 0);
  const state = useConnectionState(props.room);
  React72.useEffect(() => {
    switch (state) {
      case ConnectionState4.Reconnecting:
        setNotification(
          /* @__PURE__ */ React72.createElement(React72.Fragment, null, /* @__PURE__ */ React72.createElement(SpinnerIcon_default, { className: "lk-spinner" }), " Reconnecting")
        );
        break;
      case ConnectionState4.Connecting:
        setNotification(
          /* @__PURE__ */ React72.createElement(React72.Fragment, null, /* @__PURE__ */ React72.createElement(SpinnerIcon_default, { className: "lk-spinner" }), " Connecting")
        );
        break;
      case ConnectionState4.Disconnected:
        setNotification(/* @__PURE__ */ React72.createElement(React72.Fragment, null, "Disconnected"));
        break;
      default:
        setNotification(void 0);
        break;
    }
  }, [state]);
  return notification ? /* @__PURE__ */ React72.createElement(Toast, { className: "lk-toast-connection-state" }, notification) : /* @__PURE__ */ React72.createElement(React72.Fragment, null);
}

// src/components/participant/ParticipantAudioTile.tsx
import * as React73 from "react";
import { Track as Track7 } from "livekit-client";
var ParticipantAudioTile = (_a) => {
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
    source: Track7.Source.Microphone,
    publication,
    onParticipantClick
  });
  return /* @__PURE__ */ React73.createElement("div", __spreadValues({ style: { position: "relative" } }, elementProps), /* @__PURE__ */ React73.createElement(ParticipantContextIfNeeded, { participant: p }, children != null ? children : /* @__PURE__ */ React73.createElement(React73.Fragment, null, /* @__PURE__ */ React73.createElement(AudioTrack, { source: source != null ? source : Track7.Source.Microphone }), /* @__PURE__ */ React73.createElement(AudioVisualizer, null), /* @__PURE__ */ React73.createElement("div", { className: "lk-participant-metadata" }, /* @__PURE__ */ React73.createElement("div", { className: "lk-participant-metadata-item" }, /* @__PURE__ */ React73.createElement(TrackMutedIndicator, { source: Track7.Source.Microphone }), /* @__PURE__ */ React73.createElement(ParticipantName, null)), /* @__PURE__ */ React73.createElement(ConnectionQualityIndicator, { className: "lk-participant-metadata-item" })))));
};

// src/prefabs/Chat.tsx
import { setupChat } from "@livekit/components-core";
import * as React75 from "react";

// src/components/ChatEntry.tsx
import { tokenize, createDefaultGrammar } from "@livekit/components-core";
import * as React74 from "react";
function ChatEntry(_a) {
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
  var _a2, _b2, _c, _d;
  const formattedMessage = React74.useMemo(() => {
    return messageFormatter ? messageFormatter(entry.message) : entry.message;
  }, [entry.message, messageFormatter]);
  const time = new Date(entry.timestamp);
  const locale = navigator ? navigator.language : "en-US";
  return /* @__PURE__ */ React74.createElement(
    "li",
    __spreadValues({
      className: "lk-chat-entry",
      title: time.toLocaleTimeString(locale, { timeStyle: "full" }),
      "data-lk-message-origin": ((_a2 = entry.from) == null ? void 0 : _a2.isLocal) ? "local" : "remote"
    }, props),
    (!hideTimestamp || !hideName) && /* @__PURE__ */ React74.createElement("span", { className: "lk-meta-data" }, !hideName && /* @__PURE__ */ React74.createElement("strong", { className: "lk-participant-name" }, (_d = (_b2 = entry.from) == null ? void 0 : _b2.name) != null ? _d : (_c = entry.from) == null ? void 0 : _c.identity), !hideTimestamp && /* @__PURE__ */ React74.createElement("span", { className: "lk-timestamp" }, time.toLocaleTimeString(locale, { timeStyle: "short" }))),
    /* @__PURE__ */ React74.createElement("span", { className: "lk-message-body" }, formattedMessage)
  );
}
function formatChatMessageLinks(message) {
  return tokenize(message, createDefaultGrammar()).map((tok, i) => {
    if (typeof tok === `string`) {
      return tok;
    } else {
      const content = tok.content.toString();
      const href = tok.type === `url` ? /^http(s?):\/\//.test(content) ? content : `https://${content}` : `mailto:${content}`;
      return /* @__PURE__ */ React74.createElement("a", { className: "lk-chat-link", key: i, href, target: "_blank", rel: "noreferrer" }, content);
    }
  });
}

// src/prefabs/Chat.tsx
function useChat() {
  const room = useRoomContext();
  const [setup, setSetup] = React75.useState();
  const isSending = useObservableState(setup == null ? void 0 : setup.isSendingObservable, false);
  const chatMessages = useObservableState(setup == null ? void 0 : setup.messageObservable, []);
  React75.useEffect(() => {
    const setupChatReturn = setupChat(room);
    setSetup(setupChatReturn);
    return setupChatReturn.destroy;
  }, [room]);
  return { send: setup == null ? void 0 : setup.send, chatMessages, isSending };
}
function Chat(_a) {
  var _b = _a, { messageFormatter } = _b, props = __objRest(_b, ["messageFormatter"]);
  const inputRef = React75.useRef(null);
  const ulRef = React75.useRef(null);
  const { send, chatMessages, isSending } = useChat();
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
  React75.useEffect(() => {
    var _a2;
    if (ulRef) {
      (_a2 = ulRef.current) == null ? void 0 : _a2.scrollTo({ top: ulRef.current.scrollHeight });
    }
  }, [ulRef, chatMessages]);
  return /* @__PURE__ */ React75.createElement("div", __spreadProps(__spreadValues({}, props), { className: "lk-chat" }), /* @__PURE__ */ React75.createElement("ul", { className: "lk-list lk-chat-messages", ref: ulRef }, props.children ? chatMessages.map(
    (msg, idx) => cloneSingleChild(props.children, {
      entry: msg,
      key: idx,
      messageFormatter
    })
  ) : chatMessages.map((msg, idx, allMsg) => {
    const hideName = idx >= 1 && allMsg[idx - 1].from === msg.from;
    const hideTimestamp = idx >= 1 && msg.timestamp - allMsg[idx - 1].timestamp < 6e4;
    return /* @__PURE__ */ React75.createElement(
      ChatEntry,
      {
        key: idx,
        hideName,
        hideTimestamp: hideName === false ? false : hideTimestamp,
        entry: msg,
        messageFormatter
      }
    );
  })), /* @__PURE__ */ React75.createElement("form", { className: "lk-chat-form", onSubmit: handleSubmit }, /* @__PURE__ */ React75.createElement(
    "input",
    {
      className: "lk-form-control lk-chat-form-input",
      disabled: isSending,
      ref: inputRef,
      type: "text",
      placeholder: "Enter a message..."
    }
  ), /* @__PURE__ */ React75.createElement("button", { type: "submit", className: "lk-button lk-chat-form-button", disabled: isSending }, "Send")));
}

// src/prefabs/PreJoin.tsx
import { createLocalAudioTrack, createLocalVideoTrack, Track as Track8, VideoPresets } from "livekit-client";
import * as React77 from "react";

// src/prefabs/MediaDeviceMenu.tsx
import { computeMenuPosition, wasClickOutside } from "@livekit/components-core";
import * as React76 from "react";
import { log as log9 } from "@livekit/components-core";
var MediaDeviceMenu = (_a) => {
  var _b = _a, {
    kind,
    initialSelection,
    onActiveDeviceChange
  } = _b, props = __objRest(_b, [
    "kind",
    "initialSelection",
    "onActiveDeviceChange"
  ]);
  const [isOpen, setIsOpen] = React76.useState(false);
  const [devices, setDevices] = React76.useState([]);
  const [updateRequired, setUpdateRequired] = React76.useState(true);
  const handleActiveDeviceChange = (kind2, deviceId) => {
    log9.debug("handle device change");
    setIsOpen(false);
    onActiveDeviceChange == null ? void 0 : onActiveDeviceChange(kind2, deviceId);
  };
  const button = React76.useRef(null);
  const tooltip = React76.useRef(null);
  React76.useLayoutEffect(() => {
    if (button.current && tooltip.current && (devices || updateRequired)) {
      computeMenuPosition(button.current, tooltip.current).then(({ x, y }) => {
        if (tooltip.current) {
          Object.assign(tooltip.current.style, { left: `${x}px`, top: `${y}px` });
        }
      });
    }
    setUpdateRequired(false);
  }, [button, tooltip, devices, updateRequired]);
  const handleClickOutside = React76.useCallback(
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
  React76.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", () => setUpdateRequired(true));
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", () => setUpdateRequired(true));
    };
  }, [handleClickOutside, setUpdateRequired]);
  return /* @__PURE__ */ React76.createElement(React76.Fragment, null, /* @__PURE__ */ React76.createElement(
    "button",
    __spreadProps(__spreadValues({
      className: "lk-button lk-button-menu",
      "aria-pressed": isOpen
    }, props), {
      onClick: () => setIsOpen(!isOpen),
      ref: button
    }),
    props.children
  ), /* @__PURE__ */ React76.createElement(
    "div",
    {
      className: "lk-device-menu",
      ref: tooltip,
      style: { visibility: isOpen ? "visible" : "hidden" }
    },
    kind ? /* @__PURE__ */ React76.createElement(
      MediaDeviceSelect,
      {
        initialSelection,
        onActiveDeviceChange: (deviceId) => handleActiveDeviceChange(kind, deviceId),
        onDeviceListChange: setDevices,
        kind
      }
    ) : /* @__PURE__ */ React76.createElement(React76.Fragment, null, /* @__PURE__ */ React76.createElement("div", { className: "lk-device-menu-heading" }, "Audio inputs"), /* @__PURE__ */ React76.createElement(
      MediaDeviceSelect,
      {
        kind: "audioinput",
        onActiveDeviceChange: (deviceId) => handleActiveDeviceChange("audioinput", deviceId),
        onDeviceListChange: setDevices
      }
    ), /* @__PURE__ */ React76.createElement("div", { className: "lk-device-menu-heading" }, "Video inputs"), /* @__PURE__ */ React76.createElement(
      MediaDeviceSelect,
      {
        kind: "videoinput",
        onActiveDeviceChange: (deviceId) => handleActiveDeviceChange("videoinput", deviceId),
        onDeviceListChange: setDevices
      }
    ))
  ));
};

// src/prefabs/PreJoin.tsx
import { log as log10 } from "@livekit/components-core";
var DEFAULT_USER_CHOICES = {
  username: "",
  videoEnabled: true,
  audioEnabled: true,
  videoDeviceId: "",
  audioDeviceId: ""
};
function usePreviewDevice(enabled, deviceId, kind) {
  const [deviceError, setDeviceError] = React77.useState(null);
  const devices = useMediaDevices({ kind });
  const [selectedDevice, setSelectedDevice] = React77.useState(
    void 0
  );
  const [localTrack, setLocalTrack] = React77.useState();
  const [localDeviceId, setLocalDeviceId] = React77.useState(deviceId);
  React77.useEffect(() => {
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
    yield track.restartTrack({
      deviceId: id
    });
    prevDeviceId.current = id;
  });
  const prevDeviceId = React77.useRef(localDeviceId);
  React77.useEffect(() => {
    if (enabled && !localTrack && !deviceError) {
      log10.debug("creating track", kind);
      createTrack(localDeviceId, kind);
    }
  }, [enabled, localTrack, deviceError]);
  React77.useEffect(() => {
    if (!enabled) {
      if (localTrack) {
        log10.debug(`muting ${kind} track`);
        localTrack.mute().then(() => log10.debug(localTrack.mediaStreamTrack));
      }
      return;
    }
    if (localTrack && (selectedDevice == null ? void 0 : selectedDevice.deviceId) && prevDeviceId.current !== (selectedDevice == null ? void 0 : selectedDevice.deviceId)) {
      log10.debug(`switching ${kind} device from`, prevDeviceId.current, selectedDevice.deviceId);
      switchDevice(localTrack, selectedDevice.deviceId);
    } else {
      log10.debug(`unmuting local ${kind} track`);
      localTrack == null ? void 0 : localTrack.unmute();
    }
    return () => {
      if (localTrack) {
        log10.debug(`stopping local ${kind} track`);
        localTrack.stop();
        localTrack.mute();
      }
    };
  }, [localTrack, selectedDevice, enabled, kind]);
  React77.useEffect(() => {
    setSelectedDevice(devices.find((dev) => dev.deviceId === localDeviceId));
  }, [localDeviceId, devices]);
  return {
    selectedDevice,
    localTrack,
    deviceError
  };
}
var PreJoin = (_a) => {
  var _b = _a, {
    defaults = {},
    onValidate,
    onSubmit,
    onError,
    debug,
    joinLabel = "Join Room",
    micLabel = "Microphone",
    camLabel = "Camera",
    userLabel = "Username"
  } = _b, htmlProps = __objRest(_b, [
    "defaults",
    "onValidate",
    "onSubmit",
    "onError",
    "debug",
    "joinLabel",
    "micLabel",
    "camLabel",
    "userLabel"
  ]);
  var _a2, _b2, _c, _d, _e, _f, _g;
  const [userChoices, setUserChoices] = React77.useState(DEFAULT_USER_CHOICES);
  const [username, setUsername] = React77.useState(
    (_a2 = defaults.username) != null ? _a2 : DEFAULT_USER_CHOICES.username
  );
  const [videoEnabled, setVideoEnabled] = React77.useState(
    (_b2 = defaults.videoEnabled) != null ? _b2 : DEFAULT_USER_CHOICES.videoEnabled
  );
  const [videoDeviceId, setVideoDeviceId] = React77.useState(
    (_c = defaults.videoDeviceId) != null ? _c : DEFAULT_USER_CHOICES.videoDeviceId
  );
  const [audioEnabled, setAudioEnabled] = React77.useState(
    (_d = defaults.audioEnabled) != null ? _d : DEFAULT_USER_CHOICES.audioEnabled
  );
  const [audioDeviceId, setAudioDeviceId] = React77.useState(
    (_e = defaults.audioDeviceId) != null ? _e : DEFAULT_USER_CHOICES.audioDeviceId
  );
  const video = usePreviewDevice(videoEnabled, videoDeviceId, "videoinput");
  const videoEl = React77.useRef(null);
  React77.useEffect(() => {
    var _a3;
    if (videoEl.current)
      (_a3 = video.localTrack) == null ? void 0 : _a3.attach(videoEl.current);
    return () => {
      var _a4;
      (_a4 = video.localTrack) == null ? void 0 : _a4.detach();
    };
  }, [video.localTrack, videoEl]);
  const audio = usePreviewDevice(audioEnabled, audioDeviceId, "audioinput");
  const [isValid, setIsValid] = React77.useState();
  const handleValidation = React77.useCallback(
    (values) => {
      if (typeof onValidate === "function") {
        return onValidate(values);
      } else {
        return values.username !== "";
      }
    },
    [onValidate]
  );
  React77.useEffect(() => {
    if (audio.deviceError) {
      onError == null ? void 0 : onError(audio.deviceError);
    }
  }, [audio.deviceError, onError]);
  React77.useEffect(() => {
    if (video.deviceError) {
      onError == null ? void 0 : onError(video.deviceError);
    }
  }, [video.deviceError, onError]);
  React77.useEffect(() => {
    var _a3, _b3, _c2, _d2;
    const newUserChoices = {
      username,
      videoEnabled,
      videoDeviceId: (_b3 = (_a3 = video.selectedDevice) == null ? void 0 : _a3.deviceId) != null ? _b3 : "",
      audioEnabled,
      audioDeviceId: (_d2 = (_c2 = audio.selectedDevice) == null ? void 0 : _c2.deviceId) != null ? _d2 : ""
    };
    setUserChoices(newUserChoices);
    setIsValid(handleValidation(newUserChoices));
  }, [
    username,
    videoEnabled,
    video.selectedDevice,
    handleValidation,
    audioEnabled,
    audio.selectedDevice
  ]);
  function handleSubmit(event) {
    event.preventDefault();
    if (handleValidation(userChoices)) {
      if (typeof onSubmit === "function") {
        onSubmit(userChoices);
      }
    } else {
      log10.warn("Validation failed with: ", userChoices);
    }
  }
  return /* @__PURE__ */ React77.createElement("div", __spreadValues({ className: "lk-prejoin" }, htmlProps), /* @__PURE__ */ React77.createElement("div", { className: "lk-video-container" }, video.localTrack && /* @__PURE__ */ React77.createElement("video", { ref: videoEl, width: "1280", height: "720" }), (!video.localTrack || !videoEnabled) && /* @__PURE__ */ React77.createElement("div", { className: "lk-camera-off-note" }, /* @__PURE__ */ React77.createElement(ParticipantPlaceholder_default, null))), /* @__PURE__ */ React77.createElement("div", { className: "lk-button-group-container" }, /* @__PURE__ */ React77.createElement("div", { className: "lk-button-group audio" }, /* @__PURE__ */ React77.createElement(
    TrackToggle,
    {
      initialState: audioEnabled,
      source: Track8.Source.Microphone,
      onChange: (enabled) => setAudioEnabled(enabled)
    },
    micLabel
  ), /* @__PURE__ */ React77.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ React77.createElement(
    MediaDeviceMenu,
    {
      initialSelection: (_f = audio.selectedDevice) == null ? void 0 : _f.deviceId,
      kind: "audioinput",
      onActiveDeviceChange: (_, deviceId) => {
        log10.warn("active device chanaged", deviceId);
        setAudioDeviceId(deviceId);
      },
      disabled: !!!audio.selectedDevice
    }
  ))), /* @__PURE__ */ React77.createElement("div", { className: "lk-button-group video" }, /* @__PURE__ */ React77.createElement(
    TrackToggle,
    {
      initialState: videoEnabled,
      source: Track8.Source.Camera,
      onChange: (enabled) => setVideoEnabled(enabled)
    },
    camLabel
  ), /* @__PURE__ */ React77.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ React77.createElement(
    MediaDeviceMenu,
    {
      initialSelection: (_g = video.selectedDevice) == null ? void 0 : _g.deviceId,
      kind: "videoinput",
      onActiveDeviceChange: (_, deviceId) => {
        log10.warn("active device chanaged", deviceId);
        setVideoDeviceId(deviceId);
      },
      disabled: !!!video.selectedDevice
    }
  )))), /* @__PURE__ */ React77.createElement("form", { className: "lk-username-container" }, /* @__PURE__ */ React77.createElement(
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
  ), /* @__PURE__ */ React77.createElement(
    "button",
    {
      className: "lk-button lk-join-button",
      type: "submit",
      onClick: handleSubmit,
      disabled: !isValid
    },
    joinLabel
  )), debug && /* @__PURE__ */ React77.createElement(React77.Fragment, null, /* @__PURE__ */ React77.createElement("strong", null, "User Choices:"), /* @__PURE__ */ React77.createElement("ul", { className: "lk-list", style: { overflow: "hidden", maxWidth: "15rem" } }, /* @__PURE__ */ React77.createElement("li", null, "Username: ", `${userChoices.username}`), /* @__PURE__ */ React77.createElement("li", null, "Video Enabled: ", `${userChoices.videoEnabled}`), /* @__PURE__ */ React77.createElement("li", null, "Audio Enabled: ", `${userChoices.audioEnabled}`), /* @__PURE__ */ React77.createElement("li", null, "Video Device: ", `${userChoices.videoDeviceId}`), /* @__PURE__ */ React77.createElement("li", null, "Audio Device: ", `${userChoices.audioDeviceId}`))));
};

// src/prefabs/VideoConference.tsx
import * as React86 from "react";

// src/prefabs/ControlBar.tsx
import { Track as Track9 } from "livekit-client";
import * as React81 from "react";
import { isMobileBrowser } from "@livekit/components-core";

// src/components/controls/UserToggle.tsx
import * as React78 from "react";
import { setupUserToggle } from "@livekit/components-core";
function useToggleUserLink({ props }) {
  const { dispatch } = useLayoutContext().widget;
  const { className } = React78.useMemo(() => setupUserToggle(), []);
  const mergedProps = React78.useMemo(
    () => mergeProps2(props, {
      className,
      onClick: () => {
        if (dispatch)
          dispatch({ msg: "show_users" });
      }
    }),
    [props, className, dispatch]
  );
  return { mergedProps };
}
function UserToggle(props) {
  const { mergedProps } = useToggleUserLink({ props });
  return /* @__PURE__ */ React78.createElement("button", __spreadValues({}, mergedProps), props.children);
}

// src/assets/icons/InviteIcon.tsx
import * as React79 from "react";
var SvgInviteIcon = (props) => /* @__PURE__ */ React79.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 25, height: 20, fill: "none" }, props), /* @__PURE__ */ React79.createElement(
  "path",
  {
    d: "M20.33 3.66996C20.1408 3.48213 19.9035 3.35008 19.6442 3.28833C19.3849 3.22659 19.1135 3.23753 18.86 3.31996L4.23 8.19996C3.95867 8.28593 3.71891 8.45039 3.54099 8.67255C3.36307 8.89471 3.25498 9.16462 3.23037 9.44818C3.20576 9.73174 3.26573 10.0162 3.40271 10.2657C3.5397 10.5152 3.74754 10.7185 4 10.85L10.07 13.85L13.07 19.94C13.1906 20.1783 13.3751 20.3785 13.6029 20.518C13.8307 20.6575 14.0929 20.7309 14.36 20.73H14.46C14.7461 20.7089 15.0192 20.6023 15.2439 20.4239C15.4686 20.2456 15.6345 20.0038 15.72 19.73L20.67 5.13996C20.7584 4.88789 20.7734 4.6159 20.7132 4.35565C20.653 4.09541 20.5201 3.85762 20.33 3.66996ZM4.85 9.57996L17.62 5.31996L10.53 12.41L4.85 9.57996ZM14.43 19.15L11.59 13.47L18.68 6.37996L14.43 19.15Z",
    fill: "#ffffff"
  }
));
var InviteIcon_default = SvgInviteIcon;

// src/assets/icons/UsersIcon.tsx
import * as React80 from "react";
var SvgUserIcon = (props) => /* @__PURE__ */ React80.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 20, height: 20, fill: "none" }, props), /* @__PURE__ */ React80.createElement(
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
  const [isChatOpen, setIsChatOpen] = React81.useState(false);
  const [isShareLinkOpen, setIsShareLinkOpen] = React81.useState(false);
  const [isUserOpen, setIsUserOpen] = React81.useState(false);
  React81.useEffect(() => {
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
  const showIcon = React81.useMemo(
    () => variation === "minimal" || variation === "verbose",
    [variation]
  );
  const showText = React81.useMemo(
    () => variation === "textOnly" || variation === "verbose",
    [variation]
  );
  const isMobile = React81.useMemo(() => isMobileBrowser(), []);
  const [isScreenShareEnabled, setIsScreenShareEnabled] = React81.useState(false);
  const onScreenShareChange = (enabled) => {
    setIsScreenShareEnabled(enabled);
  };
  return /* @__PURE__ */ React81.createElement("div", __spreadValues({ className: "lk-control-bar" }, props), visibleControls.microphone && /* @__PURE__ */ React81.createElement("div", { className: "lk-button-group" }, /* @__PURE__ */ React81.createElement(TrackToggle, { source: Track9.Source.Microphone, showIcon }, showText && "Microphone"), /* @__PURE__ */ React81.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ React81.createElement(MediaDeviceMenu, { kind: "audioinput" }))), visibleControls.camera && /* @__PURE__ */ React81.createElement("div", { className: "lk-button-group" }, /* @__PURE__ */ React81.createElement(TrackToggle, { source: Track9.Source.Camera, showIcon }, showText && "Camera"), /* @__PURE__ */ React81.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ React81.createElement(MediaDeviceMenu, { kind: "videoinput" }))), visibleControls.screenShare && !isMobile && /* @__PURE__ */ React81.createElement(
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
  ), visibleControls.chat && /* @__PURE__ */ React81.createElement(ChatToggle, null, showIcon && /* @__PURE__ */ React81.createElement(ChatIcon_default, null), showText && "Chat"), visibleControls.sharelink && /* @__PURE__ */ React81.createElement(ShareLinkToggle, null, showIcon && /* @__PURE__ */ React81.createElement(InviteIcon_default, null), showText && "Invite"), visibleControls.users && /* @__PURE__ */ React81.createElement(UserToggle, null, showIcon && /* @__PURE__ */ React81.createElement(UsersIcon_default, null), showText && "Participants", waitingRoomCount !== 0 && /* @__PURE__ */ React81.createElement("span", { className: "waiting-count" }, waitingRoomCount)), visibleControls.leave && /* @__PURE__ */ React81.createElement(DisconnectButton, null, showIcon && /* @__PURE__ */ React81.createElement(LeaveIcon_default, null), showText && visibleControls.leaveButton), /* @__PURE__ */ React81.createElement(StartAudio, { label: "Start Audio" }));
}

// src/prefabs/VideoConference.tsx
import { isEqualTrackRef, isTrackReference as isTrackReference3, log as log11 } from "@livekit/components-core";

// src/prefabs/ShareLink.tsx
import * as React82 from "react";
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
  const inputRef = React82.useRef(null);
  const ulRef = React82.useRef(null);
  const { link } = useGetLink();
  const [users, setUsers] = React82.useState([]);
  const [searched, setSearched] = React82.useState([]);
  const [showToast, setShowToast] = React82.useState(false);
  const room = useGetRoom();
  function searchUsers(key) {
    return __async(this, null, function* () {
      if (key) {
        const filteredData = users.filter(function(item) {
          return item.user_name.startsWith(key);
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
  React82.useEffect(() => {
    if (room.name) {
      getUsers();
    }
  }, [room.name]);
  function handleSubmit(event) {
    return __async(this, null, function* () {
      event.preventDefault();
      if (inputRef.current && inputRef.current.value.trim() !== "") {
        searchUsers(inputRef.current.value);
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
  function handleCopy() {
    return __async(this, null, function* () {
      navigator.clipboard.writeText(link);
      setShowToast(true);
    });
  }
  React82.useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 3e3);
    }
  }, [showToast]);
  React82.useEffect(() => {
    var _a2;
    if (ulRef) {
      (_a2 = ulRef.current) == null ? void 0 : _a2.scrollTo({ top: ulRef.current.scrollHeight });
    }
  }, [ulRef, users]);
  return /* @__PURE__ */ React82.createElement("div", __spreadProps(__spreadValues({}, props), { className: "lk-chat lk-sharelink" }), /* @__PURE__ */ React82.createElement("form", { className: "lk-chat-form" }, /* @__PURE__ */ React82.createElement("input", { className: "lk-form-control lk-chat-form-input", type: "text", value: link, readOnly: true }), /* @__PURE__ */ React82.createElement("button", { type: "button", className: "lk-button lk-chat-form-button", onClick: handleCopy }, "Copy")), showToast ? /* @__PURE__ */ React82.createElement(Toast, { className: "lk-toast-connection-state" }, "Copied") : /* @__PURE__ */ React82.createElement(React82.Fragment, null), /* @__PURE__ */ React82.createElement("form", { className: "lk-chat-form", onSubmit: handleSubmit }, /* @__PURE__ */ React82.createElement(
    "input",
    {
      className: "lk-form-control lk-chat-form-input",
      ref: inputRef,
      type: "text",
      placeholder: "Search User...",
      onKeyUp: handleSubmit
    }
  )), searched.length > 0 ? /* @__PURE__ */ React82.createElement("ul", { className: "lk-list lk-chat-messages", ref: ulRef }, searched.map((user, index) => {
    return /* @__PURE__ */ React82.createElement("li", { key: index, className: "lk-chat-entry" }, /* @__PURE__ */ React82.createElement("div", null, /* @__PURE__ */ React82.createElement("span", { className: "lk-message-body" }, user.full_name, " ", user.ext_no ? ` - ${user.ext_no}` : ""), /* @__PURE__ */ React82.createElement("span", { className: "lk-message-body lk-message-text" }, user.designation)), /* @__PURE__ */ React82.createElement("button", { type: "button", onClick: () => handleInvite(user), className: "lk-button lk-chat-form-button" + (user.invited ? " invited" : "") }, user.invited ? "Invited" : "Invite"));
  })) : "");
}

// src/prefabs/Users.tsx
import * as React85 from "react";

// src/components/participant/ParticipantList.tsx
import * as React83 from "react";
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
  return /* @__PURE__ */ React83.createElement("div", __spreadValues({ style: { position: "relative" } }, elementProps), /* @__PURE__ */ React83.createElement(ParticipantContextIfNeeded, { participant: p }, children != null ? children : /* @__PURE__ */ React83.createElement(React83.Fragment, null, /* @__PURE__ */ React83.createElement("div", { className: "lk-participant-metadata" }, /* @__PURE__ */ React83.createElement("div", { className: "lk-participant-metadata-item" }, /* @__PURE__ */ React83.createElement(ParticipantName, null)), /* @__PURE__ */ React83.createElement(ConnectionQualityIndicator, { className: "lk-participant-metadata-item" })))));
};

// src/components/ToggleSwitch.tsx
import React84 from "react";
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
  return /* @__PURE__ */ React84.createElement("div", { className: "toggle-switch" + (small ? " small-switch" : "") }, /* @__PURE__ */ React84.createElement(
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
  ), id ? /* @__PURE__ */ React84.createElement(
    "label",
    {
      className: "toggle-switch-label",
      tabIndex: disabled ? -1 : 1,
      onKeyDown: (e) => handleKeyPress(e),
      htmlFor: id
    },
    /* @__PURE__ */ React84.createElement(
      "span",
      {
        className: disabled ? "toggle-switch-inner toggle-switch-disabled" : "toggle-switch-inner",
        "data-yes": optionLabels[0],
        "data-no": optionLabels[1],
        tabIndex: -1
      }
    ),
    /* @__PURE__ */ React84.createElement(
      "span",
      {
        className: disabled ? "toggle-switch-switch toggle-switch-disabled" : "toggle-switch-switch",
        tabIndex: -1
      }
    )
  ) : null);
};

// src/prefabs/Users.tsx
function Users(_a) {
  var _b = _a, { onWaitingRoomChange } = _b, props = __objRest(_b, ["onWaitingRoomChange"]);
  const ulRef = React85.useRef(null);
  const participants = useParticipants();
  const [waitingRoom, setWaitingRoom] = React85.useState([]);
  const [toggleWaiting, setToggleWaiting] = React85.useState(true);
  const room = useRoomContext();
  function usersList() {
    return __async(this, null, function* () {
      const postData = {
        method: "POST",
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
  React85.useEffect(() => {
    if (room.name) {
      usersList();
    }
  }, [room.name]);
  React85.useEffect(() => {
    const interval = setInterval(() => {
      usersList();
    }, 2e3);
    return () => clearInterval(interval);
  }, []);
  React85.useEffect(() => {
    onWaitingRoomChange(waitingRoom.length);
  }, [onWaitingRoomChange, waitingRoom]);
  React85.useEffect(() => {
    var _a2;
    if (ulRef) {
      (_a2 = ulRef.current) == null ? void 0 : _a2.scrollTo({ top: ulRef.current.scrollHeight });
    }
  }, [ulRef]);
  function admitUser(username, type) {
    return __async(this, null, function* () {
      const postData = {
        method: "POST",
        body: JSON.stringify({ room: room.name, username, type })
      };
      fetch(`/api/accept-request`, postData).then((res) => __async(this, null, function* () {
        if (res.status) {
          const remaining = waitingRoom.filter(
            (item) => item.username !== username
          );
          setWaitingRoom(remaining);
        } else {
          throw Error("Error fetching server url, check server logs");
        }
      }));
    });
  }
  const onToggleWaitingChange = (checked) => {
    const postData = {
      method: "POST",
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
  return /* @__PURE__ */ React85.createElement("div", __spreadProps(__spreadValues({}, props), { className: "lk-chat lk-users" }), /* @__PURE__ */ React85.createElement("div", { className: "lk-participants" }, /* @__PURE__ */ React85.createElement("h3", null, "Participants"), (participants == null ? void 0 : participants.length) ? /* @__PURE__ */ React85.createElement(ParticipantLoop, { participants }, /* @__PURE__ */ React85.createElement(ParticipantList, null)) : /* @__PURE__ */ React85.createElement("div", null, /* @__PURE__ */ React85.createElement("h5", null, "No Participants"))), /* @__PURE__ */ React85.createElement("div", { className: "lk-waitinroom" }, /* @__PURE__ */ React85.createElement("div", null, /* @__PURE__ */ React85.createElement("h3", null, "Waiting Room"), /* @__PURE__ */ React85.createElement("div", null, /* @__PURE__ */ React85.createElement(
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
  ))), waitingRoom.map((item) => /* @__PURE__ */ React85.createElement("div", { style: { position: "relative" }, key: item.username }, /* @__PURE__ */ React85.createElement("div", { className: "lk-participant-metadata" }, /* @__PURE__ */ React85.createElement("div", { className: "lk-pa rticipant-metadata-item" }, item.username), /* @__PURE__ */ React85.createElement("div", null, /* @__PURE__ */ React85.createElement(
    "button",
    {
      className: "lk-button lk-waiting-room lk-success",
      onClick: () => admitUser(item.username, "accepted")
    },
    "Approve"
  ), /* @__PURE__ */ React85.createElement(
    "button",
    {
      className: "lk-button lk-waiting-room lk-danger",
      onClick: () => admitUser(item.username, "rejected")
    },
    "Reject"
  )))))));
}

// src/prefabs/VideoConference.tsx
import { RoomEvent as RoomEvent2, Track as Track11 } from "livekit-client";
function VideoConference(_a) {
  var _b = _a, {
    showShareButton,
    showParticipantButton,
    leaveButton
  } = _b, props = __objRest(_b, [
    "showShareButton",
    "showParticipantButton",
    "leaveButton"
  ]);
  var _a2, _b2;
  const [widgetState, setWidgetState] = React86.useState({
    showChat: null
  });
  const [waiting, setWaiting] = React86.useState(null);
  const [waitingRoomCount, setWaitingRoomCount] = React86.useState(0);
  const tracks = useTracks(
    [
      { source: Track11.Source.Camera, withPlaceholder: true },
      { source: Track11.Source.ScreenShare, withPlaceholder: false }
    ],
    { updateOnlyOn: [RoomEvent2.ActiveSpeakersChanged] }
  );
  const widgetUpdate = (state) => {
    log11.debug("updating widget state", state);
    setWidgetState(state);
  };
  const updateCount = (count) => {
    log11.debug("count ", count);
    setWaitingRoomCount(count);
  };
  const setWaitingMessage = (message) => {
    if (showParticipantButton) {
      setWaiting(message);
    }
  };
  const layoutContext = useCreateLayoutContext();
  const screenShareTracks = tracks.filter(isTrackReference3).filter((track) => track.publication.source === Track11.Source.ScreenShare);
  const focusTrack = (_a2 = usePinnedTracks(layoutContext)) == null ? void 0 : _a2[0];
  const carouselTracks = tracks.filter((track) => !isEqualTrackRef(track, focusTrack));
  React86.useEffect(() => {
    if (waiting) {
      setTimeout(() => {
        setWaiting(null);
      }, 3e3);
    }
  }, [waiting]);
  React86.useEffect(() => {
    var _a3, _b3, _c, _d;
    if (screenShareTracks.length > 0 && focusTrack === void 0) {
      (_b3 = (_a3 = layoutContext.pin).dispatch) == null ? void 0 : _b3.call(_a3, { msg: "set_pin", trackReference: screenShareTracks[0] });
    } else if (screenShareTracks.length === 0 && (focusTrack == null ? void 0 : focusTrack.source) === Track11.Source.ScreenShare || tracks.length <= 1) {
      (_d = (_c = layoutContext.pin).dispatch) == null ? void 0 : _d.call(_c, { msg: "clear_pin" });
    }
  }, [
    JSON.stringify(screenShareTracks.map((ref) => ref.publication.trackSid)),
    tracks.length,
    (_b2 = focusTrack == null ? void 0 : focusTrack.publication) == null ? void 0 : _b2.trackSid
  ]);
  return /* @__PURE__ */ React86.createElement("div", __spreadValues({ className: "lk-video-conference" }, props), /* @__PURE__ */ React86.createElement(
    LayoutContextProvider,
    {
      value: layoutContext,
      onWidgetChange: widgetUpdate
    },
    /* @__PURE__ */ React86.createElement("div", { className: "lk-video-conference-inner" }, !focusTrack ? /* @__PURE__ */ React86.createElement("div", { className: "lk-grid-layout-wrapper" }, /* @__PURE__ */ React86.createElement(GridLayout, { tracks }, /* @__PURE__ */ React86.createElement(ParticipantTile, null))) : /* @__PURE__ */ React86.createElement("div", { className: "lk-focus-layout-wrapper" }, /* @__PURE__ */ React86.createElement(FocusLayoutContainer, null, /* @__PURE__ */ React86.createElement(CarouselLayout, { tracks: carouselTracks }, /* @__PURE__ */ React86.createElement(ParticipantTile, null)), focusTrack && /* @__PURE__ */ React86.createElement(FocusLayout, { track: focusTrack }))), /* @__PURE__ */ React86.createElement(
      ControlBar,
      {
        controls: {
          chat: false,
          sharelink: showShareButton,
          users: showParticipantButton,
          leaveButton
        },
        waitingRoomCount,
        screenShareTracks: screenShareTracks.length
      }
    )),
    /* @__PURE__ */ React86.createElement(ShareLink, { style: { display: widgetState.showChat == "show_invite" ? "flex" : "none" } }),
    /* @__PURE__ */ React86.createElement(
      Users,
      {
        style: { display: widgetState.showChat == "show_users" ? "flex" : "none" },
        onWaitingRoomChange: updateCount,
        setWaiting: setWaitingMessage
      }
    ),
    waiting ? /* @__PURE__ */ React86.createElement(Toast, { className: "lk-toast-connection-state" }, /* @__PURE__ */ React86.createElement(UserToggle, null, waiting)) : /* @__PURE__ */ React86.createElement(React86.Fragment, null)
  ), /* @__PURE__ */ React86.createElement(RoomAudioRenderer, null), /* @__PURE__ */ React86.createElement(ConnectionStateToast, null));
}

// src/prefabs/AudioConference.tsx
import * as React87 from "react";
function AudioConference(_a) {
  var props = __objRest(_a, []);
  const [widgetState, setWidgetState] = React87.useState({
    showChat: null
  });
  const participants = useParticipants();
  return /* @__PURE__ */ React87.createElement(LayoutContextProvider, { onWidgetChange: setWidgetState }, /* @__PURE__ */ React87.createElement("div", __spreadValues({ className: "lk-audio-conference" }, props), /* @__PURE__ */ React87.createElement("div", { className: "lk-audio-conference-stage" }, /* @__PURE__ */ React87.createElement(ParticipantLoop, { participants }, /* @__PURE__ */ React87.createElement(ParticipantAudioTile, null))), /* @__PURE__ */ React87.createElement(
    ControlBar,
    {
      controls: { microphone: true, screenShare: false, camera: false, chat: true },
      waitingRoomCount: 0
    }
  ), widgetState.showChat == "show_chat" && /* @__PURE__ */ React87.createElement(Chat, null)));
}
export {
  AudioConference,
  AudioTrack,
  AudioVisualizer,
  CarouselLayout as CarouselView,
  Chat,
  ChatEntry,
  ChatToggle,
  ClearPinButton,
  ConnectionQualityIndicator,
  ConnectionState,
  ConnectionStateToast,
  ControlBar,
  DisconnectButton,
  FocusLayout,
  FocusLayoutContainer,
  FocusToggle,
  GridLayout,
  LayoutContext,
  LayoutContextProvider,
  LiveKitRoom,
  MediaDeviceMenu,
  MediaDeviceSelect,
  ParticipantAudioTile,
  ParticipantContext,
  ParticipantContextIfNeeded,
  ParticipantLoop,
  ParticipantName,
  ParticipantTile,
  PreJoin,
  RoomAudioRenderer,
  RoomContext,
  RoomName,
  ShareLinkToggle,
  StartAudio,
  Toast,
  TrackContext,
  TrackLoop,
  TrackMutedIndicator,
  TrackToggle,
  VideoConference,
  VideoTrack,
  formatChatMessageLinks,
  useChat,
  useClearPinButton,
  useConnectionQualityIndicator,
  useConnectionState,
  useCreateLayoutContext,
  useDataChannel,
  useDisconnectButton,
  useEnsureCreateLayoutContext,
  useEnsureLayoutContext,
  useEnsureParticipant,
  useEnsureRoom,
  useEnsureTrackReference,
  useGridLayout,
  useIsMuted,
  useIsSpeaking,
  useLayoutContext,
  useLiveKitRoom,
  useLocalParticipant,
  useLocalParticipantPermissions,
  useMaybeLayoutContext,
  useMaybeParticipantContext,
  useMaybeRoomContext,
  useMaybeTrackContext,
  useMediaDeviceSelect,
  useMediaDevices,
  useMediaTrack,
  useMediaTrackByName,
  usePagination,
  useParticipantContext,
  useParticipantInfo,
  useParticipantPermissions,
  useParticipantTile,
  useParticipants,
  usePinnedTracks,
  useRemoteParticipant,
  useRemoteParticipants,
  useRoomContext,
  useRoomInfo,
  useSortedParticipants,
  useSpeakingParticipants,
  useSwipe,
  useToken,
  useTrackContext,
  useTrackMutedIndicator,
  useTrackToggle,
  useTracks,
  useVisualStableUpdate
};
//# sourceMappingURL=index.mjs.map