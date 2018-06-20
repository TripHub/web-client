import React from 'react'
import { connect } from 'react-redux'

import { withAuth } from '../../enhancers/auth'

class Settings extends React.Component {
    render () {
        return (
            <div>Settings {this.tripId}</div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(withAuth(Settings))
