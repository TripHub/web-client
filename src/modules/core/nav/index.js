import React from 'react'
import { string, shape } from 'prop-types'
import { Link } from 'react-router-dom'

import { Button } from '../button'

const Nav = ({ profile, trip }) => {
    return (
        <nav className='navbar navbar-light bg-light justify-content-between'>
            {
                trip
                    ? <strong className='nav-item'>{trip.title}</strong>
                    : <Link className='navbar-brand nav-item nav-link' to='/'>TripHub</Link>
            }
            <div className='d-flex'>
                <div className='dropdown'>
                    <Button
                        iconRight
                        icon='arrow-dropdown'
                        id='settings.dropdown'
                        className='nav-link btn-link'
                        data-toggle='dropdown'
                    >
                        Settings
                    </Button>
                    <div
                        aria-labelledby='settings.dropdown'
                        className='dropdown-menu'
                        style={{ left: 'auto', right: 0 }}
                    >
                        <Link to='/create' className='dropdown-item'>Create Trip</Link>
                        <div className='dropdown-divider' />
                        <Link to='#' className='dropdown-item'>Trip Settings</Link>
                    </div>
                </div>

                <div className='dropdown'>
                    <Button
                        iconRight
                        icon='arrow-dropdown'
                        id='profile.dropdown'
                        className='nav-link btn-link'
                        data-toggle='dropdown'
                    >
                        Profile
                    </Button>
                    <div
                        aria-labelledby='profile.dropdown'
                        className='dropdown-menu'
                        style={{ left: 'auto', right: 0 }}
                    >
                        <Link to='#' className='dropdown-item'>Profile</Link>
                        <Link to='#' className='dropdown-item'>Account</Link>
                        <div className='dropdown-divider' />
                        <Link to='/logout' className='dropdown-item'>Logout</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

Nav.propTypes = {
    trip: shape({
        title: string
    }),
    profile: shape({
        nickname: string,
        name: string,
        email: string.isRequired
    }).isRequired
}

export default Nav
