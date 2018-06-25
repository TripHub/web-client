import React from 'react'
import { arrayOf, object, number } from 'prop-types'
import { Link } from 'react-router-dom'

const List = ({ order, entities }) => {
    return (
        <div className='list-group'>
            {
                order.map(id => {
                    const trip = entities[id]
                    return (
                        <Link
                            className='list-group-item list-group-item-action'
                            to={`/${id}`}
                            key={id}
                        >
                            <div>
                                <strong>{trip.title}</strong>
                                <small>{trip.description}</small>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

List.propTypes = {
    order: arrayOf(number).isRequired,
    entities: object.isRequired
}

export default List
