import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCard, deleteCard } from '../../actions/cards'
import { createComment } from '../../actions/comments'
import moment from 'moment'
import CommentsModal from '../Modal/CommentsModal'
import { createActivity } from '../../actions/activities'

export default function CardModal({ active, setActive, card, boardTitle, activities }) {
  const [showActivityLog, setShowActivityLog] = useState(false)
  const [textareaValue, setTextareaValue] = useState({ ...card, description: card.description || '' })
  const [textareaLocalValue, setTextareaLocalValue] = useState({ ...card, description: card.description || '' })
  const [isDoubleClicked, setIsDoubleClicked] = useState(false)
  const [isCardFormDoubleClicked, setIsCardFormDoubleClicked] = useState(false)
  const [isCommentsVisible, setIsCommentsVisible] = useState(false)
  // const [userInfo] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()
  const comments = useSelector((state) => state.comments)
  const [areaTextComment, setAreaTextComment] = useState({ text: '', cardId: card._id, userImg: JSON.parse(localStorage.getItem('profile')).result.userImg || "", userName: JSON.parse(localStorage.getItem('profile')).result.name })

  const handleRemoveCard = () => {
    const { result } = JSON.parse(localStorage.getItem('profile'))

    const activity = {
      activityText: `${result.name} removed ${card.title} from ${boardTitle}`,
      userImg: result.imageUrl || '',
      boardId: window.location.href.split('/')[window.location.href.split('/').length - 1]
    }

    dispatch(createActivity(activity))
    dispatch(deleteCard(card._id))
    setActive(false)
  }

  const saveCardToBD = (id, data) => dispatch(updateCard(id, data))

  const handleHideDetails = () => {
    if (showActivityLog || getProperActivities().length < 1)
      setShowActivityLog(false)
    else
      setShowActivityLog(true)
  }

  const handleDescriptionDoubleClick = () => {
    setTextareaValue({ ...textareaValue })
    setIsDoubleClicked(true)
  }

  const handleDescriptionTextAreaSubmit = e => {
    e?.preventDefault()
    checkErrors()
    saveCardToBD(card._id, textareaValue)
  }

  const handleDescriptionBlur = () => {
    checkErrors()
    saveCardToBD(card._id, textareaValue)
  }

  const handleFormInputCardTitle = e => {
    e.preventDefault()
    setTextareaValue({ ...textareaValue, title: textareaValue.title })
    saveCardToBD(card._id, textareaValue)
    setIsCardFormDoubleClicked(false)
  }

  const handleDoubleClickCardTitle = () => {
    setIsCardFormDoubleClicked(true)
  }

  const handleBlurCardTitle = () => {
    setTextareaValue({ ...textareaValue, title: textareaValue.title })
    saveCardToBD(card._id, textareaValue)
    setIsCardFormDoubleClicked(false)
  }

  const checkErrors = () => {
    if (!textareaValue.description || textareaValue.description.length < 6) {
      setTextareaValue({ ...textareaLocalValue })
      return setIsDoubleClicked(false)
    }
    setTextareaValue({ ...textareaValue, description: textareaValue.description })
    setTextareaLocalValue({ ...textareaValue, description: textareaValue.description })
    setIsDoubleClicked(false)
  }

  const handleBodyCommentInnerSubmit = e => {
    e.preventDefault()
    const { result } = JSON.parse(localStorage.getItem('profile'))

    const activity = {
      activityText: `${result.name} added his comment to ${card.title}`,
      userImg: result.imageUrl || '',
      boardId: window.location.href.split('/')[window.location.href.split('/').length - 1]
    }

    dispatch(createActivity(activity))
    dispatch(createComment(areaTextComment))
    setAreaTextComment({ text: '', cardId: card._id, userImg: JSON.parse(localStorage.getItem('profile')).result.userImg || "", userName: JSON.parse(localStorage.getItem('profile')).result.name })
  }

  const handleToggleCommentsVisibility = () => {
    if (getComments().length < 1)
      return
    if (isCommentsVisible)
      setIsCommentsVisible(false)
    else
      setIsCommentsVisible(true)
  }

  const getComments = () => {
    let properComments = []
    if (comments)
      properComments = comments.filter(elem => elem.cardId === card._id)
    else
      properComments = []

    let lastThree = []
    if (properComments.length > 3)
      lastThree = properComments.reverse().slice(0, 3)
    else
      lastThree = properComments.reverse()

    return lastThree
  }

  const getProperActivities = () => {
    let lastFive = []
    if (activities.length > 5)
      lastFive = activities.slice(0, 5)
    else
      lastFive = activities

    return lastFive
  }

  return (
    <>
      {
        (isCommentsVisible && getComments().length > 0) ?
          <CommentsModal active={isCommentsVisible} setActive={setIsCommentsVisible}>
            <div className="lastThreeComments d-flex flex-column align-items-center justify-content-center mt-2 mb-2">
              {
                getComments().length > 0 ?
                  getComments().map(element => (
                    <div key={element._id} className="styledLastThreeComments d-flex mb-1">
                      <div className="styledLastThreeCommentsLeft me-2 pt-1 ps-1">
                        {element.imageUrl ? <img src={element.imageUrl} alt={element.userName} /> : <div className="userNameAvatarFirstLetterInCard">{element.userName.charAt(0)}</div>}
                      </div>
                      <div className="styledLastThreeCommentsRight d-flex flex-column">
                        <div className="styledLastThreeCommentsRightTop d-flex">
                          <b className="me-2">
                            {element.userName.length > 20 ? (element.userName.substr(0, 20) + '...') : element.userName}
                          </b>
                          <small className="mt-1 styledLastThreeCommentsRightTopSmall">{moment(element.createdAt).fromNow()}</small>
                        </div>
                        <div className="styledLastThreeCommentsRightBottom">
                          {
                            element.text.length > 100 ? (element.text.substr(0, 100) + '...') : element.text
                          }
                        </div>
                      </div>
                    </div>
                  )) : ''
              }
            </div>
          </CommentsModal> :
          ''
      }
      <div className={active ? "CardModal active" : "CardModal"} onClick={() => setActive(false)}>
        <div className={active ? "CardModal__content active" : "CardModal__content"} onClick={e => e.stopPropagation()}>
          <div className="CardModal__contentHeader d-flex justify-content-between align-items-center">
            <div className="CardModal__contentHeaderLeft d-flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-credit-card-2-back" viewBox="0 0 16 16">
                <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
              </svg>
              <h4 className="ms-3 CardModal__contentHeaderLeftTitle" onDoubleClick={handleDoubleClickCardTitle}>
                {
                  isCardFormDoubleClicked ?
                    <form onSubmit={handleFormInputCardTitle}>
                      <input onBlur={handleBlurCardTitle} autoFocus onChange={e => setTextareaValue({ ...textareaValue, title: e.target.value })} type="text" value={textareaValue.title} name="cardTitleText" className="CardModal__contentHeaderLeftTitleInput" />
                    </form> :
                    (
                      textareaValue.title.length > 5 ?
                        (textareaValue.title.substr(0, 6) + '...') :
                        textareaValue.title
                    )
                }
              </h4>
            </div>
            <div className="CardModal__contentHeaderRight d-flex">
              <div onClick={handleRemoveCard} className="CardModal__contentHeaderRightDeleteButton me-4 d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eraser" viewBox="0 0 16 16">
                  <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
                </svg>
                <p className="ms-2">
                  Remove Card
              </p>
              </div>
              <button onClick={() => setActive(false)} className="CardModal__contentHeaderRightCloseButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="inListSubTitle d-flex mb-4">
            in list <u className="ps-1">{boardTitle.length > 5 ? (boardTitle.substr(0, 6) + '...') : boardTitle}</u>
          </div>
          <div className="CardModal__contentBodyComment d-flex flex-column justify-content-center align-items-center mb-3">
            <div className="CardModal__contentBodyCommentDescriptionHead d-flex flex-row align-self-start align-items-center mb-3 ms-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
              </svg>
              <p className="CardModal__contentBodyCommentDescriptionText ms-2">
                Add Comment
            </p>
            </div>
            <div className="CardModal__contentBodyCommentInner">
              <form onSubmit={handleBodyCommentInnerSubmit} className="d-flex flex-column CardModal__contentBodyCommentInnerForm">
                <textarea onChange={e => setAreaTextComment({ ...areaTextComment, text: e.target.value })} value={areaTextComment.text} className="CardModal__contentBodyCommentInnerTextArea" name="comment" placeholder="Write a comment..."></textarea>
                <button disabled={areaTextComment.text.length > 6 ? false : true} type="submit" className="btn btn-small btn-success CardModal__contentBodyCommentInnerTextAreaButton">Save</button>
              </form>
              <div onClick={handleToggleCommentsVisibility} className="CardModal__contentBodyCommentInnerToggleVisibilityWrapper d-flex flex-row-reverse">
                <div className="CardModal__contentBodyCommentInnerToggleVisibility">
                  {
                    isCommentsVisible ? 'Hide ' : 'Show '
                  }
                last 3 comments
              </div>
              </div>
            </div>
            {/* if any comments */}
          </div>
          <div className="CardModal__contentBody d-flex flex-column justify-content-center align-items-center">
            <div className="CardModal__contentBodyDescriptionHead d-flex flex-row align-self-start align-items-center mb-2 ms-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-justify-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
              </svg>
              <p className="CardModal__contentBodyDescriptionText ms-2">
                Description
            </p>
            </div>
            <div className="CardModal__contentBodyDescription ms-4 me-4" onDoubleClick={handleDescriptionDoubleClick}>
              {
                isDoubleClicked ?
                  <form onSubmit={handleDescriptionTextAreaSubmit} onBlur={handleDescriptionBlur}>
                    <textarea autoFocus className="CardModal__contentBodyDescriptionTextArea" value={textareaValue.description} onChange={e => setTextareaValue({ ...textareaValue, description: e.target.value })}>
                    </textarea>
                    <button type="submit" className="btn btn-sm btn-success" disabled={textareaValue.description.length < 6 ? true : false}>
                      Save
                  </button>
                  </form> :
                  <div className="CardModal__contentBodyDescriptionPadding">
                    {textareaValue.description || 'Here should be a description... So double click over here'}
                  </div>
              }
            </div>
          </div>
          <div className="CardModal__contentFooter d-flex flex-column aling-items-center justify-content-center mt-2">
            <div className="d-flex justify-content-between">
              <div className="CardModal__contentFooterActivity d-flex ms-2 mt-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-card-heading" viewBox="0 0 16 16">
                  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                  <path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z" />
                </svg>
                <p className="CardModal__contentFooterActivityTitle ms-2">
                  Latest activity
              </p>
              </div>
              <div onClick={handleHideDetails} className="d-flex me-2 mt-3 CardModal__contentFooterHideDetails">
                {
                  showActivityLog ? 'Hide ' : 'Show '
                }
              Details
            </div>
            </div>
          </div>
        </div>
      </div>
      {
        (showActivityLog && getProperActivities().length > 0) &&
        <CommentsModal active={showActivityLog} setActive={setShowActivityLog}>
          <div className="showActivityLogLastFiveInCard d-flex flex-column align-self-center ms-5">

            {
              getProperActivities().map(element => (
                <div className="showActivityLogLastFiveInCardWrapper d-flex mb-2" key={element._id}>
                  <div className="showActivityLogLastFiveInCardWrapperLeft">
                    {element.userImg ? <img src={element.userImg} alt={element.boardId} className="notesPageMenuActivityBodyActivitiesIconImgInActionsLog" /> : element.activityText.charAt(0)}
                  </div>
                  <div className="showActivityLogLastFiveInCardWrapperRight">
                    <div className="showActivityLogLastFiveInCardWrapperRightTop">
                      {element.activityText}
                    </div>
                    <div className="showActivityLogLastFiveInCardWrapperRightBottom">
                      {moment(element.createdAt).fromNow()}
                    </div>
                  </div>
                </div>
              ))
            }

          </div>
        </CommentsModal>
      }
    </>
  )
}
