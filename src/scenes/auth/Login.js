/**
 * Redirects to the login page.
 * Login handled by Auth0
 */

import React from 'react'
import querystring from 'querystring'

import Auth from '../../utils/auth'

class Login extends React.Component {
    componentDidMount () {
        const { location } = this.props
        // check for return_to in query
        const qs = querystring.parse(location.search.slice(1))
        // encode state values
        const state = btoa(JSON.stringify({
            redirectTo: qs.redirect_to
        }))
        // redirect to login page
        new Auth().login({ state })
    }

    render () {
        return <div />
    }
}

export default Login
