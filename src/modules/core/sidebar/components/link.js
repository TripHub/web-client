import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export default styled(NavLink)`
    display: block;
    padding: 10px 15px;
    text-decoration: none;
    color: white;
    border-left: 3px solid transparent;

    &:hover {
        text-decoration: none;
        color: white;
        background: rgba(255, 255, 255, 0.1);
    }
    
    &.active {
        border-color: white;
        background: rgba(255, 255, 255, 0.1);
        pointer-events: none;
        cursor: default;
    }
`
