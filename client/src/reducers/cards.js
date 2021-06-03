/* eslint-disable import/no-anonymous-default-export */
import * as variant from '../constants'

export default (cards = [], action) => {
  switch (action.type) {
    case variant.FETCH_ALL_CARDS:
      return action.payload
    case variant.CREATE_CARD:
      return [...cards, action.payload]
    case variant.UPDATE_CARD:
      return cards.map((card) => card._id === action.payload._id ? action.payload : card)
    case variant.DELETE_CARD:
      return cards.filter((card) => card._id !== action.payload)
    default:
      return cards
  }
}