import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Auth from '../../utils/auth'
import invitation from '../../modules/invitation'
import JoinForm from '../../modules/invitation/components/joinForm'

class JoinTrip extends React.Component {
    componentDidMount () {
        if (Auth.isAuthenticated) {
            this.getInvitation()
        }
    }

    getInvitation = () => {
        const { actions, match } = this.props
        this.setState({ loading: true }, () => {
            actions.invitations.get(match.params.iid)
                .catch((error) => this.setState({ error }))
                .then(() => this.setState({ loading: false }))
        })
    }

    acceptInvitation = () => {
        const { actions, match, history, invitations } = this.props
        const iid = match.params.iid
        actions.invitations.accept(iid)
            .then(() => history.replace(`/${invitations.entities[iid].trip_id}`))
    }

    state = {
        loading: false,
        error: null,
    }

    render () {
        const { match, location, invitations } = this.props
        const { loading, error } = this.state

        if (!Auth.isAuthenticated) {
            return (
                <div className='container mt-3'>
                    <JoinForm location={location} />
                </div>
            )
        }

        const invitation = invitations.entities[match.params.iid]

        if (loading || !invitation) {
            return <div>Loading trip...</div>
        }

        if (error) {
            return <div>Something went wrong, please try again.</div>
        }

        return (
            <div className='card'>
                <div className='card-body'>
                    <button onClick={this.acceptInvitation}>
                        Join {invitation.trip_id}
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    invitations: invitation.selectors.invitationsSelector(state),
})

const mapDisaptchToProps = dispatch => ({
    actions: {
        invitations: bindActionCreators(invitation.actions, dispatch)
    }
})

export default connect(mapStateToProps, mapDisaptchToProps)(JoinTrip)
