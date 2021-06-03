import React, { useState, useEffect } from 'react'
import { history } from '../App'
import Profile from './Profile/Profile'
import { useDispatch } from 'react-redux'
import * as variant from '../constants'
import decode from 'jwt-decode'

export default function Header() {
  const [showProfile, setShowProfile] = useState(false)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()

  useEffect(() => {
    const token = user?.token

    if (token) {
      const decodedToken = decode(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout()
        window.location.reload()
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleReferrer = (e) => {
    return history.push('/boards')
  }

  const logout = () => {
    dispatch({ type: variant.LOGOUT })
    history.push('/auth')
    window.location.reload()

    setUser(null)
  }

  return (
    <div className="container-fluid boardsNav d-flex flex-row justify-content-between align-items-center">
      <button className="boardsLink d-flex flex-row justify-content-between align-items-center" onClick={() => handleReferrer()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-kanban-fill" viewBox="0 0 16 16">
          <path d="M2.5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-11zm5 2h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm-5 1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm9-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
        </svg>
        <p className="boardsLinkTitle">Boards</p>
      </button>
      <button className="boardsAvatar d-flex flex-row justify-content-center align-items-center" onClick={() => setShowProfile(true)}>
        {user.result.name.charAt(0)}
      </button>
      {user && (
        <Profile active={showProfile} setActive={setShowProfile}>
          <div className="d-flex flex-column align-items-center profileInner">
            <div className="profileInnerHeader d-flex flex-column align-items-center">
              {user.result.imageUrl ? <img src={user.result.imageUrl} alt={user.result.name} /> : <div className="userNameAvatarFirstLetter">{user.result.name.charAt(0)}</div>}
              <p>
                {user.result.name}
              </p>
            </div>
            <div className="profileInnerButton mt-5">
              <button type="button" className="btn btn-danger" onClick={() => logout()}>Logout</button>
            </div>
          </div>
        </Profile>
      )}
    </div>
  )
}
