import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <nav className='navbar navbar-light bg-light'>
            <Link to='/' className='navbar-brand'>TripHub</Link>
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

export default Nav
