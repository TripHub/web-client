/**
 * Redirects to the login page.
 * Login handled by Auth0
 */

import React from 'react'

import Auth from '../../utils/auth'

class Login extends React.Component {
    componentDidMount () {
        // redirect to login page     
        new Auth().login()
    }

    render () {
        return <div />
    }
}

export default Login
