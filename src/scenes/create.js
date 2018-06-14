import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withAuth } from '../enhancers/auth'
import CreateForm from '../modules/trips/components/createForm'
import Nav from '../modules/core/nav'
import trips from '../modules/trips'

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
            <React.Fragment>
                <Nav profile={this.props.profile} />
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
            </React.Fragment>
        )
    }
}

export default connect(s => s)(withAuth(Create))
