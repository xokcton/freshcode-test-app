import * as api from '../api'
import * as variant from '../constants'

export const getComments = () => async (dispatch) => {
  try {
    const { data } = await api.fetchComments()

    dispatch({ type: variant.FETCH_ALL_COMMENTS, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const createComment = (comment) => async (dispatch) => {
  try {
    const { data } = await api.createComment(comment)

    dispatch({ type: variant.CREATE_COMMENT, payload: data })
  } catch (error) {
    console.log(error)
  }
}