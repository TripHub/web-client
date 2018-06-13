import React from 'react'
import { arrayOf, shape } from 'prop-types'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <nav className='navbar navbar-light bg-light'>
            <a className='navbar-brand'>TripHub</a>
            <Link to='/create' className='nav-item nav-link'>
                <ion-icon
                    name='add'
                    alt='Create Trip'
                />
                Create Trip
            </Link>
        </nav>
    )
}

Nav.propTypes = {}

export default Nav
