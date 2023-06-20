import * as React from 'react';
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
export declare function ControlBar({ variation, controls, waitingRoomCount, screenShareTracks, ...props }: ControlBarProps): React.JSX.Element;
//# sourceMappingURL=ControlBar.d.ts.map