import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Auth from '../../utils/auth'
import invitation from '../../modules/invitation'
import JoinForm from '../../modules/trip/components/joinForm'

class JoinTrip extends React.Component {
    componentDidMount () {
        // ...
    }

    render () {
        const { location } = this.props

        if (!Auth.isAuthenticated) {
            return (
                <div className='container'>
                    <JoinForm location={location} />
                </div>
            )
        }

        return <div>Joining...</div>
    }
}

const mapStateToProps = ({ profile }) => ({ profile })

const mapDisaptchToProps = dispatch => ({
    invitations: bindActionCreators(invitation.actions, dispatch)
})

export default connect(mapStateToProps)(JoinTrip)
