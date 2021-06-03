/* eslint-disable import/no-anonymous-default-export */
import * as variant from '../constants'

export default (boards = [], action) => {
  switch (action.type) {
    case variant.FETCH_ALL:
      return action.payload
    case variant.CREATE:
      return [...boards, action.payload]
    case variant.UPDATE:
      return boards.map((board) => board._id === action.payload._id ? action.payload : board)
    case variant.DELETE:
      return boards.filter((board) => board._id !== action.payload)
    default:
      return boards
  }
}