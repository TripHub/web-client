import axios from 'axios'

import Auth from './auth'

/**
 * Exports instance of axios with base URL and authorization headers
 * set (if available)
 */
export default () => {
    return axios.create({
        baseURL: `${process.env.REACT_APP_SERVICES_TRIP}/v1`,
        headers: {
            Authorization: `Bearer ${Auth.accessToken}`
        }
    })
}
