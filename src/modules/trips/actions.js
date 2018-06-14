import { normalize } from 'normalizr'

import api from '../../utils/api'
import { NAME } from './constants'
import { trip } from './schema'

export const types = {
    LIST_REQUEST: `${NAME}/LIST_REQUEST`,
    LIST_SUCCESS: `${NAME}/LIST_SUCCESS`,
    LIST_FAILURE: `${NAME}/LIST_FAILURE`,
    GET_REQUEST: `${NAME}/GET_REQUEST`,
    GET_SUCCESS: `${NAME}/GET_SUCCESS`,
    GET_FAILURE: `${NAME}/GET_FAILURE`,
    CREATE_REQUEST: `${NAME}/CREATE_REQUEST`,
    CREATE_SUCCESS: `${NAME}/CREATE_SUCCESS`,
    CREATE_FAILURE: `${NAME}/CREATE_FAILURE`,
}

const listRequest = () => ({ type: types.LIST_REQUEST })
const listSuccess = payload => ({ type: types.LIST_SUCCESS, payload })
const listFailure = payload => ({ type: types.LIST_FAILURE, payload, error: true })
const getRequest = () => ({ type: types.GET_REQUEST })
const getSuccess = payload => ({ type: types.GET_SUCCESS, payload })
const getFailure = payload => ({ type: types.GET_FAILURE, payload, error: true })
const createRequest = () => ({ type: types.CREATE_REQUEST })
const createSuccess = payload => ({ type: types.CREATE_SUCCESS, payload })
const createFailure = payload => ({ type: types.CREATE_FAILURE, payload, error: true })

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
            dispatch(listSuccess(normalized))
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
            // dispatch success and resolve promise
            dispatch(getSuccess(res.data))
            resolve(res.data)
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
    return new Promise(async (resolve, reject) => {
        try {
            const res = await api().post('/trips', data)
            // dispatch success and resolve promise
            dispatch(createSuccess(res.data))
            resolve(res.data)
        } catch (error) {
            // dispatch failure and reject promise
            dispatch(createFailure(error))
            reject(error)
        }
    })

}
