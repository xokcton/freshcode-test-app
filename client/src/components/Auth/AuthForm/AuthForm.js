import React, { useState } from 'react'
import Input from './Input'
import { GoogleLogin } from 'react-google-login'
import * as variant from '../../../constants'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signin, signup } from '../../../actions/auth'

export default function AuthForm() {
  const [isSignup, setIsSignup] = useState(false)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })
  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()

    if (isSignup) {
      dispatch(signup(formData, history))
    } else {
      dispatch(signin(formData, history))
    }
  }

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj
    const token = res?.tokenId

    try {
      dispatch({ type: variant.AUTH, data: { result, token } })
      history.push('/boards')
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = () => {
    console.log("Something went wrong...")
  }

  return (
    <div className="authFormWrapper d-flex flex-column align-items-center">
      <div className="authFormInnerLock">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-shield-lock-fill" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z" />
        </svg>
      </div>
      <h5 className="mb-3">
        {isSignup ? 'Sign up' : 'Sign In'}
      </h5>
      <form className="mb-3" onSubmit={handleSubmit}>
        {
          isSignup && (
            <>
              <Input htmlfor="firstNameId" label="First Name" handleChange={handleChange} type="text" name="firstName" />
              <Input htmlfor="lastNameId" label="Last Name" handleChange={handleChange} type="text" name="lastName" />
            </>
          )
        }
        <Input htmlfor="exampleInputEmail1" label="Email address" handleChange={handleChange} type="email" name="email" />
        <Input htmlfor="exampleInputPassword1" label="Password" handleChange={handleChange} type="password" name="password" />
        {
          isSignup &&
          <Input htmlfor="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" name="confirmPassword" />
        }
        <div className="text-center d-grid gap-2">
          <button className="btn btn-primary btn-sx" type="submit">
            {isSignup ? 'Sign up' : 'Sign In'}
          </button>
          <GoogleLogin
            clientId={variant.GOOGLE_ID}
            render={(renderProps) => (
              <button className="btn btn-primary btn-sx" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <svg style={{ width: '30px', height: '30px' }} viewBox="0 0 24 24" className="pe-2">
                  <path
                    fill="currentColor"
                    d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                  />
                </svg>
                Google Sign In
              </button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
        </div>
        <button className="flex-end bottomSignUpLink" onClick={switchMode}>
          {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </form>
    </div>
  )
}
