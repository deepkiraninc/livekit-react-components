import * as React from 'react';
/** @public */
export interface HostEndMeetingMenuProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    leave?: string;
    leaveButton?: string;
    endForAll?: string;
    showIcon?: boolean;
    showText?: boolean;
}
/**
 * The MediaDeviceMenu prefab component is a button that opens a menu that lists
 * all media devices and allows the user to select them.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <HostEndMeetingMenu />
 * </LiveKitRoom>
 * ```
 * @public
 */
export declare function HostEndMeetingMenu({ leave, leaveButton, endForAll, showIcon, showText, ...props }: any): React.JSX.Element;
//# sourceMappingURL=HostEndMeetingMenu.d.ts.map