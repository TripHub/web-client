import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

const Icon = styled.div`
    position: relative;
    height: 1px;
    overflow: visible;
    top: 1px;
    margin: ${props => props.iconRight ? '0 0 0 3px' : '0 3px 0 0'};
`

/**
 * Button with icon support. 
 */
export const Button = ({ to, iconRight, icon, size, children, className, ...props }) => {
    const iconEl = icon
        ? (
            <Icon iconRight={iconRight}>
                <ion-icon name={icon} size={size || 'small'} />
            </Icon>
        )
        : null

    const childrenEl = typeof(children) === 'string'
        ? <div>{children}</div>
        : children

    const buttonEl = (
        <button
            className={classnames('btn', 'd-flex', className)}
            {...props}
        >
            {
                iconRight
                    ? <React.Fragment>{childrenEl}{iconEl}</React.Fragment>
                    : <React.Fragment>{iconEl}{childrenEl}</React.Fragment>
            }
        </button>
    )

    return to
        ? <Link to={to}>{buttonEl}</Link>
        : buttonEl
}

const IconContainer = styled.div`
    position: relative;
    top: 2px;
    padding: 0;
`

/**
 * Single icon with no text.
 */
export const IconButton = ({ to, icon, size, ...props }) => {
    const iconEl = (
        <IconContainer>
            <ion-icon icon={icon} size={size || 'small'} />
        </IconContainer>
    )

    return to
        ? <Link to={to}>{iconEl}</Link>
        : iconEl
}
