import { combineReducers } from 'redux'

import boards from './boards'
import auth from './auth'
import lists from './lists'
import cards from './cards'
import comments from './comments'
import activities from './activities'

export default combineReducers({
  boards,
  auth,
  lists,
  cards,
  comments,
  activities
})