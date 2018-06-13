import auth0 from 'auth0-js'

export default class Auth {
    constructor () {
        this.auth0 = new auth0.WebAuth({
            domain: process.env.REACT_APP_AUTH_AUTH0_DOMAIN,
            clientID: process.env.REACT_APP_AUTH_AUTH0_CLIENT_ID,
            redirectUri: `${window.location.origin}/callback`,
            audience: `https://api.triphub.io`,
            responseType: 'token id_token',
            scope: 'openid email profile'
        })
    }

    static scope = 'triphub.client.web'
    static accessTokenName = `${Auth.scope}.auth.accessToken`
    static expiryTimeName = `${Auth.scope}.auth.expiryTime`
    static idTokenName = `${Auth.scope}.auth.idToken`

    /**
     * Boolean denoting whether client is authenticated.
     */
    static get isAuthenticated () {
        return Auth.accessToken && Auth.expiryTime > Date.now()
    }
    
    /**
     * Persist authentication details to local storage
     */
    static persist (accessTokenName, expiryTimeName, idTokenName = null) {
        window.localStorage.setItem(Auth.accessTokenName, accessTokenName)
        window.localStorage.setItem(Auth.expiryTimeName, expiryTimeName)
        window.localStorage.setItem(Auth.idTokenName, idTokenName)
    }

    /**
     * Get the access token from storage.
     */
    static get accessToken () {
        return window.localStorage.getItem(Auth.accessTokenName)
    }

    /**
     * Get the expiry time from storage.
     */
    static get expiryTime () {
        return window.localStorage.getItem(Auth.expiryTimeName)
    }

    /**
     * Get the id token from storage.
     */
    static get idToken () {
        return window.localStorage.getItem(Auth.idTokenName)
    }

    /**
     * Parse the window.location.hash
     * @param {string} callback 
     */
    parseHash (hash) {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash({ hash }, (error, authResult) => {
                return error
                    ? reject(error)
                    : resolve(authResult)
            })
        })
    }

    /**
     * Redirect to Auth0 login page.
     */
    login () {
        this.auth0.authorize()
    }
}
