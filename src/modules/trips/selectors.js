import { createSelector } from 'reselect'

import { NAME } from './constants'

// module selector
const moduleSelector = state => state[NAME]

// entities selectors
export const tripsSelector = state => moduleSelector(state).trips
export const locationsSelector = state => moduleSelector(state).locations
export const membersSelector = state => moduleSelector(state).members

export const activeTripSelector = createSelector(
    tripsSelector,
    trips => trips.entities[trips.selected] || null
)
