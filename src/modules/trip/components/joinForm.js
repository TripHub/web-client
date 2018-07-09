import React from 'react'
import { shape, string } from 'prop-types'

import Button from '../../core/button'

class JoinForm extends React.Component {
    loginLink = {
        pathname: '/login',
        search: `?redirect_to=${this.props.location.pathname}`
    }

    state = {
        invitation: {}
    }

    componentDidMount () {
        this.getInvitationDetails()
    }

    getInvitationDetails = () => {
        const { match, actions } = this.props
        // fetch details from the URL id
        actions.invitations.get(match.params.iid)
            .then(invitation => this.setState(invitation))
    }

    render () {
        const { trip, location } = this.props
        const { invitation } = this.state
        
        return (
            <div className='card'>
                <h5 className='card-header'>Trip Invitation</h5>
                <div className='card-body'>
                    <p>You've been invited to join <strong>{invitation.title}</strong> by <strong>{invitation.created_by.username}</strong></p>
                    <Button
                        to={this.loginLink}
                        className='btn-primary'
                    >
                        Join Trip
                    </Button>
                </div>
            </div>
        )
    }
}

JoinForm.propTypes = {
    location: shape({
        pathname: string.isRequired
    }).isRequired
}

export default JoinForm
