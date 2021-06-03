import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createList } from '../../../actions/lists'
import { createActivity } from '../../../actions/activities'

export default function AddList({ boardTitle }) {
  const [listTitle, setListTitle] = useState('')
  const input = useRef()
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    removeClasses()

    if (!listTitle || listTitle.length < 2) {
      input.current.style.animationName = 'inputShake'
      setTimeout(() => {
        input.current.style.removeProperty('animation-name')
      }, 500);
      return setListTitle('')
    }

    saveToBD()
    setListTitle('')
    // window.location.reload()
  }

  const saveToBD = () => {
    const boardId = window.location.href.split('/')[window.location.href.split('/').length - 1]
    const { result } = JSON.parse(localStorage.getItem('profile'))

    const activity = {
      activityText: `${result.name} added ${listTitle} to ${boardTitle}`,
      userImg: result.imageUrl || '',
      boardId: boardId
    }

    dispatch(createActivity(activity))
    dispatch(createList({ title: listTitle, boardId }))
  }

  const handleInputChange = e => {
    if (listTitle) {
      if (listTitle?.length < 2) {
        input.current?.classList.add('addListTitleFormWrong')
        input.current?.classList.remove('addListTitleFormSuccess')
      }
      else {
        input.current?.classList.remove('addListTitleFormWrong')
        input.current?.classList.add('addListTitleFormSuccess')
      }
    } else {
      removeClasses()
    }
  }

  const removeClasses = () => {
    input.current?.classList.remove('addListTitleFormWrong')
    input.current?.classList.remove('addListTitleFormSuccess')
  }

  return (
    <div className="listFormWrapper col-12 col-lg-6 col-xl-4 me-2 ms-3 mb-4">
      <form disabled onSubmit={handleSubmit} className="listFormContent">
        <input ref={input} type="text" name="listTitle" placeholder="Add a list..." className="addListTitleForm" value={listTitle} onChange={(e) => setListTitle(e?.target.value)} onInput={handleInputChange()} />
      </form>
    </div>
  )
}
