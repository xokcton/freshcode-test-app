/* eslint-disable import/no-anonymous-default-export */
import * as variant from '../constants'

export default (comments = [], action) => {
  switch (action.type) {
    case variant.FETCH_ALL_COMMENTS:
      return action.payload
    case variant.CREATE_COMMENT:
      return [...comments, action.payload]
    default:
      return comments
  }
}