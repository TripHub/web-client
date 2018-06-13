import { createStore, applyMiddleware } from 'redux'
import rootReducer from './modules/rootReducer'
import thunk from 'redux-thunk'

export default (initialState) => {
  const middleware = [thunk]
  // Add redux-logger if we're in development.
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(require('redux-logger').default)
  }

  return createStore(rootReducer, initialState, applyMiddleware(...middleware))
}
