import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { NavFrame } from '../../modules/core/frame'
import CreateForm from '../../modules/trips/components/createForm'
import trips from '../../modules/trips'

class Create extends React.Component {
    constructor (props) {
        super(props)
        const { dispatch } = props
        this.actions = bindActionCreators(trips.actions.trips, dispatch)
    }

    state = {
        title: '',
        description: ''
    }

    handleChange = (name) => (e) => {
        this.setState({ [name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault()
        
        const { history } = this.props
        this.actions.create({
            title: this.state.title,
            description: this.state.description
        })
            .then(data => history.push(`/${data.result}`))
            .catch(console.error)
    }

    render () {
        return (
            <NavFrame>
                <div className='container'>
                    <CreateForm
                        values={{
                            title: this.state.title,
                            description: this.state.description
                        }}
                        actions={{
                            onSubmit: this.onSubmit,
                            onChange: this.handleChange
                        }}
                    />
                </div>
            </NavFrame>
        )
    }
}

export default connect(s => s)(Create)
