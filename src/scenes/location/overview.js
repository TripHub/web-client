import React from 'react'
import { connect } from 'react-redux'

import { withTripDetail } from '../../enhancers/load'
import { NavSidebarFrame } from '../../modules/core/frame'
import trips from '../../modules/trips'

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
    activeTrip: trips.selectors.activeTripSelector(state),
    trips: trips.selectors.tripsSelector(state),
    locations: trips.selectors.locationsSelector(state),
})

export default connect(mapStateToProps)(withTripDetail(Location))
