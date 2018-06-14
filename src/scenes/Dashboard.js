import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withAuth } from '../enhancers/auth'
import NotFound from '../modules/core/error/notFound'
import { Layout, Main } from '../modules/core/layout'
import Nav from '../modules/core/nav'
import Sidebar from '../modules/core/sidebar'

import trips from '../modules/trips'

class Dashboard extends React.Component {
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
        // load trip if not already in state
        if (!this.props.trips.entities[this.id]) {
            this.actions.get(this.id)
        }
    }

    render () {
        const { trips } = this.props

        if (trips.loading) {
            return <p>Loading...</p>
        }

        if (!trips.entities[this.id]) {
            return <NotFound />
        }

        const trip = trips.entities[this.id]

        return (
            <Layout>
                <Sidebar />
                <Main>
                    <Nav profile={this.props.profile} trip={trip} />
                </Main>
            </Layout>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(withAuth(Dashboard))
