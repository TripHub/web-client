import React from 'react'
import axios from 'axios'

class Dashboard extends React.Component {
    state = {
        trips: []
    }

    componentDidMount () {
        axios('http://localhost:8000/v1/trips/')
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

export default Dashboard
