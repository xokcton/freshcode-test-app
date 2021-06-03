import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Header from '../Header'
import Boards from './Boards'
import { getBoards } from '../../actions/boards'
// import { getLists } from '../../actions/lists'

export default function BoardsPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBoards())
    // dispatch(getLists())
  }, [dispatch])

  return (
    <div className="container-fluid boardsOutside">
      <Header />
      <div className="container-fluid">
        <div className="container-fluid personalBoardHeader d-flex flex-row justify-content-start align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
          <h5 className="personalBoardBlock">Personal Boards</h5>
        </div>
        <div className="container d-flex justify-content-center align-items-center">
          <Boards />
        </div>
      </div>
    </div>
  )
}
