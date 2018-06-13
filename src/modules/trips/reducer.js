import { types } from './actions'

const initialState = {
    entities: {},
    order: [],
    selected: null,
    loading: false,
    error: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_REQUEST:
            return { ...state, loading: true }
        default:
            return state
    }
}
