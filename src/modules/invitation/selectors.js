import { createSelector } from 'reselect'

import { tripsSelector } from '../trip/selectors'
import { NAME } from './constants'

// module selector
const moduleSelector = state => state[NAME]

// entities selectors
export const invitationsSelector = state => moduleSelector(state).invitations

/**
 * Return all invitations for the current trip.
 */
export const activeTripInvitationsSelector = createSelector(
    [invitationsSelector, tripsSelector],
    (invitation, trips) => {
      return invitation.order
        .map(id => invitation.entities[id])
        .filter(i => i.trip_id === trips.selected)
    }
)
