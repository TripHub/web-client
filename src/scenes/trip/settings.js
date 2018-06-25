import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withTripDetail } from '../../enhancers/load'
import { NavSidebarFrame } from '../../modules/core/frame'
import trip from '../../modules/trip'

class Settings extends React.Component {
    constructor (props) {
        super(props)
        this.actions = bindActionCreators(trip.actions.trips, props.dispatch)
    }

    onDelete = e => {
        const { history, activeTrip } = this.props
        this.actions.remove(activeTrip.id)
            .then(this.actions.list)
            .then(() => history.push('/'))
    }

    render () {
        return (
            <NavSidebarFrame>
                Settings {this.tripId}
                <div className='card'>
                    <div className='card-body'>
                        <button
                            className='btn btn-danger'
                            onClick={this.onDelete}
                        >
                            Delete Trip
                        </button>
                    </div>
                </div>
            </NavSidebarFrame>
        )
    }
}

const mapStateToProps = state => ({
    activeTrip: trip.selectors.activeTripSelector(state)
})

export default connect(mapStateToProps)(withTripDetail(Settings))
