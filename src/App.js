import React from 'react'
import { Provider } from 'react-redux'
import Helmet from 'react-helmet'

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
                <Helmet>
                    <link
                        href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.css'
                        rel='stylesheet'
                    />
                </Helmet>
                <OnLoad />
                <Routes />
            </React.Fragment>
        </Provider>
    )
}
export default App
