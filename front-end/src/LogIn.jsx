import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './LogIn.css'

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault() // prevent the default browser form submission stuff
    navigate('/')
  }

  return (
    <main className="LogIn">
      <form onSubmit={handleSubmit}>
        <h1>Violet Path</h1>
        <div className="frame">
          <h2>Log In</h2>
          <div className="formField">
            <label>Email</label>
            <br /> {/* a line break to separate the label from the input */}
            <input
              id="email_field"
              type="text"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="formField">
            <label>Password</label>
            <br /> {/* a line break to separate the label from the input */}
            <input
              id="password_field"
              type="text"
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
          <Link to="/signup" className="button button-secondary">Sign Up</Link>
        </div>
      </form>
    </main>
  )
}

export default LogIn