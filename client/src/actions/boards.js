import * as api from '../api'
import * as variant from '../constants'

export const getBoards = () => async (dispatch) => {
  try {
    const { data } = await api.fetchBoards()

    dispatch({ type: variant.FETCH_ALL, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const createBoard = (board) => async (dispatch) => {
  try {
    const { data } = await api.createBoard(board)

    dispatch({ type: variant.CREATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const updateBoard = (id, board) => async (dispatch) => {
  try {
    const { data } = await api.updateBoard(id, board)

    dispatch({ type: variant.UPDATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deleteBoard = (id) => async (dispatch) => {
  try {
    await api.deleteBoard(id)

    dispatch({ type: variant.DELETE, payload: id })
  } catch (error) {
    console.log(error)
  }
}