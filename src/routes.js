import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

// Auth
import Login from './scenes/auth/login'
import Callback from './scenes/auth/callback'
// Dashboard
import Dashboard from './scenes/dashboard'

export default () => (
    <Router>
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/callback' component={Callback} />
            
            <Route exact path='/' component={Dashboard} />
        </Switch>
    </Router>
)
