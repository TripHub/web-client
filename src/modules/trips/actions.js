import { normalize } from 'normalizr'

import api from '../../utils/api'
import { NAME } from './constants'
import { trip } from './schema'

export const types = {
    LIST_REQUEST: `${NAME}/LIST_REQUEST`,
    LIST_SUCCESS: `${NAME}/LIST_SUCCESS`,
    LIST_FAILURE: `${NAME}/LIST_FAILURE`,
    CREATE_REQUEST: `${NAME}/CREATE_REQUEST`,
    CREATE_SUCCESS: `${NAME}/CREATE_SUCCESS`,
    CREATE_FAILURE: `${NAME}/CREATE_FAILURE`,
}

const listRequest = () => ({ type: types.LIST_REQUEST })
const listSuccess = payload => ({ type: types.LIST_SUCCESS, payload })
const listFailure = payload => ({ type: types.LIST_FAILURE, payload, error: true })
const createRequest = () => ({ type: types.CREATE_REQUEST })
const createSuccess = payload => ({ type: types.CREATE_SUCCESS, payload })
const createFailure = payload => ({ type: types.CREATE_FAILURE, payload, error: true })

export const list = () => async dispatch => {
    dispatch(listRequest())
    return new Promise(async (resolve, reject) => {
        try {
            const res = await api().get('/trips')
            const normalized = normalize(res.data, [ trip ])
            resolve(normalized)
            dispatch(listSuccess(normalized))
        } catch (error) {
            dispatch(listFailure(error))
            reject(error)
        }
    })
}

export const create = (data) => (dispatch) => {
    dispatch(createRequest())
    return new Promise(async (resolve, reject) => {
        try {
            const res = await api().post('/trips', data)
            dispatch(createSuccess())
            resolve(res.data)
        } catch (error) {
            dispatch(createFailure(error))
            reject(error)
        }
    })

}
