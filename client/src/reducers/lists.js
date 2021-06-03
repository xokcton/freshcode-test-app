/* eslint-disable import/no-anonymous-default-export */
import * as variant from '../constants'

export default (lists = [], action) => {
  switch (action.type) {
    case variant.FETCH_ALL_LISTS:
      return action.payload
    case variant.CREATE_LIST:
      return [...lists, action.payload]
    case variant.UPDATE_LIST:
      return lists.map((list) => list._id === action.payload._id ? action.payload : list)
    case variant.DELETE_LIST:
      return lists.filter((list) => list._id !== action.payload)
    default:
      return lists
  }
}