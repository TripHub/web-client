import { types } from './actions'

const initialState = {
    name: '',
    nickname: '',
    emailVerified: false,
    email: '',
    picture: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET:
            return action.payload
        default:
            return state
    }
}
