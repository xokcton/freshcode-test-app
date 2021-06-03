import * as api from '../api'
import * as variant from '../constants'

export const getCards = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCards()

    dispatch({ type: variant.FETCH_ALL_CARDS, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const createCard = (card) => async (dispatch) => {
  try {
    const { data } = await api.createCard(card)

    dispatch({ type: variant.CREATE_CARD, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const updateCard = (id, card) => async (dispatch) => {
  try {
    const { data } = await api.updateCard(id, card)

    dispatch({ type: variant.UPDATE_CARD, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deleteCard = (id) => async (dispatch) => {
  try {
    await api.deleteCard(id)

    dispatch({ type: variant.DELETE_CARD, payload: id })
  } catch (error) {
    console.log(error)
  }
}