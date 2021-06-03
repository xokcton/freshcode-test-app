import React, { useState } from 'react'
import Menu from '../../Menu/Menu'
import Modal from '../../Modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { updateBoard, deleteBoard } from '../../../actions/boards'
import { history } from '../../../App'
import moment from 'moment'

export default function NotesForm({ id, userID, setAction }) {
  const [showMenu, setShowMenu] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const gId = JSON.parse(localStorage.getItem('profile'))?.result?.googleId || JSON.parse(localStorage.getItem('profile'))?.result?._id
  const [updateData, setUpdateData] = useState({ title: '', userId: userID })
  const dispatch = useDispatch()
  const activities = useSelector((state) => state.activities)

  const getProperActivities = () => {
    let properActivities
    if (activities)
      properActivities = activities.filter(elem => elem.boardId === window.location.href.split('/')[window.location.href.split('/').length - 1])
    else
      properActivities = []

    let lastThree = []
    if (properActivities.length > 3)
      lastThree = properActivities.reverse().slice(0, 3)
    else
      lastThree = properActivities.reverse()

    return lastThree
  }

  const handleClick = () => {
    setShowMenu(true)
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(updateBoard(id, updateData))
    setAction(updateData)
    setUpdateData({ ...updateData, title: '' })
    setShowModal(false)
  }

  const handleDelete = () => {
    const _id = id || window.location.href.split('/')[window.location.href.split('/').length - 1]
    dispatch(deleteBoard(_id))
    history.push('/board')
  }

  const clear = e => {
    e.preventDefault()
    setUpdateData({ ...updateData, title: '' })
  }

  return (
    <>
      <Modal active={showModal} setActive={setShowModal}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Board Title</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={updateData.title} onChange={e => setUpdateData({ ...updateData, title: e.target.value })} />
            <div id="emailHelp" className="form-text">Enter more than 1 character!</div>
          </div>
          <button type="submit" className={updateData.title ? "btn btn-primary" : "btn btn-primary disabled"}>Submit</button>
          <button onClick={clear} className={updateData.title ? "btn btn-danger ms-2" : "btn btn-danger disabled ms-2"}>Clear</button>
        </form>
      </Modal>
      <Menu active={showMenu} setActive={setShowMenu}>
        <div className="notesPageMenuBlock d-flex flex-column align-items-center">
          <div className="notesPageMenuHeader">
            <h4>Menu</h4>
            <button onClick={() => setShowMenu(false)}>
              &#10006;
            </button>
          </div>
          <div className="notesPageMenuBoardActions">
            <button onClick={() => handleDelete()} disabled={gId !== userID}>
              Remove board
            </button>
            <button onClick={() => setShowModal(true)}>
              Edit board title
            </button>
          </div>
          <div className="notesPageMenuActivity d-flex flex-column align-items-center justify-constent-start">
            <div className="notesPageMenuActivityHeader d-flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-card-heading" viewBox="0 0 16 16">
                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                <path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z" />
              </svg>
              <p>
                Latest activity
              </p>
            </div>
            <div className="notesPageMenuActivityBody d-flex flex-column align-items-center justify-constent-center">

              {
                getProperActivities().length > 0 ? getProperActivities().map(element => (
                  <div className="notesPageMenuActivityBodyActivitiesWrapper d-flex align-items-center justify-constent-center mb-2" key={element._id}>
                    <div className="notesPageMenuActivityBodyActivitiesIcon">
                      {element.userImg ? <img src={element.userImg} alt={element.boardId} className="notesPageMenuActivityBodyActivitiesIconImg" /> : element.activityText.charAt(0)}
                    </div>
                    <div className="notesPageMenuActivityBodyActivitiesRightSide">
                      <div className="notesPageMenuActivityBodyActivitiesRightSideUp">
                        {element.activityText}
                      </div>
                      <div className="notesPageMenuActivityBodyActivitiesRightSideDown">
                        {moment(element.createdAt).fromNow()}
                      </div>
                    </div>
                  </div>
                )) : 'Nothing to show'
              }

            </div>
          </div>
        </div>
      </Menu>
      <button className="notesPageBlockButton" onClick={() => handleClick()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
        </svg>
        <u>
          Show Menu
        </u>
      </button>
    </>
  )
}
