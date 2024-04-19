import * as React from 'react';
import { type TrackReference } from '@livekit/components-core';
/** @public */
export interface AudioVisualizerProps extends React.HTMLAttributes<SVGElement> {
    trackRef?: TrackReference;
}
/**
 * The AudioVisualizer component is used to visualize the audio volume of a given audio track.
 * @remarks
 * Requires a `TrackReferenceOrPlaceholder` to be provided either as a property or via the `TrackRefContext`.
 * @example
 * ```tsx
 * <AudioVisualizer />
 * ```
 * @public
 */
export declare const AudioVisualizer: (props: AudioVisualizerProps & React.RefAttributes<SVGSVGElement>) => React.ReactElement<any, string | React.JSXElementConstructor<any>> | null;
//# sourceMappingURL=AudioVisualizer.d.ts.map