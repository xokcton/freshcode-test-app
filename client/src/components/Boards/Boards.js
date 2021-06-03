import React from 'react'
import { useSelector } from 'react-redux'
import BoardForm from './BoardForm/BoardForm'
import Board from './Board/Board'

export default function Boards() {
  const boards = useSelector((state) => state.boards)

  return (
    <div className="row d-flex justify-content-center justify-content-xl-start align-items-center">
      {boards && boards.map(board => <Board boards={boards} title={board.title} userId={board.userId} key={board._id} id={board._id} />)}
      <BoardForm />
    </div>
  )
}
