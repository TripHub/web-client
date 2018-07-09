import React from 'react'
import styled from 'styled-components'
import { injectGlobal } from 'styled-components'
import { ToastContainer, Flip } from 'react-toastify'

const globalCssPrefix = 'globals--react-toastify'

injectGlobal`
    .${globalCssPrefix}--toast {
        && {
            min-height: 0;
            padding: 15px;
            color: black;
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.06);
            font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';
        }
    }

    .${globalCssPrefix}--body {
    }
`

export default (props) => (
    <ToastContainer
        hideProgressBar
        autoClose={3000}
        transition={Flip}
        closeButton={false}
        draggable={false}
        pauseOnHover={false}
        toastClassName={`${globalCssPrefix}--toast`}
        bodyClassName={`${globalCssPrefix}--body`}
        {...props}
    />
)
