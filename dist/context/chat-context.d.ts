import type { WidgetState } from '@livekit/components-core';
import type * as React from 'react';
/** @internal */
export type ChatContextAction = {
    msg: 'show_chat';
} | {
    msg: 'show_invite';
} | {
    msg: 'show_users';
} | {
    msg: 'hide_chat';
} | {
    msg: 'toggle_chat';
} | {
    msg: 'unread_msg';
    count: number;
} | {
    msg: 'toggle_settings';
};
/** @internal */
export type WidgetContextType = {
    dispatch?: React.Dispatch<ChatContextAction>;
    state?: WidgetState;
};
/** @internal */
export declare function chatReducer(state: WidgetState, action: ChatContextAction): WidgetState;
//# sourceMappingURL=chat-context.d.ts.map