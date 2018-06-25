import React from 'react'
import styled from 'styled-components'
import { arrayOf, func, string, shape } from 'prop-types'
import Select, { components } from 'react-select'

import Button from '../../core/button'

const Option = styled.div`
    padding: 5px 15px;
    background: transparent;

    &:hover {
        background-color: rgba(30, 144, 255, 0.1);
    }
`

const Small = styled.small`
    opacity: 0.55;
`

const SingleValueComponent = ({ children, ...props }) => {
    return (
        <components.SingleValue {...props}>
            <span>{children[0]}, <Small>{children[1]}</Small></span>
        </components.SingleValue>
    )
}

const OptionComponent = ({ innerProps, isDisabled, children, ...props }) => {
    return !isDisabled
        ? (
            <Option {...innerProps}>
                <span>{children[0]}, <Small>{children[1]}</Small></span>
            </Option>
        )
        : null
}

const CreateForm = ({ loading, form, values, actions }) => {
    const id = Math.random().toString(36)

    return (
        <form className='card' onSubmit={actions.onSubmit}>
            <div className='card-header'>Add a Location</div>
            <div className='card-body'>
                <div className='form-group'>
                    <label htmlFor={`${id}.search`}>Search for a place</label>
                    <Select
                        isClearable
                        id={`${id}.search`}
                        isLoading={loading}
                        inputValue={values.searchText}
                        onInputChange={actions.onInputChange}
                        options={values.suggestions}
                        getOptionLabel={obj => [obj.name, obj.formatted_address]}
                        getOptionValue={obj => obj.id}
                        components={{
                            Option: OptionComponent,
                            SingleValue: SingleValueComponent,
                        }}
                        // loadOptions={actions.onSearch}
                        value={values.selected}
                        onChange={actions.onSelect}
                    />
                </div>

                <div className='d-flex'>
                    <Button className='btn-link' onClick={actions.onCancel}>
                        Cancel
                    </Button>
                    <Button
                        className='btn-primary'
                        type='submit'
                        onSubmit={actions.onSubmit}
                        disabled={!form.isValid()}
                    >
                        Create Location
                    </Button>
                </div>
            </div>
        </form>
    )
}

CreateForm.propTypes = {
    values: shape({
        searchText: string.isRequired,
        selected: shape(),
        suggestions: arrayOf(shape()).isRequired,
    }).isRequired,
    form: shape({
        isValid: func.isRequired,
    }).isRequired,
    actions: shape({
        onSelect: func.isRequired,
        onSubmit: func.isRequired,
        onCancel: func.isRequired,
    }).isRequired
}

export default CreateForm
