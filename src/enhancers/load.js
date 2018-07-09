import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AssertionError } from 'assert';

import trip from '../modules/trip' 
import { NotFound } from '../modules/core/error'

/**
 * Load trip details from the `id` param in the URL.
 * Also updates the selected trip with the `id` param in the URL.
 */
export function withTripDetail (Component) {
    const mapStateToProps = s => ({
        activeTrip: trip.selectors.activeTripSelector(s)
    })

    return connect(mapStateToProps)(class extends React.Component {
        constructor (props) {
            super(props)
            if (!props.match || !props.match.params.tid) {
                throw AssertionError(
                    'the `withTripDetail` enhancer requires the trip id to be \
                    in the path params. Have you forgotten to add `:id` in \
                    routes?'
                )
            }
            this.actions = bindActionCreators(trip.actions.trips, props.dispatch)
        }

        state = { loading: false, lastLoaded: null }

        get tripId () {
            // trip id is in path params
            const tid = this.props.match.params.tid
            try {
                return parseInt(tid, 10)
            } catch (_) {
                return tid
            }
        }

        componentDidMount () {
            if (!this.props.activeTrip) {
                this.setState({ loading: true })
                this.loadFromTripId()
                    .then(() => this.setState({ loading: false }))
            }
        }

        componentDidUpdate (prevProps, prevState) {
            // don't match types strictly here as id's may be numbers but url
            // params are strings
            if (this.state.lastLoaded !== this.tripId) {
                this.loadFromTripId(this.tripId)
            }
        }
        
        loadFromTripId () {
            return this.actions.get(this.tripId)
                .then(this.updateSelectedTripIfNecessary)
                .then(() => this.setState({ lastLoaded: this.tripId }))
        }

        updateSelectedTripIfNecessary = () => {
            if (!this.props.activeTrip ||
                this.tripId !== this.props.activeTrip.id) {
                this.actions.setSelected(this.tripId)
            }
        }

        render () {
            if (this.state.loading) {
                return null
            } else if (!this.props.activeTrip) {
                return <NotFound />
            }
            // component is guarenteed to have activeTrip set
            return <Component {...this.props} />
        }
    })
}
