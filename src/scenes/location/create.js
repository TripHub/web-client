import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import debounce from 'lodash.debounce'

import api from '../../utils/api'
import { withTripDetail } from '../../enhancers/load'
import { NavSidebarFrame } from '../../modules/core/frame'
import CreateForm from '../../modules/locations/components/createForm'

class Create extends React.Component {
    state = {
        selected: null,
        loading: false
    }

    handleSelect = selected => this.setState({ selected })
    
    callPlaceApi = (query) => {
        this.setState({ loading: true })
        return new Promise((resolve, reject) => {
            return api().get(`/places/search`, {
                params: {
                    fields: 'formatted_address,name,id,geometry',
                    query,
                }
            })
                .then(res => resolve(res.data))
                .catch(() => resolve([]))
                
                .then(() => this.setState({ loading: false }))
        })
    }

    isFormValid = () => {
        const { selected } = this.state
        // check we have a selected option
        try {
            return selected.id &&
                selected.formatted_address &&
                selected.geometry.location.lat &&
                selected.geometry.location.lng
        } catch (_) {
            return false
        }
    }

    onSubmit = e => {
        e.preventDefault()
        if (this.isFormValid()) {
            console.log('valid!', 'send', this.state.selected)
        } else {
            console.log('invalid!', 'send nothing')
        }
    }

    render () {
        return (
            <NavSidebarFrame>
                <div className='container-fluid'>
                    <CreateForm
                        loading={this.state.loading}
                        form={{
                            isValid: this.isFormValid
                        }}
                        values={{
                            selected: this.state.selected,
                        }}
                        actions={{
                            onSearch: this.callPlaceApi,
                            onSelect: this.handleSelect,
                            onSubmit: this.onSubmit,
                            onCancel: console.log,
                        }}
                    />
                </div>
            </NavSidebarFrame>
        )
    }
}

export default connect()(withTripDetail(Create))
