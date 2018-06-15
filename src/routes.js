import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

// Auth
import Login from './scenes/auth/login'
import Logout from './scenes/auth/logout'
import Callback from './scenes/auth/callback'
// Global
import Home from './scenes/home'
import Create from './scenes/create'
// Dashboard
import Settings from './scenes/dashboard/settings'
import Overview from './scenes/dashboard/overview'
import Location from './scenes/dashboard/location'

export default () => (
    <Router>
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
            <Route path='/callback' component={Callback} />
            
            <Route exact path='/' component={Home} />
            <Route path='/create' component={Create} />
            <Route path='/:id/settings' component={Settings} />
            <Route path='/:id/:location' component={Location} />
            <Route path='/:id' component={Overview} />
        </Switch>
    </Router>
)
