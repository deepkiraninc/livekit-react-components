import type { Room } from 'livekit-client';
import * as React from 'react';
/** @public */
export interface UseRoomInfoOptions {
    room?: Room;
}
/** @public */
export declare function useRoomInfo(options?: UseRoomInfoOptions): {
    name: string;
    metadata: string | undefined;
};
/** @public */
export interface RoomNameProps extends React.HTMLAttributes<HTMLSpanElement> {
    childrenPosition?: 'before' | 'after';
}
/**
 * The RoomName component renders the name of the connected LiveKit room inside a span tag.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <RoomName />
 * </LiveKitRoom>
 * ```
 * @public
 */
export declare const RoomName: ({ childrenPosition, children, ...htmlAttributes }: RoomNameProps) => React.JSX.Element;
//# sourceMappingURL=RoomName.d.ts.map