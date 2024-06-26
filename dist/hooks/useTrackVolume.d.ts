import type { LocalAudioTrack, RemoteAudioTrack, AudioAnalyserOptions } from 'livekit-client';
import { type TrackReference, type TrackReferenceOrPlaceholder } from '@livekit/components-core';
/**
 * @alpha
 * Hook for tracking the volume of an audio track using the Web Audio API.
 */
export declare const useTrackVolume: (trackOrTrackReference?: LocalAudioTrack | RemoteAudioTrack | TrackReference, options?: AudioAnalyserOptions) => number;
/**
 * Interface for configuring options for the useMultibandTrackVolume hook.
 * @alpha
 */
export interface MultiBandTrackVolumeOptions {
    bands?: number;
    /**
     * cut off of frequency bins on the lower end
     * Note: this is not a frequency measure, but in relation to analyserOptions.fftSize,
     */
    loPass?: number;
    /**
     * cut off of frequency bins on the higher end
     * Note: this is not a frequency measure, but in relation to analyserOptions.fftSize,
     */
    hiPass?: number;
    /**
     * update should run every x ms
     */
    updateInterval?: number;
    analyserOptions?: AnalyserOptions;
}
/**
 * Hook for tracking the volume of an audio track across multiple frequency bands using the Web Audio API.
 * @alpha
 */
export declare const useMultibandTrackVolume: (trackOrTrackReference?: LocalAudioTrack | RemoteAudioTrack | TrackReferenceOrPlaceholder, options?: MultiBandTrackVolumeOptions) => number[];
//# sourceMappingURL=useTrackVolume.d.ts.map