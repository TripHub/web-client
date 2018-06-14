import React from 'react'
import { string, shape } from 'prop-types'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import { IconButton, Button } from '../button'

const Nav = ({ profile }) => {
    return (
        <nav className='navbar navbar-light bg-light'>
            <IconButton
                to='/create'
                className='btn-link'
                icon='add'
            />
            <div className='dropdown'>
                <Button
                    iconRight
                    id='profile.dropdown'
                    icon='arrow-dropdown'
                    className='nav-link btn-link'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                >
                    {profile.nickname || profile.name || profile.email}
                </Button>
                <div
                    aria-labelledby='profile.dropdown'
                    className={classnames('dropdown-menu')}
                >
                    <Link to='#' className='dropdown-item'>Profile</Link>
                    <Link to='#' className='dropdown-item'>Settings</Link>
                    <div className='dropdown-divider' />
                    <Link to='/logout' className='dropdown-item'>Logout</Link>
                </div>
            </div>
        </nav>
    )
}

Nav.propTypes = {
    profile: shape({
        nickname: string,
        name: string,
        email: string.isRequired
    }).isRequired
}

export default Nav
