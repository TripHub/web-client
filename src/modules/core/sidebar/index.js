import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { arrayOf, shape, string, number } from 'prop-types'

import SidebarLink from './components/link'

const Background = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    width: 100%;
    max-width: 220px;
    background: dodgerblue;
`

const Brand = styled.h4`
    margin: 0 0 40px;
    padding: 15px;
    color: white;
    text-align: center;
    background: rgba(0, 0, 0, 0.06);
`

const Icon = styled.div`
    position: relative;
    top: 2px;
    display: inline-block;
    margin-right: 8px;
`

const Section = styled.section`
    margin-bottom: 40px;
`

const SectionHeading = styled.h6`
    color: white;
    padding: 15px 0 10px 15px;
    margin: 0;
    border-bottom: 2px solid rgba(255, 255, 255, .55);
    font-weight: bold;
`

const SectionBody = styled.section`
    padding: 20px 0 0 0;
    margin: 0;
`

const Sidebar = ({ locations }) => {
    return (
        <Background>
            <Link to='/'>
                <Brand>TripHub</Brand>
            </Link>

            <Section>
                <SectionHeading>Your Trip</SectionHeading>
                <SectionBody>
                    <SidebarLink to='#'>
                        <Icon>
                            <ion-icon name='chatbubbles' />
                        </Icon>
                        Channels
                    </SidebarLink>
                    <SidebarLink to='#'>
                        <Icon>
                            <ion-icon name='ios-paper' />
                        </Icon>
                        Travel Documents
                    </SidebarLink>
                </SectionBody>
            </Section>

            <Section>
                <SectionHeading>Locations</SectionHeading>
                <SectionBody>
                    {
                        locations.map(location => {
                            return (
                                <SidebarLink to='#' key={location.id}>
                                    {location.title}
                                </SidebarLink>
                            )
                        })
                    }
                </SectionBody>
            </Section>
        </Background>
    )
}

Sidebar.propTypes = {
    locations: arrayOf(shape({
        id: number.isRequired,
        pid: string.isRequired,
        title: string.isRequired,
        lat: number.isRequired,
        lng: number.isRequired
    })).isRequired
}

export default Sidebar
