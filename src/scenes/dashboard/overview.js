import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withAuth } from '../../enhancers/auth'
import NotFound from '../../modules/core/error/notFound'
import trips from '../../modules/trips'

class Overview extends React.Component {
    constructor (props) {
        super(props)
        const { dispatch } = props
        
        this.actions = bindActionCreators(trips.actions, dispatch)
    }

    get id () {
        const { match } = this.props
        return match.params.id
    }

    componentDidMount () {
        const { trips } = this.props
        this.actions.get(this.id)
            .then(() => this.actions.setSelected(this.id))
    }

    render () {
        const { trips, locations, members } = this.props

        if (trips.loading) {
            return <p>Loading...</p>
        }

        if (!trips.entities[this.id]) {
            return <NotFound />
        }
        
        const trip = trips.entities[this.id]

        return (
            <div>
                {trip.title} overview
            </div>
        )
    }
}

const mapStateToProps = state => ({
    trips: trips.selectors.tripsSelector(state),
    locations: trips.selectors.locationsSelector(state),
    members: trips.selectors.membersSelector(state),
})

export default connect(mapStateToProps)(withAuth(Overview))
