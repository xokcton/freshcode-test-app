import React from 'react'

export default function Input({ htmlfor, label, handleChange, type, name }) {
  return (
    <div className="mb-2">
      <label
        htmlFor={htmlfor}
        className="form-label"
      >
        {label} <sup>*</sup>
      </label>
      <input
        onChange={handleChange}
        type={type}
        name={name}
        className="form-control"
        id={htmlfor}
        required
      />
    </div>
  )
}
