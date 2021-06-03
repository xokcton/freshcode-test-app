import React, { useEffect } from 'react'
import AddList from './Lists/AddList'
import List from './Lists/List'
import { useSelector, useDispatch } from 'react-redux'
// import { DragDropContext } from 'react-beautiful-dnd'
import { getCards } from '../../actions/cards'

export default function Notes({ boardName }) {
  const lists = useSelector((state) => state.lists)
  const dispatch = useDispatch()
  const activities = useSelector((state) => state.activities)

  const getProperActivities = () => {
    let properActivities
    if (activities)
      properActivities = activities.filter(elem => elem.boardId === window.location.href.split('/')[window.location.href.split('/').length - 1])
    else
      properActivities = []
    return properActivities.reverse()
  }

  useEffect(() => {
    dispatch(getCards())
  }, [dispatch])

  const getLists = () => {
    let properLists
    if (lists)
      properLists = lists.filter(elem => elem.boardId === window.location.href.split('/')[window.location.href.split('/').length - 1])
    else
      properLists = []
    return properLists
  }

  // const handleDragEnd = ({ destination, source }) => {
  //   if (!destination)
  //     return

  //   if (destination.index === source.index && destination.droppableId === source.droppableId)
  //     return

  //   const itemCopy = { ...state[source.droppableId].items[source.index] }

  //   setState(prev => {
  //     prev = { ...prev }
  //     //remove from previous items array
  //     prev[source.droppableId].items.splice(source.index, 1)
  //     // adding to new items array location
  //     prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)
  //     return prev
  //   })
  // }

  return (
    <div className="row d-flex justify-content-center justify-content-xl-start">
      {
        getLists().length > 0 ? getLists().map(list => <List list={list} key={list._id} Actions={getProperActivities()} boardTitle={boardName} />) : ''
        // <DragDropContext onDragEnd={handleDragEnd}>
        //   {_.map(state, (data, key) => {
        //     return (
        // <List lists={Lists} s={state} data={data} Key={key} key={key} />
        //     )
        //   })}
        // </DragDropContext>
      }
      <AddList boardTitle={boardName} />
    </div>
  )
}
