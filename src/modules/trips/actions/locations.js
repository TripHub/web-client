import { normalize } from 'normalizr'

import api from '../../../utils/api'
import { NAME } from '../constants'
import { trip } from '../schema'

export const types = {
    GET_LOCATIONS_SUCCESS: `${NAME}/GET_LOCATIONS_SUCCESS`,

    LOCATIONS_CREATE_REQUEST: `${NAME}/LOCATIONS_CREATE_REQUEST`,
    LOCATIONS_CREATE_SUCCESS: `${NAME}/LOCATIONS_CREATE_SUCCESS`,
    LOCATIONS_CREATE_FAILURE: `${NAME}/LOCATIONS_CREATE_FAILURE`,
}

export const setLocations = payload => ({ type: types.GET_LOCATIONS_SUCCESS, payload })

const locationCreateRequest = () => ({ type: types.LOCATIONS_CREATE_REQUEST })
const locationCreateSuccess = payload => ({ type: types.LOCATIONS_CREATE_SUCCESS, payload })
const locationCreateFailure = payload => ({ type: types.LOCATIONS_CREATE_FAILURE, payload, error: true })

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
