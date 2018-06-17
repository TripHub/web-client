import { combineReducers } from 'redux'
import createReducer from 'atomic-reducer'

import { types } from './actions'

const trips = createReducer({
    request: types.TRIPS_LIST_REQUEST,
    success: types.TRIPS_LIST_SUCCESS,
    failure: types.TRIPS_LIST_FAILURE,
    setOrder: types.TRIPS_SET_ORDER,
    setSelected: types.TRIPS_SET_SELECTED,
    setEntity: types.TRIPS_GET_SUCCESS,
})

const locations = createReducer({
    success: types.SET_LOCATIONS,
})

const members = createReducer({
    success: types.SET_MEMBERS,
})

export default combineReducers({
    trips,
    locations,
    members,
})
