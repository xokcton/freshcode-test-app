import React from 'react'

export default function Modal({ active, setActive, children }) {
  return (
    <div className={active ? "Comment active" : "Comment"} onClick={() => setActive(false)}>
      <div className={active ? "Comment__content active" : "Comment__content"} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}