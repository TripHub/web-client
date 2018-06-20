import React from 'react'

import Auth from '../utils/auth'

export function withAuth (Component) {
    return class extends React.Component {
        state = {
            isAuthenticated: false
        }

        componentDidMount () {
            this.setState({
                isAuthenticated: Auth.isAuthenticated
            }, this.redirectIfNeeded)
        }

        redirectIfNeeded () {
            console.log(this.props)
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
