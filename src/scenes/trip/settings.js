import React from 'react'
import { connect } from 'react-redux'

import { withTripDetail } from '../../enhancers/load'
import { NavSidebarFrame } from '../../modules/core/frame'

class Settings extends React.Component {
    render () {
        return (
            <NavSidebarFrame>
                Settings {this.tripId}
            </NavSidebarFrame>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(withTripDetail(Settings))
