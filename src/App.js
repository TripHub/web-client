import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import Dashboard from './scenes/Dashboard'

export default () => (
    <Router>
        <Switch>
            <Route exact path='/' component={Dashboard} />
        </Switch>
    </Router>
)
