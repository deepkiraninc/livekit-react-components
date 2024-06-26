import * as React from 'react';
export declare function useGetLink(): {
    link: string;
};
export declare function useGetRoom(): import("livekit-client").Room;
export declare function getHostUrl(): string;
export type User = {
    user_id: string;
    user_name: string;
    full_name: string;
    designation: string;
    ext_no: string;
    invited: boolean;
};
export interface ShareLinkProps extends React.HTMLAttributes<HTMLDivElement> {
    isCallScreen: boolean;
}
/**
 * The Chat component adds a basis chat functionality to the LiveKit room. The messages are distributed to all participants
 * in the room. Only users who are in the room at the time of dispatch will receive the message.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <Chat />
 * </LiveKitRoom>
 * ```
 * @public
 */
export declare function ShareLink({ isCallScreen, ...props }: ShareLinkProps): React.JSX.Element;
//# sourceMappingURL=ShareLink.d.ts.map