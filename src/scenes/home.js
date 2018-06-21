import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withAuth } from '../enhancers/auth'
import { NavFrame } from '../modules/core/frame'
import trips from '../modules/trips'
import List from '../modules/trips/components/list'

class Home extends React.Component {
    constructor (props) {
        super(props)
        const { dispatch } = props
        this.actions = bindActionCreators(trips.actions.trips, dispatch)
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
    trips: trips.selectors.tripsSelector(state)
})

export default connect(mapStateToProps)(Home)
