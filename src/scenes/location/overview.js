import React from 'react'
import { connect } from 'react-redux'

import { withTripDetail } from '../../enhancers/load'
import { NavSidebarFrame } from '../../modules/core/frame'
import trip from '../../modules/trip'

class Location extends React.Component {

    render () {
        const lid = this.props.match.params.lid
        const location = this.props.locations.entities[lid] || {}

        return (
            <NavSidebarFrame>
                Location {location.title}
            </NavSidebarFrame>
        )
    }
}

const mapStateToProps = state => ({
    activeTrip: trip.selectors.activeTripSelector(state),
    trips: trip.selectors.tripsSelector(state),
    locations: trip.selectors.locationsSelector(state),
})

export default connect(mapStateToProps)(withTripDetail(Location))
