/* eslint-disable import/no-anonymous-default-export */
import * as variant from '../constants'

export default (activities = [], action) => {
  switch (action.type) {
    case variant.FETCH_ALL_ACTIVITIES:
      return action.payload
    case variant.CREATE_ACTIVITY:
      return [...activities, action.payload]
    default:
      return activities
  }
}