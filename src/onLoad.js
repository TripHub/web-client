import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Auth from './utils/auth'
import profile from './modules/profile'

/**
 * Defines actions to run on app first load.
 */
class OnLoad extends React.Component {
    componentDidMount () {
        const profile = Auth.decodedIdToken
        this.props.actions.profile.set(profile)
    }

    render () {
        return null
    }
}

const mapDispatchToProps = dispatch => ({
    actions: {
        profile: bindActionCreators(profile.actions, dispatch)
    }
})

export default connect(null, mapDispatchToProps)(OnLoad)
