import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import trip from '../modules/trips' 

/**
 * Load trip details from the `id` param in the URL.
 * Also updates the selected trip.
 */
export function withTripDetail (Component) {
    return connect()(class extends React.Component {
        constructor (props) {
            super(props)
            if (!props.match || !props.match.params.id) {
                console.error(
                    'the `withTripDetail` enhancer requires the trip id to be in \
                    the path params. Have you forgotten to add `:id` in routes?'
                )
            }
            this.actions = bindActionCreators(trip.actions, props.dispatch)
        }

        get tripId () {
            // trip id is in path params
            return this.props.match.params.id
        }
        
        componentDidMount () {
            this.actions.get(this.tripId)
                .then(() => this.actions.setSelected(this.tripId))
        }

        render () {
            return <Component {...this.props} />
        }
    })
}
