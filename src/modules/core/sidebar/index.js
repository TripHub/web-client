import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// import { shape, string } from 'prop-types'

const Background = styled.div`
    display: flex;
    flex-direction: column;
    background: dodgerblue;
    padding: 15px;
    width: 100%;
    max-width: 220px;
    color: white;
`

const Brand = styled.h4`
    color: white;
`

const Sidebar = ({ trip }) => {
    return (
        <Background>
            <Link to='/'>
                <Brand>TripHub</Brand>
            </Link>
        </Background>
    )
}

Sidebar.propTypes = {}

export default Sidebar
