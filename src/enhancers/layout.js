import React from 'react'
import { connect } from 'react-redux'

import { Layout, Main } from '../modules/core/layout'
import { tripsSelector, locationsSelector } from '../modules/trips/selectors'
import Nav from '../modules/core/nav'
import Sidebar from '../modules/core/sidebar'

/**
 * Adds a static trip ID property to the component.
 */
class WithTripId extends React.Component {
    get tripId () {
        // trip id is in path params
        return this.props.match.params.id
    }
}

/**
 * Adds the nav component, hydrating it with the relevant props if available.
 */
export function withNav (Component) {
    const mapStateToProps = state => ({ trips: tripsSelector(state) })

    return connect(mapStateToProps)(class extends WithTripId {
        render () {
            return (
                <Layout>
                    <Main>
                        <Nav trip={this.props.trips.entities[this.tripId]} />
                        <Component {...this.props} />
                    </Main>
                </Layout>
            )
        }
    })
}

/**
 * Adds the nav and sidebar components, hydrating them with the relevant props
 * if available.
 */
export function withNavSidebar (Component) {
    const mapStateToProps = state => ({
        trips: tripsSelector(state),
        locations: locationsSelector(state)
    })

    return connect(mapStateToProps)(class extends WithTripId {
        render () {
            const trip = this.props.trips.entities[this.tripId]
            const locations = (trip && trip.locations &&
                trip.locations.map(
                    id => this.props.locations.entities[id])) || []
            return (
                <Layout>
                    <Sidebar trip={trip} locations={locations} />
                    <Main>
                        <Nav trip={trip} />
                        <Component {...this.props} />
                    </Main>
                </Layout>
            )
        }
    })
}
