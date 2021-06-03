import * as api from '../api'
import * as variant from '../constants'

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData)

    dispatch({ type: variant.AUTH, data })

    window.location.reload()
  } catch (error) {
    console.log(error)
  }
}

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData)

    dispatch({ type: variant.AUTH, data })

    window.location.reload()
  } catch (error) {
    console.log(error)
  }
}