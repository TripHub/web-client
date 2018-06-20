import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withTripDetail } from '../../enhancers/load'
import CreateForm from '../../modules/trips/components/createForm'
import trips from '../../modules/trips'

class Create extends React.Component {
    constructor (props) {
        super(props)
        const { dispatch } = props

        this.actions = bindActionCreators(trips.actions, dispatch)
    }

    state = {
        title: '',
        description: ''
    }

    handleChange = (name) => (e) => {
        this.setState({ [name]: e.target.value })
    }

    onSubmit = (e) => {
        const { history } = this.props
        e.preventDefault()
        this.actions.create({
            title: this.state.title,
            description: this.state.description
        })
            .then(trip => history.push(`/${trip.id}`))
            .catch(console.error)
    }

    render () {
        return (
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
        )
    }
}

export default connect(s => s)(withTripDetail(Create))
