import React from 'react'
import { connect } from 'react-redux'

import { withTripDetail } from '../../enhancers/load'
import { NavSidebarFrame } from '../../modules/core/frame'

class Location extends React.Component {
    render () {
        return (
            <NavSidebarFrame>
                Location
            </NavSidebarFrame>
        )
    }
}

export default connect()(withTripDetail(Location))
