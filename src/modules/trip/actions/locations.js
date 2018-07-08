// import { normalize } from 'normalizr'

import api from '../../../utils/api'
import { NAME } from '../constants'

export const types = {
    GET_LOCATIONS_SUCCESS: `${NAME}/GET_LOCATIONS_SUCCESS`,

    LOCATIONS_CREATE_REQUEST: `${NAME}/LOCATIONS_CREATE_REQUEST`,
    LOCATIONS_CREATE_SUCCESS: `${NAME}/LOCATIONS_CREATE_SUCCESS`,
    LOCATIONS_CREATE_FAILURE: `${NAME}/LOCATIONS_CREATE_FAILURE`,

    LOCATIONS_LIST_REQUEST: `${NAME}/LOCATIONS_LIST_REQUEST`,
    LOCATIONS_LIST_SUCCESS: `${NAME}/LOCATIONS_LIST_SUCCESS`,
    LOCATIONS_LIST_FAILURE: `${NAME}/LOCATIONS_LIST_FAILURE`,
}

export const setLocations = payload => ({ type: types.GET_LOCATIONS_SUCCESS, payload })

const locationCreateRequest = () => ({ type: types.LOCATIONS_CREATE_REQUEST })
const locationCreateSuccess = payload => ({ type: types.LOCATIONS_CREATE_SUCCESS, payload })
const locationCreateFailure = payload => ({ type: types.LOCATIONS_CREATE_FAILURE, payload, error: true })
const locationListRequest = () => ({ type: types.LOCATIONS_LIST_REQUEST })
const locationListSuccess = payload => ({ type: types.LOCATIONS_LIST_SUCCESS, payload })
const locationListFailure = payload => ({ type: types.LOCATIONS_LIST_FAILURE, payload, error: true })

/**
 * Get a list of all locations for a specific trip.
 */
export const list = (tripId) => (dispatch) => {
    dispatch(locationListRequest())
    return api().get(`/trips/${tripId}/locations`)
        .then(res => dispatch(locationListSuccess(res.data)))
        .catch(err => dispatch(locationListFailure(err)))
}

/**
 * Creates a location for a specific trip.
 * @param {number} tripId id of trip to create location for
 * @param {object} data object containing location data
 */
export const create = (tripId, data) => (dispatch) => {
    dispatch(locationCreateRequest())
    return api().post(`/trips/${tripId}/locations`, data)
        .then(res => dispatch(locationCreateSuccess(res.data)))
        .catch(err => dispatch(locationCreateFailure(err)))
}
