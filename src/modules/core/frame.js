import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import trip from '../trip'
import Nav from './nav'
import Sidebar from './sidebar'
import { Layout, Main } from './layout'

class _NavSidebarFrame extends React.Component {
    constructor (props) {
        super(props)
        const { dispatch } = props

        this.actions = bindActionCreators(trip.actions, dispatch)
    }

    render () {
        const { activeTrip, locations } = this.props

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

class _NavFrame extends React.Component {
    render () {
        const { activeTrip } = this.props

        return (
            <Layout>
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
    locations: trip.selectors.locationsSelector(state),
    // trips: trip.selectors.tripsSelector(state),
    // members: trip.selectors.membersSelector(state),
})

export const NavSidebarFrame = connect(mapStateToProps)(_NavSidebarFrame)
export const NavFrame = connect(mapStateToProps)(_NavFrame)
