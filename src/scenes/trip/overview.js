import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { NotFound } from '../../modules/core/error'
import { NavSidebarFrame } from '../../modules/core/frame'
import { withTripDetail } from '../../enhancers/load'
import Map from '../../modules/trip/components/map'
import trip from '../../modules/trip'

class Overview extends React.Component {
    constructor (props) {
        super(props)
        
        this.actions = bindActionCreators(trip.actions.trips, props.dispatch)
    }

    render () {
        const { activeTrip, trips } = this.props

        if (trips.loading) {
            return <p>Loading...</p>
        }

        if (!activeTrip) {
            return <NotFound />
        }

        return (
            <NavSidebarFrame withGutter={false}>
                <Map />
                {activeTrip.title} overview
            </NavSidebarFrame>
        )
    }
}

const mapStateToProps = state => ({
    activeTrip: trip.selectors.activeTripSelector(state),
    trips: trip.selectors.tripsSelector(state),
    locations: trip.selectors.locationsSelector(state),
    members: trip.selectors.membersSelector(state),
})

export default connect(mapStateToProps)(withTripDetail(Overview))
