import { combineReducers } from 'redux'

import trips from './trips'

export default combineReducers({
    [trips.constants.NAME]: trips.reducer,
})
