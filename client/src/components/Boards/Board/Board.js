import React from 'react'
import { history } from '../../../App'

export default function Board({ boards, title, userId, id }) {
  const handleClick = () => {
    history.push(`/boards/${id}`, { boards })
  }
  const gId = JSON.parse(localStorage.getItem('profile'))?.result?.googleId || JSON.parse(localStorage.getItem('profile'))?.result?._id

  return (
    <div className={
      userId === gId ? "boardElementBlock boardAuthBorder col-12 col-md-6 col-lg-4 col-xl-3 me-2 ms-3" : "boardElementBlock col-12 col-md-6 col-lg-4 col-xl-3 me-2 ms-3"
    } onClick={() => handleClick()}>
      {title}
    </div>
  )
}
