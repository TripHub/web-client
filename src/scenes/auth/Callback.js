/**
 * Auth0 Callback.
 * Token details in the URL hash.
 */

import React from 'react'

import Auth from '../../utils/auth'

class Callback extends React.Component {
    componentDidMount () {
        const { location, history } = this.props
        const auth = new Auth()
        // check a hash exists
        if (!location.hash) {
            history.replace('/')
        }
        // parse URL hash and persist tokens
        auth.parseHash(window.location.hash)
            .then((hash) => {
                // expiryTime is now + expiry time
                const expiryTimeInMs = (hash.expiresIn * 1000) + Date.now()
                // persist details to client
                Auth.persist(hash.accessToken, expiryTimeInMs, hash.idToken)
                // check for `redirectTo` in state
                try {
                    // decode base64 and parse JSON
                    const decoded = JSON.parse(atob(hash.state))
                    const redirectTo = decoded.redirectTo
                    history.replace(redirectTo)
                } catch (error) {
                    // if no redirect or there was an error redirect to home
                    history.replace('/')
                }
            })
            .catch(console.error)
    }

    render () {
        return <div />
    }
}

export default Callback
