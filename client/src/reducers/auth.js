/* eslint-disable import/no-anonymous-default-export */
import * as variant from '../constants'

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case variant.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
      return { ...state, authData: action?.data }
    case variant.LOGOUT:
      localStorage.clear()
      return { ...state, authData: null }
    default:
      return state
  }
}

export default authReducer