import * as api from '../api'
import * as variant from '../constants'

export const getLists = () => async (dispatch) => {
  try {
    const { data } = await api.fetchLists()

    dispatch({ type: variant.FETCH_ALL_LISTS, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const createList = (list) => async (dispatch) => {
  try {
    const { data } = await api.createList(list)

    dispatch({ type: variant.CREATE_LIST, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const updateList = (id, list) => async (dispatch) => {
  try {
    const { data } = await api.updateList(id, list)

    dispatch({ type: variant.UPDATE_LIST, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deleteList = (id) => async (dispatch) => {
  try {
    await api.deleteList(id)

    dispatch({ type: variant.DELETE_LIST, payload: id })
  } catch (error) {
    console.log(error)
  }
}