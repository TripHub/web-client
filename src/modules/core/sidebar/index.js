import React from 'react'
import styled from 'styled-components'
// import { string } from 'prop-types'

const Background = styled.div`
    display: flex;
    flex-direction: column;
    background: dodgerblue;
    padding: 15px;
    width: 100%;
    max-width: 220px;
    color: white;
`

const Sidebar = () => {
    return (
        <Background>
            <strong>TripHub</strong>
        </Background>
    )
}

Sidebar.propTypes = {}

export default Sidebar
