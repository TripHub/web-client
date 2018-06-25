import React from 'react'

import Auth from '../../utils/auth'

class Logout extends React.Component {
    componentDidMount () {
        const { history } = this.props
        // remove tokens from client
        Auth.destroy()
        // redirect to home
        history.replace('/')
    }

    render () {
        return <div />
    }
}

export default Logout
