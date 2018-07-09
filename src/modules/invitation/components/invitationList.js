import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'

import { createInviteLink } from '../utils'
import ToastContainer from '../../core/toast'
import Button from '../../core/button'
import Icon from '../../core/icon'

const moment = require('moment')

const ShiftDown = styled.div`
    position: relative;
    top: 1px;
    background: transparent;
`

const InvitationList = ({ invitations }) => {
    if (invitations.length === 0) {
        return null
    }

    const onCopyClick = (id) => {
        toast('Invitation link copied.')
        document.getElementById(id).select()
    }

    return (
        invitations.map(invitation => {
            const link = createInviteLink(invitation.id)
            const expiresIn = moment.utc(invitation.expires_at).fromNow()

            return (
                <React.Fragment>
                    <ToastContainer />
                    <div className='input-group input-group-sm mb-3'>
                        <div className='input-group-prepend'>
                            <CopyToClipboard text={link}>
                                <button
                                    className='btn btn-secondary'
                                    role='button'
                                    onClick={() => onCopyClick(invitation.id)}
                                >
                                    <Icon name='ios-copy' />
                                </button>
                            </CopyToClipboard>
                        </div>
                        <CopyToClipboard text={link}>
                            <input
                                readOnly
                                onClick={() => onCopyClick(invitation.id)}
                                id={invitation.id}
                                type='text'
                                className='form-control'
                                value={link}
                            />
                        </CopyToClipboard>
                        <div className='input-group-append'>
                            <small className='input-group-text'>Member</small>
                            <small className='input-group-text'>
                                Expires {expiresIn}
                            </small>
                            <Button
                                className='btn-secondary'
                            >
                                <ShiftDown>
                                    <Icon name='close' />
                                </ShiftDown>
                            </Button>
                        </div>
                    </div>
                </React.Fragment>
            )
        })
    )
}

InvitationList.propTypes = {
    invitations: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired
    })).isRequired
}

export default InvitationList
