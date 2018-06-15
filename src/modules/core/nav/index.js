import React from 'react'
import { string, shape } from 'prop-types'
import { Link } from 'react-router-dom'

import Icon from '../icon'
import DropdownLink from './components/dropdownLink'

const Nav = ({ profile, trip }) => {
    const tripExists = trip && trip.id

    const tripDropdown = tripExists
        ? (
            <DropdownLink button={<Icon name='settings' />}>
                <Link to={`/${trip.id}/settings`} className='dropdown-item'>
                    Trip Settings
                </Link>
            </DropdownLink>
        ) : null

    const createDropdown = (
        <DropdownLink button={<Icon name='add' />}>
            <Link to='/create' className='dropdown-item'>Create Trip</Link>
        </DropdownLink>
    )

    const profileDropdown = (
        <DropdownLink button={<Icon name='person' />}>
            <React.Fragment>
                <Link to='#' className='dropdown-item'>Profile</Link>
                <Link to='#' className='dropdown-item'>Account</Link>
                <div className='dropdown-divider' />
                <Link to='/logout' className='dropdown-item'>Logout</Link>
            </React.Fragment>
        </DropdownLink>
    )

    return (
        <nav className='navbar navbar-light bg-light justify-content-between'>
            {
                tripExists
                    ? <strong className='nav-item'>{trip.title}</strong>
                    : <Link className='navbar-brand nav-item nav-link' to='/'>TripHub</Link>
            }
            <div className='d-flex'>
                {tripDropdown}
                {createDropdown}
                {profileDropdown}
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
