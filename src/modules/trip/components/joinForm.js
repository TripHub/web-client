import React from 'react'
import { shape, string } from 'prop-types'

import Button from '../../core/button'

const JoinForm = ({ trip, location, ...props }) => {
    const loginLink = {
        pathname: '/login',
        search: `?redirect_to=${location.pathname}`
    }

    return (
        <div className='card'>
            <h5 className='card-header'>Trip Invitation</h5>
            <div className='card-body'>
                <p>You've been invited to join <strong>Roadtrip</strong> by <strong>Hiccup</strong></p>
                <Button
                    to={loginLink}
                    className='btn-primary'
                >
                    Join Trip
                </Button>
            </div>
        </div>
    )
}

JoinForm.propTypes = {
    location: shape({
        pathname: string.isRequired
    }).isRequired
}

export default JoinForm
