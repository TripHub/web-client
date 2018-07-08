import React from 'react'
import { bool, string, shape } from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import Icon from '../icon'
import DropdownLink from './components/dropdownLink'

const Navbar = styled.nav`
    flex-shrink: 0;
`

const Nav = ({ profile, trip, withGutter }) => {
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
            <Link to='#' className='dropdown-item'>Profile</Link>
            <Link to='#' className='dropdown-item'>Account</Link>
            <div className='dropdown-divider' />
            <Link to='/logout' className='dropdown-item'>Logout</Link>
        </DropdownLink>
    )

    return (
        <Navbar className={
            classnames('navbar navbar-light bg-light justify-content-between', {
                'mb-3': withGutter
            })
        }>
            {
                tripExists
                    ? (
                        <Link className='nav-item' to={`/${trip.id}`}>
                            <strong>{trip.title}</strong>
                        </Link>
                    )
                    : <Link className='navbar-brand nav-item nav-link' to='/'>TripHub</Link>
            }
            <div className='d-flex'>
                {tripDropdown}
                {createDropdown}
                {profileDropdown}
            </div>
        </Navbar>
    )
}

Nav.propTypes = {
    withGutter: bool,
    trip: shape({
        title: string
    }),
    profile: shape({
        nickname: string,
        name: string,
        email: string.isRequired
    })
}

Nav.defaultProps = {
    withGutter: true
}

export default Nav
