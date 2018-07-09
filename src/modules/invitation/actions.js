import { normalize } from 'normalizr'

import api from '../../utils/api'
import { NAME } from './constants'
import { invitation } from './schema'

export const types = {
    GET_SUCCESS: `${NAME}/GET_SUCCESS`,
    LIST_REQUEST: `${NAME}/LIST_REQUEST`,
    LIST_SUCCESS: `${NAME}/LIST_SUCCESS`,
    LIST_FAILURE: `${NAME}/LIST_FAILURE`,
    LIST_SET_ORDER: `${NAME}/LIST_SET_ORDER`,
    CREATE_REQUEST: `${NAME}/CREATE_REQUEST`,
    CREATE_SUCCESS: `${NAME}/CREATE_SUCCESS`,
    CREATE_FAILURE: `${NAME}/CREATE_FAILURE`,
    ACCEPT_SUCCESS: `${NAME}/ACCEPT_SUCCESS`,
}

const getSuccess = (payload) => ({ type: types.GET_SUCCESS, payload })
const listRequest = () => ({ type: types.LIST_REQUEST })
const listSuccess = payload => ({ type: types.LIST_SUCCESS, payload })
const listSetOrder = payload => ({ type: types.LIST_SET_ORDER, payload })
const listFailure = payload => ({ type: types.LIST_FAILURE, payload, error: true })
const createRequest = () => ({ type: types.CREATE_REQUEST })
const createSuccess = payload => ({ type: types.CREATE_SUCCESS, payload })
const createFailure = payload => ({ type: types.CREATE_FAILURE, payload, error: true })
const acceptSuccess = payload => ({ type: types.ACCEPT_SUCCESS, payload })

export const get = (invitationId) => (dispatch) => {
    return api().get(`/invitations/${invitationId}`)
        .then(res => res.data)
        .then(data => normalize(data, invitation))
        .then(data => dispatch(getSuccess(data.entities.invitations[data.result])))
}

export const accept = (invitationId) => (dispatch) => {
    return api().post(`/invitations/${invitationId}`, {
        action: 'accept'
    })
        .then(() => dispatch(acceptSuccess()))
}

export const list = (tripId) => (dispatch) => {
    dispatch(listRequest)
    return api().get(`/trips/${tripId}/invitations`)
        .then(res => res.data)
        .then(data => normalize(data, [ invitation ]))
        .then(({ result, entities }) => {
            dispatch(listSuccess(entities.invitations))
            dispatch(listSetOrder(result))
        })

        .catch(err => dispatch(listFailure(err)))
}

export const create = (tripId) => (dispatch) => {
    dispatch(createRequest())
    return api().post(`/trips/${tripId}/invitations`, {
        role: 'member'
    })
        .then(res => dispatch(createSuccess(res.data)))
        .catch(err => dispatch(createFailure(err)))
}
