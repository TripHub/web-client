import axios from 'axios'

import Auth from './auth'

/**
 * Exports instance of axios with base URL and authorization headers
 * set (if available)
 */
export default () => {
    const accessToken = Auth.accessToken
    return axios.create({
        baseURL: process.env.REACT_APP_SERVICES_TRIP,
        headers: {
            Authorization: `Token ${accessToken}`
        }
    })
}
