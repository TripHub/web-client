import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import api from '../utils/api'
import { withAuth } from '../enhancers/auth'

import trips from '../modules/trips'

import Nav from '../modules/core/nav'

class Dashboard extends React.Component {
    constructor (props) {
        super(props)
        const { dispatch } = props

        this.actions = bindActionCreators(trips.actions, dispatch)
    }

    componentDidMount () {

    }

    render () {
        return (
            <React.Fragment>
                <Nav />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(withAuth(Dashboard))
