import React from 'react'
import { element, bool } from 'prop-types'

import Button from '../../button'

/**
 * Creates a dropdown nav link.
 * Children should be the contents of a dropdown.
 */
const DropdownLink = ({ button, children, right = true }) => {
    const id = Math.random().toString(36)
    return (
        <div className='dropdown'>
            <Button
                iconRight
                icon='arrow-dropdown'
                id={`${id}.dropdown`}
                className='nav-link btn-link'
                data-toggle='dropdown'
            >
                {button}
            </Button>
            <div
                aria-labelledby={`${id}.dropdown`}
                className='dropdown-menu'
                style={
                  right
                   ? { left: 'auto', right: 0 }
                   : { left: 0, right: 'auto' }
                }
            >
                {children}
            </div>
        </div>
    )
}

DropdownLink.propTypes = {
  button: element.isRequired,
  children: element.isRequired,
  left: bool,
}

export default DropdownLink
