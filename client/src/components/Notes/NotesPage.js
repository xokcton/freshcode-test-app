import React, { useState, useEffect } from 'react'
import Header from '../Header'
import { useLocation } from "react-router-dom"
import { history } from '../../App'
import NotesForm from './NotesForm/NotesForm'
import Notes from './Notes'
import { useDispatch } from 'react-redux'
import { getLists } from '../../actions/lists'
import { getActivities } from '../../actions/activities'

export default function NotesPage() {
  const location = useLocation()
  const [board, setBoard] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLists())
    dispatch(getActivities())
  }, [dispatch])

  useEffect(() => {
    if (location.state) {
      const [tmp] = location.state.boards.filter((board) => board._id === window.location.href.split('/')[window.location.href.split('/').length - 1])
      setBoard(tmp)
    } else {
      history.push('/boards')
    }
  }, [location])

  useEffect(() => {
    if (!board) {
      setBoard({ title: '' })
    }
  }, [board])

  return (
    <div className="container-fluid boardsOutside">
      <Header />
      <div className="container-fluid notesPageContainer">
        <div className="container-fluid notesPageHeader d-flex flex-row justify-content-between align-items-center">
          <h5 className="notesPageBlock">{board.title}</h5>
          <NotesForm id={board._id} userID={board.userId} setAction={setBoard} />
        </div>
        <div className="container d-flex justify-content-center align-items-center">
          <Notes boardName={board.title} />
        </div>
      </div>
    </div>
  )
}
