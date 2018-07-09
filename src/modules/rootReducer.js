import { combineReducers } from 'redux'

import profile from './profile'
import trip from './trip'
import invitation from './invitation'

export default combineReducers({
    [profile.constants.NAME]: profile.reducer,
    [trip.constants.NAME]: trip.reducer,
    [invitation.constants.NAME]: invitation.reducer,
})
