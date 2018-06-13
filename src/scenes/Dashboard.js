import React from 'react'

import api from '../utils/api'
import { withAuth } from '../enhancers/auth'

class Dashboard extends React.Component {
    state = {
        trips: []
    }

    componentDidMount () {
        api().get('/v1/trips')
            .then(t => { console.log(t); return t })
            .then(res => this.setState({ trips: res.data }))
    }

    render () {
        return (
            <React.Fragment>
                <div>Dashboard</div>
                {
                    this.state.trips.map(t => (
                        <strong key={t.id}>{t.title}</strong>
                    ))
                }
            </React.Fragment>
        )
    }
}

export default withAuth(Dashboard)
