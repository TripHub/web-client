import React from 'react'
import { Provider } from 'react-redux'

import Routes from './routes'
import createStore from './store'
import OnLoad from './onLoad'

// import global styles
import './static/css/bootstrap.min.css'

// redux store
const store = createStore()

const App = () => {
    return (
        <Provider store={store}>
            <React.Fragment>
                <OnLoad />
                <Routes />
            </React.Fragment>
        </Provider>
    )
}
export default App
