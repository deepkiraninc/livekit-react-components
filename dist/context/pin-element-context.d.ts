import type { PinState, TrackReferenceOrPlaceholder } from '@livekit/components-core';
import type * as React from 'react';
/** @internal */
export type PinElementAction = {
    msg: 'set_pin';
    trackReference: TrackReferenceOrPlaceholder;
} | {
    msg: 'clear_pin';
};
/** @internal */
export type PinElementContextType = {
    dispatch?: React.Dispatch<PinElementAction>;
    state?: PinState;
};
/** @internal */
export declare function pinElementReducer(state: PinState, action: PinElementAction): PinState;
//# sourceMappingURL=pin-element-context.d.ts.map