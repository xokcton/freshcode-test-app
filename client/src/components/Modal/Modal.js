import React from 'react'

export default function Modal({ active, setActive, children }) {
  return (
    <div className={active ? "Modal active" : "Modal"} onClick={() => setActive(false)}>
      <div className={active ? "Modal__content active" : "Modal__content"} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
