import React from 'react'
import { connect } from 'react-redux'

import { withAuth } from '../../enhancers/auth'

class Settings extends React.Component {
  render () {
    return <div>Settings</div>
  }
}

export default connect()(withAuth(Settings))
