import { combineReducers } from 'redux'

import profile from './profile'
import trips from './trips'

export default combineReducers({
    [profile.constants.NAME]: profile.reducer,
    [trips.constants.NAME]: trips.reducer,
})
