import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

const Icon = styled.div`
    position: relative;
    height: 1px;
    overflow: visible;
    top: 1px;
    margin: ${props => props.iconRight ? '0 0 0 3px' : '0 8px 0 0'};
`

const UndecoratedLink = styled(Link)`
    :hover {
        text-decoration: none;
    }
`

/**
 * Button with icon and link support. 
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
            type='button'
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
        ? <UndecoratedLink to={to}>{buttonEl}</UndecoratedLink>
        : buttonEl
}

export default Button
