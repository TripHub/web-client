import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Nav from '../../core/nav'
import Sidebar from '../../core/sidebar'
import NotFound from '../../core/error/notFound'
import { Layout, Main } from '../../core/layout'
import trip from '../'

class Frame extends React.Component {
    constructor (props) {
        super(props)
        const { dispatch } = props

        this.actions = bindActionCreators(trip.actions, dispatch)
    }

    render () {
        const { trips, activeTrip, locations } = this.props
        const tripLocations = activeTrip && activeTrip.locations
            ? activeTrip.locations
                .map(lid => locations.entities[lid])
            : []

        return (
            <Layout>
                <Sidebar trip={activeTrip} locations={tripLocations} />
                <Main>
                    <Nav trip={activeTrip} />
                    {this.props.children}
                </Main>
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    activeTrip: trip.selectors.activeTripSelector(state),
    trips: trip.selectors.tripsSelector(state),
    locations: trip.selectors.locationsSelector(state),
    // members: trip.selectors.membersSelector(state),
})

export default connect(mapStateToProps)(Frame)
