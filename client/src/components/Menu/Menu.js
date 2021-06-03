import React from 'react'

export default function Menu({ active, setActive, children }) {
  return (
    <div className={active ? "Menu active" : "Menu"} onClick={() => setActive(false)}>
      <div className={active ? "Menu__content active" : "Menu__content"} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
