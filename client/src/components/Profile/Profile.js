import React from 'react'

export default function Profile({ active, setActive, children }) {
  return (
    <div className={active ? "Profile active" : "Profile"} onClick={() => setActive(false)}>
      <div className={active ? "Profile__content active" : "Profile__content"} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
