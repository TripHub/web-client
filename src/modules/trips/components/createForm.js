import React from 'react'
import { func, shape, string } from 'prop-types'
import { Link } from 'react-router-dom'

const CreateForm = ({ actions }) => {
    const id = Math.random().toString(36)

    return (
        <form className='card'>
            <div className='card-header'>Create Trip</div>
            <div className='card-body'>
                <div className='form-group'>
                    <label htmlFor={`${id}.name`}>Trip Name</label>
                    <input
                        required
                        onChange={actions.onChange('title')}
                        className='form-control'
                        id={`${id}.name`}
                        placeholder='e.g. Roadtrip'
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor={`${id}.desc`}>Description</label>
                    <input
                        onChange={actions.onChange('description')}
                        className='form-control'
                        id={`${id}.desc`}
                        placeholder='What are you going to do?'
                    />
                </div>

                <Link className='btn btn-link' to='/'>Cancel</Link>
                <button className='btn btn-primary' onClick={actions.onSubmit}>
                    Create
                </button>
            </div>
        </form>
    )
}

CreateForm.propTypes = {
    values: shape({
        title: string.isRequired,
        description: string.isRequired
    }).isRequired,
    actions: shape({
        onSubmit: func.isRequired
    }).isRequired
}

export default CreateForm
