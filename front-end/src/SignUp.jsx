import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import './SignUp.css'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [major, setMajor] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault() // prevent the default browser form submission stuff
    setError('')

    // check that the two passwords are the same
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      // send the request to the server api to authenticate
      const response = await axios.post(
        'http://localhost:3000/signup', {
        email,
        password,
        major,
    })
      navigate("/login")
    } catch (err) {
      setError(err.response?.data?.error ?? 'Signup failed')
    }
  }

  return (
    <main className="SignUp">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="frame">
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
            <br />
            <input
              id="password_field"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
 
          <div className="formField">
            <br />
            <input
              id="confirm_password_field"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
 
          <div className="formField">
            <br />
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