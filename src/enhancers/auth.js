import React from 'react'

import Auth from '../utils/auth'

export function withAuth (Component) {
    return class extends React.Component {
        state = {
            isAuthenticated: false
        }

        componentDidMount () {
            const secondsToGo = (Auth.expiryTime - Date.now()) / 1000
            console.log(`${secondsToGo.toFixed(0)}s until expiry`)
            
            this.setState({
                isAuthenticated: Auth.isAuthenticated
            }, this.redirectIfNeeded)
        }

        redirectIfNeeded () {
            const { history, location } = this.props
            if (!this.state.isAuthenticated) {
                const loginUrl = {
                    pathname: '/login',
                    search: `?redirect_to=${location.pathname}`
                }
                history.push(loginUrl)
            }
        }

        render () {
            return this.state.isAuthenticated
                ? <Component {...this.props} />
                : <div>Redirecting to login...</div>
        }
    }
}
