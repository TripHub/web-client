import React from 'react'
import { func, shape, string } from 'prop-types'
import { Link } from 'react-router-dom'

const CreateForm = ({ actions }) => {
    const id = Math.random().toString(36)

    return (
        <form>
            <div className='form-group'>
                <label htmlFor={`${id}.name`}>Trip Name</label>
                <input
                    required
                    onChange={actions.onChange('title')}
                    className='form-control'
                    id={`${id}.name`}
                    placeholder='Name your trip...'
                />
            </div>
            <Link
                className='btn btn-link'
                to='/'
            >Cancel</Link>
            <button
                className='btn btn-primary'
                onClick={actions.onSubmit}
            >Create</button>
        </form>
    )
}

CreateForm.propTypes = {
    values: shape({
        title: string.isRequired
    }).isRequired,
    actions: shape({
        onSubmit: func.isRequired
    }).isRequired
}

export default CreateForm
