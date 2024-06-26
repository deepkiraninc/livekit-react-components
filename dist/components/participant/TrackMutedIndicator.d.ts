import * as React from 'react';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';
/** @public */
export interface TrackMutedIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
    trackRef: TrackReferenceOrPlaceholder;
    show?: 'always' | 'muted' | 'unmuted';
}
/**
 * The `TrackMutedIndicator` shows whether the participant's camera or microphone is muted or not.
 * By default, a muted/unmuted icon is displayed for a camera, microphone, and screen sharing track.
 *
 * @example
 * ```tsx
 * <TrackMutedIndicator trackRef={trackRef} />
 * ```
 * @public
 */
export declare const TrackMutedIndicator: React.ForwardRefExoticComponent<TrackMutedIndicatorProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TrackMutedIndicator.d.ts.map