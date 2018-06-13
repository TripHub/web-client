import React from 'react'
import { Provider } from 'react-redux'
import Routes from './routes'

import createStore from './store'

// import global styles
import './static/css/bootstrap.min.css'

// redux store
const store = createStore()

export default class App extends React.Component {
    componentDidMount () {
        // global app init methods...
    }

    render () {
        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        )
    }
}
