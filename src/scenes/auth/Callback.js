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
                // redirect to /
                history.replace('/')
            })
            .catch(error => console.error(error))
    }

    /**
     * Takes a hash and returns an object of the key/value pairs in the hash
     * @param {string} hash 
     */
    parseHash (hash) {
        // remove # at beginning of string
        const hashString = hash[0] === '#' ? hash.slice(1) : hash
        const parts = hashString.split('&')
        return parts.reduce((acc, part) => {
            // part is in format key=value
            const keyValue = part.split('=')
            // add to accumulator
            acc[keyValue[0]] = keyValue[1]
            return acc
        }, {})
    }

    render () {
        return <div />
    }
}

export default Callback
