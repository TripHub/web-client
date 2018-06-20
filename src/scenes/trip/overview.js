import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { NotFound } from '../../modules/core/error'
import { NavSidebarFrame } from '../../modules/core/frame'
import { withTripDetail } from '../../enhancers/load'
import { withAuth } from '../../enhancers/auth'
import trips from '../../modules/trips'

class Overview extends React.Component {
    constructor (props) {
        super(props)
        
        this.actions = bindActionCreators(trips.actions, props.dispatch)
    }

    render () {
        const { activeTrip, trips, locations, members } = this.props

        if (trips.loading) {
            return <p>Loading...</p>
        }

        if (!activeTrip) {
            return <NotFound />
        }

        return (
            <NavSidebarFrame>
                {activeTrip.title} overview
            </NavSidebarFrame>
        )
    }
}

const mapStateToProps = state => ({
    activeTrip: trips.selectors.activeTripSelector(state),
    trips: trips.selectors.tripsSelector(state),
    locations: trips.selectors.locationsSelector(state),
    members: trips.selectors.membersSelector(state),
})

export default connect(mapStateToProps)(withAuth(withTripDetail(Overview)))
