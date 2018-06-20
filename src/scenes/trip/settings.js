import React from 'react'
import { connect } from 'react-redux'

class Settings extends React.Component {
    render () {
        return (
            <div>Settings {this.tripId}</div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Settings)
