import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import './LogIn.css'

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')

    try {
      // send the request to the server api to authenticate
      const response = await axios.post(
        'http://localhost:3000/login', {
        email,
        password,
    })
      // store the response data into the data state variable
      console.log(response.data.message)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.error ?? 'Login failed')
    }
  }

  return (
    <main className="LogIn">
      <form onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <div className="frame">
          
          <div className="formField">
            <br />
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

          {error && (
            <div>
              <p className="login-error">{error}</p>
            </div>
          )}

          <div>
            <button type="submit" className="button button-primary">Log In</button>
          </div>
        </div>

        <div className="auth-links">
          <Link to="/forgot-password" className="text-link">Forgot Password?</Link>
          <button type="button" onClick={() => navigate("/signup")} className="button button-secondary">Sign Up</button>
        </div>
      </form>
    </main>
  )
}

export default LogIn