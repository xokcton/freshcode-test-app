import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })
const boards = '/boards'
const users = '/user'
const lists = '/lists'
const cards = '/cards'
const comments = '/comments'
const activities = '/activities'

export const fetchBoards = () => API.get(boards)
export const createBoard = (newBoard) => API.post(boards, newBoard)
export const updateBoard = (id, updatedBoard) => API.patch(`${boards}/${id}`, updatedBoard)
export const deleteBoard = (id) => API.delete(`${boards}/${id}/deleteBoard`)

export const signIn = (formData) => API.post(`${users}/signin`, formData)
export const signUp = (formData) => API.post(`${users}/signup`, formData)

export const fetchLists = () => API.get(lists)
export const createList = (newList) => API.post(lists, newList)
export const updateList = (id, updatedList) => API.patch(`${lists}/${id}`, updatedList)
export const deleteList = (id) => API.delete(`${lists}/${id}/deleteList`)

export const fetchCards = () => API.get(cards)
export const createCard = (newCard) => API.post(cards, newCard)
export const updateCard = (id, updatedCard) => API.patch(`${cards}/${id}`, updatedCard)
export const deleteCard = (id) => API.delete(`${cards}/${id}/deleteCard`)

export const fetchComments = () => API.get(comments)
export const createComment = (newComment) => API.post(comments, newComment)

export const fetchActivities = () => API.get(activities)
export const createActivity = (newActivity) => API.post(activities, newActivity)