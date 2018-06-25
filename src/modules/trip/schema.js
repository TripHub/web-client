import { schema } from 'normalizr'

export const member = new schema.Entity('members', {}, {
    idAttribute: 'user_id'
})
export const location = new schema.Entity('locations')
export const trip = new schema.Entity('trips', {
    locations: [location],
    members: [member]
})
