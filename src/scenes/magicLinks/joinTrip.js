import React from 'react'
import { connect } from 'react-redux'

import Auth from '../../utils/auth'
import JoinForm from '../../modules/trip/components/joinForm'

class JoinTrip extends React.Component {
    componentDidMount () {
        // ...
    }

    render () {
        const { location } = this.props

        if (!Auth.isAuthenticated) {
            return (
                <div className='container'>
                    <JoinForm location={location} />
                </div>
            )
        }

        return <div>Joining...</div>
    }
}

const mapStateToProps = ({ profile }) => ({ profile })

export default connect(mapStateToProps)(JoinTrip)
