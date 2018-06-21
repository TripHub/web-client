import { combineReducers } from 'redux'
import createReducer from 'atomic-reducer'

import { types as tripsTypes } from './actions/trips'
import { types as locationsTypes } from './actions/locations'

const trips = createReducer({
    request: tripsTypes.TRIPS_LIST_REQUEST,
    success: tripsTypes.TRIPS_LIST_SUCCESS,
    failure: tripsTypes.TRIPS_LIST_FAILURE,
    setOrder: tripsTypes.TRIPS_SET_ORDER,
    setSelected: tripsTypes.TRIPS_SET_SELECTED,
    setEntity: tripsTypes.TRIPS_GET_SUCCESS,
})

const locations = createReducer({
    success: locationsTypes.GET_LOCATIONS_SUCCESS,
})

const members = createReducer({
    success: tripsTypes.SET_MEMBERS,
})

export default combineReducers({
    trips,
    locations,
    members,
})
