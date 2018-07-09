import React from 'react'
import { shape, string } from 'prop-types'

import Button from '../../core/button'

const JoinForm = ({ location }) => {
    const loginLink = {
        pathname: '/login',
        search: `?redirect_to=${location.pathname}`
    }

    return (
        <div className='card'>
            <h5 className='card-header'>Trip Invitation</h5>
            <div className='card-body'>
                <h6>Exiting times!</h6>
                <p>You've been invited to join the trip <strong>Spain</strong>.</p>
                <Button
                    to={loginLink}
                    className='btn-primary'
                >
                    Sign up and Join
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
