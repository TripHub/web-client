import { NAME } from './constants'

export const types = {
    SET: `${NAME}/SET`,
}

export const set = ({ email, name, nickname, emailVerified, picture }) => ({
    type: types.SET,
    payload: { email, name, nickname, emailVerified, picture }
})
