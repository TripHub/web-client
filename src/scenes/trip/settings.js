import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withTripDetail } from '../../enhancers/load'
import { NavSidebarFrame } from '../../modules/core/frame'
import trip from '../../modules/trip'
import invitation from '../../modules/invitation'
import InvitationList from '../../modules/invitation/components/invitationList'

class Settings extends React.Component {
    constructor (props) {
        super(props)

        this.actions = {
            trips: bindActionCreators(trip.actions.trips, props.dispatch),
            invitations: bindActionCreators(invitation.actions, props.dispatch)
        }
    }

    state = {
        loading: false
    }

    componentDidMount () {
        const { activeTrip } = this.props
        this.actions.invitations.list(activeTrip.id)
    }

    onCreateInvitation = () => {
        const { activeTrip } = this.props
        this.setState({ loading: true })
        this.actions.invitations.create(activeTrip.id)
            .then(() => this.actions.invitations.list(activeTrip.id))
            .catch(console.error)
            .then(() => this.setState({ loading: false }))
    }

    onDelete = e => {
        const { history, activeTrip } = this.props
        this.actions.trips.remove(activeTrip.id)
            .then(this.actions.list)
            .then(() => history.push('/'))
    }

    render () {
        const { invitations } = this.props

        return (
            <NavSidebarFrame>
                <div className='container'>
                    <div className='card mb-3'>
                        <h6 className='card-header'>Members</h6>
                        <div className='card-body'>
                            <h6>Invitation Links</h6>
                            {<InvitationList invitations={invitations} />}
                            <button
                                className='btn btn-sm btn-light'
                                onClick={this.onCreateInvitation}
                                disabled={this.state.loading}
                            >
                                Create Invite Link
                            </button>
                        </div>
                    </div>
                    <div className='card mb-3'>
                        <h6 className='card-header'>Danger Zone</h6>
                        <div className='card-body'>
                            <button
                                className='btn btn-sm btn-danger'
                                onClick={this.onDelete}
                            >
                                Delete Trip
                            </button>
                        </div>
                    </div>
                </div>
            </NavSidebarFrame>
        )
    }
}

const mapStateToProps = state => ({
    activeTrip: trip.selectors.activeTripSelector(state),
    invitations: invitation.selectors.activeTripInvitationsSelector(state),
})

export default connect(mapStateToProps)(withTripDetail(Settings))
