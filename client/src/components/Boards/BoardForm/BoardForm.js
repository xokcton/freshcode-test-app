import React, { useState } from 'react'
import Modal from '../../Modal/Modal'
import { useDispatch } from 'react-redux'
import { createBoard } from '../../../actions/boards'

export default function BoardForm() {
  const [showModal, setShowModal] = useState(false)
  const gId = JSON.parse(localStorage.getItem('profile'))?.result?.googleId || JSON.parse(localStorage.getItem('profile'))?.result?._id
  const [postData, setPostData] = useState({ title: '', userId: gId })
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(createBoard(postData))
    setPostData({ ...postData, title: '' })
    setShowModal(false)
  }

  const clear = e => {
    e.preventDefault()
    setPostData({ ...postData, title: '' })
  }

  return (
    <>
      <Modal active={showModal} setActive={setShowModal}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Board Title</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={postData.title} onChange={e => setPostData({ ...postData, title: e.target.value })} />
            <div id="emailHelp" className="form-text">Enter more than 1 character!</div>
          </div>
          <button type="submit" className={postData.title ? "btn btn-primary" : "btn btn-primary disabled"}>Submit</button>
          <button onClick={clear} className={postData.title ? "btn btn-danger ms-2" : "btn btn-danger disabled ms-2"}>Clear</button>
        </form>
      </Modal>
      <button className="boardForm boardElementBlock col-12 col-md-6 col-lg-4 col-xl-3 me-2 ms-3" onClick={() => setShowModal(true)}>
        Create new board...
      </button>
    </>
  )
}
