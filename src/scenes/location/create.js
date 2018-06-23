import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import api from '../../utils/api'
import { withTripDetail } from '../../enhancers/load'
import { NavSidebarFrame } from '../../modules/core/frame'
import trip from '../../modules/trip'
import CreateForm from '../../modules/locations/components/createForm'

class Create extends React.Component {
    state = {
        searchText: '',
        selected: null,
        suggestions: [],
        loading: false
    }

    componentWillUnmount () {
        clearTimeout(this.timer)
    }

    timer = null

    handleSelect = (selected) => {
        this.setState({
            searchText: '',
            suggestions: [],
            selected,
        })
    }
    
    onInputChange = (searchText, { action }) => {
        if (action === 'input-change') {
            this.setState({
                searchText
            }, () => {
                this.callPlaceApi(this.state.searchText)
                    .then(suggestions => this.setState({ suggestions }))
                    .then(() => this.setState({ loading: false }))
            })
        }
        
    }
    
    callPlaceApi = (query) => {
        // start loading ui
        this.setState({ loading: true })
        // clear existing timers
        if (this.timer) {
            window.clearTimeout(this.timer)
        }
        // return promise
        return new Promise((resolve, reject) => {
            // start new timer (debounce)
            this.timer = window.setTimeout(query => {
                api().get(`/places/search`, {
                    params: {
                        fields: 'id,formatted_address,name,geometry',
                        query,
                    }
                })
                    .then(res => resolve(res.data))
                    .catch(() => resolve([]))
            }, 500, query)
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
        if (!this.isFormValid()) {
            return console.error('invalid location data', this.state.selected)
        }

        const { history, activeTrip, actions } = this.props
        const { name, geometry } = this.state.selected
        actions.locations.create(activeTrip.id, {
            title: name,
            lat: geometry.location.lat,
            lng: geometry.location.lng,
        })
            .then(() => history.push(`/${activeTrip.id}`))
    }

    render () {
        const { history, activeTrip } = this.props

        return (
            <NavSidebarFrame>
                <div className='container-fluid'>
                    <CreateForm
                        loading={this.state.loading}
                        form={{
                            isValid: this.isFormValid
                        }}
                        values={{
                            searchText: this.state.searchText,
                            selected: this.state.selected,
                            suggestions: this.state.suggestions,
                        }}
                        actions={{
                            onInputChange: this.onInputChange,
                            onSelect: this.handleSelect,
                            onSubmit: this.onSubmit,
                            onCancel: () => history.push(`/${activeTrip.id}`),
                        }}
                    />
                </div>
            </NavSidebarFrame>
        )
    }
}

const mapStateToProps = state => ({
    activeTrip: trip.selectors.activeTripSelector(state),
})

const mapDispatchToProps = dispatch => ({
    actions: {
        locations: bindActionCreators(trip.actions.locations, dispatch),
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withTripDetail(Create))
