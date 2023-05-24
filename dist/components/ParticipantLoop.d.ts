import type { Participant } from 'livekit-client';
import * as React from 'react';
/** @public */
export type ParticipantLoopProps = {
    /** The participants to loop over. If not provided, the participants from the current room context are used. */
    participants: Participant[];
    /** The template component to be used in the loop. */
    children: React.ReactNode;
};
/**
 * The ParticipantLoop component loops over an array of participants to create a context for every participant.
 * This component takes exactly one child component as a template.
 * By providing your own template as a child you have full control over the look and feel of your participant representations.
 *
 * @remarks
 * If you want to loop over individual tracks instead of participants, you can use the `TrackLoop` component.
 *
 * @example
 * ```tsx
 * const participants = useParticipants();
 * <ParticipantLoop participants={participants}>
 *   <ParticipantName />
 * <ParticipantLoop />
 * ```
 * @public
 */
export declare const ParticipantLoop: ({ participants, ...props }: ParticipantLoopProps) => React.JSX.Element;
//# sourceMappingURL=ParticipantLoop.d.ts.map