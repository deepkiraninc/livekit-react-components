import type { MessageDecoder, MessageEncoder } from '@livekit/components-core';
import * as React from 'react';
import type { MessageFormatter } from '../components';
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
export declare function VideoConference({ chatMessageFormatter, chatMessageDecoder, chatMessageEncoder, SettingsComponent, showChatButton, showShareLink, showParticipant, isCallScreen, showExtraSettingMenu, ...props }: VideoConferenceProps): React.JSX.Element;
//# sourceMappingURL=VideoConference.d.ts.map