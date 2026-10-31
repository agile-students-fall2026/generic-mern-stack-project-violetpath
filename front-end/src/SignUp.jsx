import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './SignUp.css'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [major, setMajor] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault() // prevent the default browser form submission stuff

    // check that the two passwords are the same
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setError('')
    navigate('/login') // go back to the log in page after signing up
  }

  return (
    <main className="SignUp">
      <form onSubmit={handleSubmit}>
        <h1>Violet Path</h1>
        <div className="frame">
          <h2>Sign Up</h2>
          <div className="formField">
            <input
              id="email_field"
              type="text"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
 
          <div className="formField">
            <input
              id="password_field"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
 
          <div className="formField">
            <input
              id="confirm_password_field"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
 
          <div className="formField">
            <input
              id="major_field"
              type="text"
              placeholder="Current Major"
              value={major}
              onChange={e => setMajor(e.target.value)}
            />
          </div>
 
          {error && (
            <div>
              <p className="signup-error">{error}</p>
            </div>
          )}
 
          <div>
            <button type="submit" className="button button-primary">Submit</button>
          </div>
        </div>
      </form>
    </main>
  )
}

export default SignUp