import React, { useState } from 'react'
import Card from '../Cards/Card'
import { useDispatch, useSelector } from 'react-redux'
// import { Droppable } from 'react-beautiful-dnd'
import { deleteList, updateList } from '../../../actions/lists'
import { createCard } from '../../../actions/cards'
import { createActivity } from '../../../actions/activities'

export default function List({ list, Actions, boardTitle }) {
  const [showTitleInput, setShowTitleInput] = useState(false)
  const [titleList, setTitleList] = useState({ ...list })
  const [localState, setLocalState] = useState('')
  const [formCardTitle, setFormCardTitle] = useState({ listId: list._id, title: '' })
  const [isClicked, setIsClicked] = useState(false)
  const dispatch = useDispatch()
  const cards = useSelector((state) => state.cards)

  const getCards = () => {
    let properCards
    if (cards)
      properCards = cards.filter(elem => elem.listId === list._id)
    else
      properCards = []
    return properCards
  }

  const handleDoubleClick = () => {
    setLocalState(list.title)
    setTitleList({ ...list })
    setShowTitleInput(true)
  }

  const saveListToBD = (id, data) => dispatch(updateList(id, data))

  const handleSubmit = e => {
    e.preventDefault()

    if (!titleList.title || titleList.title.length < 2) {
      setTitleList({ ...list, title: localState })
      return setShowTitleInput(false)
    }
    setTitleList({ ...list, title: titleList.title })
    saveListToBD(titleList._id, titleList)
    setShowTitleInput(false)
  }

  const handleBlur = () => {
    if (!titleList.title || titleList.title.length < 2) {
      setTitleList({ ...list, title: localState })
      return setShowTitleInput(false)
    }
    setTitleList({ ...list, title: titleList.title })
    saveListToBD(titleList._id, titleList)
    setShowTitleInput(false)
  }

  const handleDeleteClick = () => {
    const { result } = JSON.parse(localStorage.getItem('profile'))

    const activity = {
      activityText: `${result.name} removed ${list.title} from ${boardTitle}`,
      userImg: result.imageUrl || '',
      boardId: window.location.href.split('/')[window.location.href.split('/').length - 1]
    }

    dispatch(createActivity(activity))
    dispatch(deleteList(list._id))
  }

  const handleClick = () => {
    setIsClicked(true)
  }

  const handleFromSubmit = e => {
    e.preventDefault()

    const { result } = JSON.parse(localStorage.getItem('profile'))

    const activity = {
      activityText: `${result.name} added ${formCardTitle.title} to ${list.title}`,
      userImg: result.imageUrl || '',
      boardId: window.location.href.split('/')[window.location.href.split('/').length - 1]
    }

    dispatch(createActivity(activity))
    dispatch(createCard(formCardTitle))

    setIsClicked(false)
    setFormCardTitle({ listId: list._id, title: '' })
  }

  const handleCrossClick = () => {
    setIsClicked(false)
    setFormCardTitle({ listId: list._id, title: '' })
  }

  return (
    <div className="listBlock col-12 col-lg-6 col-xl-4 me-2 ms-3 mb-4 align-self-start">
      <div className="listBlockHeader d-flex align-items-center justify-content-between">
        {
          showTitleInput ?
            <form onSubmit={handleSubmit} className="listBlockHeaderTitleForm">
              <input onBlur={handleBlur} autoFocus type="text" name="titleList" placeholder="Add a list..." className="addTitleListForm" value={titleList.title} onChange={(e) => setTitleList({ ...list, title: e?.target.value })} />
            </form> :
            <div onDoubleClick={handleDoubleClick} className="listBlockHeaderTitle" >
              {titleList.title}
            </div>
        }
        <button className="listBlockHeaderIcon" onClick={handleDeleteClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
          </svg>
        </button>
      </div>
      {/* <Droppable key={Key} droppableId={Key}>
        {(provided) => {
          return ( */}
      <div
        // ref={provided.innerRef}
        // {...provided.droppableProps}
        className="listBlockBody d-flex flex-column"
      >
        {/* {
                data.items.map((el, index) => {
                  return ( */}
        {
          getCards().length > 0 ? getCards().map(card => <Card card={card} key={card._id} boardTitle={list.title} actions={Actions} />) : ''
          // <DragDropContext onDragEnd={handleDragEnd}>
          //   {_.map(state, (data, key) => {
          //     return (
          // <List lists={Lists} s={state} data={data} Key={key} key={key} />
          //     )
          //   })}
          // </DragDropContext>
        }
        {/* )
                })
              }
              {
                provided.placeholder
              } */}
      </div>
      {/* )
        }}
      </Droppable> */}
      {
        isClicked ?
          <form onSubmit={handleFromSubmit} className="listBlockFooter listBlockFooterForm d-flex flex-column">
            <input type="text" name="cardTitle" value={formCardTitle.title} onChange={(e) => setFormCardTitle({ ...formCardTitle, title: e.target.value })} className="listBlockFooterInput" />
            <div className=" d-flex align-items-center">
              <button type="submit" className="btn btn-success btn-sm mt-2 me-2" disabled={formCardTitle.title?.length > 1 ? false : true}>Add</button>
              <button onClick={handleCrossClick} className="listBlockFooterCross mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>
          </form> :
          <div onClick={handleClick} className="listBlockFooter">
            Add a card...
          </div>
      }
    </div>
  )
}
