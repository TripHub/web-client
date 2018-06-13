/**
 * Redirects to the login page.
 * Login handled by Auth0
 */

import React from 'react'

class Login extends React.Component {
    componentDidMount () {
        const loginRedirectUrl = process.env.REACT_APP_AUTH_LOGIN_URL
        const { history } = this.props
        history.replace(loginRedirectUrl)
    }

    render () {
        <div />
    }
}

export default Login
