import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

// Errors
import { NotFound } from './modules/core/error'
// Auth
import Login from './scenes/auth/login'
import Logout from './scenes/auth/logout'
import Callback from './scenes/auth/callback'
// Magic links
import JoinTrip from './scenes/magicLinks/joinTrip'
// Global
import Home from './scenes/home'
import CreateTrip from './scenes/trip/create'
// Trip
import Settings from './scenes/trip/settings'
import TripOverview from './scenes/trip/overview'
import LocationOverview from './scenes/location/overview'
import CreateLocation from './scenes/location/create'

export default () => (
    <Router>
        <Switch>
            {/* Auth Scenes */}
            <Route exact path='/login' component={Login} />
            <Route exact path='/logout' component={Logout} />
            <Route exact path='/callback' component={Callback} />
            {/* Magic Links */}
            <Route exact path='/ml/join' component={JoinTrip} />
            {/* Global Scenes */}
            <Route exact path='/' component={Home} />
            <Route exact path='/create' component={CreateTrip} />
            {/* Trip Scenes */}
            <Route path='/:id/settings' component={Settings} />
            <Route path='/:id/:location/new' component={CreateLocation} />
            <Route path='/:id/:location' component={LocationOverview} />
            <Route exact path='/:id' component={TripOverview} />
            {/* Fallback */}
            <Route component={NotFound} />
        </Switch>
    </Router>
)
