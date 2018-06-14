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
        case types.LIST_SUCCESS:
            return {
                ...state,
                order: action.payload.result,
                entities: action.payload.entities.trips,
                loading: false
            }
        
        case types.CREATE_REQUEST:
            return { ...state, loading: true }
        case types.CREATE_SUCCESS:
            return { ...state, loading: false }
        
        default:
            return state
    }
}
