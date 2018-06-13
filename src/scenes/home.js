import React from 'react'

import Nav from '../modules/core/nav'

class Home extends React.Component {
    render () {
        return (
            <React.Fragment>
                <Nav />
                <div>Welcome home :)</div>
            </React.Fragment>
        )
    }
}

export default Home
