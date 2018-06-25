import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { NavFrame } from '../modules/core/frame'
import trip from '../modules/trip'
import List from '../modules/trip/components/list'

class Home extends React.Component {
    constructor (props) {
        super(props)
        const { dispatch } = props
        this.actions = bindActionCreators(trip.actions.trips, dispatch)
    }

    componentDidMount () {
        this.actions.list()
    }

    render () {
        const { trips } = this.props

        return (
            <NavFrame>
                <main className='container'>
                    <List
                        order={trips.order}
                        entities={trips.entities}
                    />
                </main>
            </NavFrame>
        )
    }
}

const mapStateToProps = state => ({
    trips: trip.selectors.tripsSelector(state)
})

export default connect(mapStateToProps)(Home)
