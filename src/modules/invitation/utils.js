/**
 * Creates an invitation link from an invitation id.
 * @param {string} id 
 */
export const createInviteLink = (id) => {
    if (!window) {
        throw Error('window must be in scope to create an invitation link.')
    }
    return `${window.location.origin}/ml/join/${id}`
}
