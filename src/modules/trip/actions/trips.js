import { normalize } from 'normalizr'

import api from '../../../utils/api'
import { NAME } from '../constants'
import { trip } from '../schema'
import { setLocations } from './locations'

export const types = {
    TRIPS_LIST_REQUEST: `${NAME}/TRIPS_LIST_REQUEST`,
    TRIPS_LIST_SUCCESS: `${NAME}/TRIPS_LIST_SUCCESS`,
    TRIPS_LIST_FAILURE: `${NAME}/TRIPS_LIST_FAILURE`,
    TRIPS_SET_ORDER: `${NAME}/TRIPS_LIST_SET_ORDER`,
    TRIPS_SET_SELECTED: `${NAME}/TRIPS_SET_SELECTED`,
    
    SET_MEMBERS: `${NAME}/SET_MEMBERS`,

    TRIPS_GET_REQUEST: `${NAME}/TRIPS_GET_REQUEST`,
    TRIPS_GET_SUCCESS: `${NAME}/TRIPS_GET_SUCCESS`,
    TRIPS_GET_FAILURE: `${NAME}/TRIPS_GET_FAILURE`,

    TRIPS_CREATE_REQUEST: `${NAME}/TRIPS_CREATE_REQUEST`,
    TRIPS_CREATE_SUCCESS: `${NAME}/TRIPS_CREATE_SUCCESS`,
    TRIPS_CREATE_FAILURE: `${NAME}/TRIPS_CREATE_FAILURE`,

    DELETE_REQUEST: `${NAME}/DELETE_REQUEST`,
    DELETE_SUCCESS: `${NAME}/DELETE_SUCCESS`,
    DELETE_FAILURE: `${NAME}/DELETE_FAILURE`,
}

const listRequest = () => ({ type: types.TRIPS_LIST_REQUEST })
const listSuccess = payload => ({ type: types.TRIPS_LIST_SUCCESS, payload })
const listFailure = payload => ({ type: types.TRIPS_LIST_FAILURE, payload, error: true })
const listSetOrder = payload => ({ type: types.TRIPS_SET_ORDER, payload })
const listSetMembers = payload => ({ type: types.SET_MEMBERS, payload })
const getRequest = () => ({ type: types.TRIPS_GET_REQUEST })
const getSuccess = payload => ({ type: types.TRIPS_GET_SUCCESS, payload })
const getFailure = payload => ({ type: types.TRIPS_GET_FAILURE, payload, error: true })
const createRequest = () => ({ type: types.TRIPS_CREATE_REQUEST })
const createSuccess = payload => ({ type: types.TRIPS_CREATE_SUCCESS, payload })
const createFailure = payload => ({ type: types.TRIPS_CREATE_FAILURE, payload, error: true })
const deleteRequest = () => ({ type: types.DELETE_REQUEST })
const deleteSuccess = payload => ({ type: types.DELETE_SUCCESS, payload })
const deleteFailure = payload => ({ type: types.DELETE_FAILURE, payload, error: true })

/**
 * Set the id of the currently selected/active trip.
 * This updates the response from selectors.
 */
export const setSelected = payload => ({
    type: types.TRIPS_SET_SELECTED,
    payload
})

/**
 * List user trips.
 */
export const list = () => dispatch => {
    dispatch(listRequest())
    return new Promise(async (resolve, reject) => {
        try {
            const res = await api().get('/trips')
            // normalise response data
            const normalized = normalize(res.data, [ trip ])
            // dispatch success and resolve promise
            dispatch(listSuccess(normalized.entities.trips))
            dispatch(listSetOrder(normalized.result))
            resolve(normalized)
        } catch (error) {
            // dispatch failure and reject promise
            dispatch(listFailure(error))
            reject(error)
        }
    })
}

/**
 * Get details for a single trip.
 * @param {number} id 
 */
export const get = id => dispatch => {
    dispatch(getRequest())
    return new Promise(async (resolve, reject) => {
        try {
            const res = await api().get(`/trips/${id}`)
            // normalise response
            const normalized = normalize(res.data, trip)
            // dispatch success and resolve promise
            dispatch(setLocations(normalized.entities.locations))
            dispatch(listSetMembers(normalized.entities.members))
            dispatch(getSuccess(normalized.entities.trips[normalized.result]))
            resolve(normalized)
        } catch (error) {
            // dispatch failure and reject promise
            dispatch(getFailure(error))
            reject(error)
        }
    })
}

/**
 * Create a new trip.
 * @param {object} data 
 */
export const create = (data) => (dispatch) => {
    dispatch(createRequest())
    return api().post('/trips', data)
        .then(res => res.data)
        .then(data => normalize(data, trip))
        .then(normalised => {
            dispatch(createSuccess(normalised))
            return normalised
        })
        .catch(err => dispatch(createFailure(err)))
}

export const remove = (id) => (dispatch) => {
    dispatch(deleteRequest())
    return api().delete(`/trips/${id}`)
        .then(res => res.data)
        .then(data => dispatch(deleteSuccess(data)))
        .catch(err => dispatch(deleteFailure(err)))
}
