import { combineReducers } from 'redux'
import createReducer from 'atomic-reducer'

import { types } from './actions'

const invitations = createReducer({
    request: types.LIST_REQUEST,
    success: types.LIST_SUCCESS,
    failure: types.LIST_FAILURE,
    setOrder: types.LIST_SET_ORDER,
})

export default combineReducers({
    invitations,
})
