import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

// styles
import './static/css/bootstrap.min.css'

// Auth
import Login from './scenes/auth/Login'
import Callback from './scenes/auth/Callback'
// Dashboard
import Dashboard from './scenes/Dashboard'

export default () => (
    <Router>
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/callback' component={Callback} />
            
            <Route exact path='/' component={Dashboard} />
        </Switch>
    </Router>
)
