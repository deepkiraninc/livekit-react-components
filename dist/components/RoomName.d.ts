import * as React from 'react';
/** @public */
export interface RoomNameProps extends React.HTMLAttributes<HTMLSpanElement> {
    childrenPosition?: 'before' | 'after';
}
/**
 * The `RoomName` component renders the name of the connected LiveKit room inside a span tag.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <RoomName />
 * </LiveKitRoom>
 * ```
 * @public
 */
export declare const RoomName: (props: RoomNameProps & React.RefAttributes<HTMLSpanElement>) => React.ReactElement<any, string | React.JSXElementConstructor<any>> | null;
//# sourceMappingURL=RoomName.d.ts.map