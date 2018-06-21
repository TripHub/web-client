import { combineReducers } from 'redux'

import profile from './profile'
import trip from './trip'

export default combineReducers({
    [profile.constants.NAME]: profile.reducer,
    [trip.constants.NAME]: trip.reducer,
})
