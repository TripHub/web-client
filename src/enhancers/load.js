import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import trip from '../modules/trips' 
import { AssertionError } from 'assert';

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

        get tripId () {
            // trip id is in path params
            const tid = this.props.match.params.tid
            try {
                return parseInt(tid, 10)
            } catch (_) {
                return tid
            }
        }

        componentDidMount() {
            this.loadFromTripId()
        }

        componentDidUpdate (prevProps, prevState) {
            // don't match types strictly here as id's may be numbers but url
            // params are strings
            if (prevProps.match.params.tid != this.tripId) {
                this.loadFromTripId(this.tripId)
            }
        }
        
        loadFromTripId () {
            this.actions.get(this.tripId)
                .then(this.updateSelectedTripIfNecessary)
        }

        updateSelectedTripIfNecessary = () => {
            if (!this.props.activeTrip ||
                this.tripId !== this.props.activeTrip.id) {
                this.actions.setSelected(this.tripId)
            }
        }

        render () {
            return <Component {...this.props} />
        }
    })
}
