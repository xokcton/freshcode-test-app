import * as api from '../api'
import * as variant from '../constants'

export const getActivities = () => async (dispatch) => {
  try {
    const { data } = await api.fetchActivities()

    dispatch({ type: variant.FETCH_ALL_ACTIVITIES, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const createActivity = (activity) => async (dispatch) => {
  try {
    const { data } = await api.createActivity(activity)

    dispatch({ type: variant.CREATE_ACTIVITY, payload: data })
  } catch (error) {
    console.log(error)
  }
}