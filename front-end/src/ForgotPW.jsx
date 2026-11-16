import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import './ForgotPW.css'
 
const ForgotPW = () => {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [error, setError] = useState('')
 
  const navigate = useNavigate()
 
  const handleSubmit = async e => {
    e.preventDefault() // prevent the default browser form submission stuff
    setError('')

    // check that the two new passwords are the same
    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      // send the request to the server api to authenticate
      const response = await axios.post(
        'http://localhost:3000/forgot-password', {
        email,
        newPassword,
      })
      navigate("/login")
    } catch (err) {
      setError(err.response?.data?.error ?? 'Reset Password failed')
    }
  }

  return (
    <main className="ForgotPW">
      <form onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <div className="frame">
          <div className="formField">
            <input
              id="email_field"
              type="text"
              placeholder="Current Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
 
          <div className="formField">
            <br />
            <input
              id="new_password_field"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </div>
 
          <div className="formField">
            <br />
            <input
              id="confirm_new_password_field"
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={e => setConfirmNewPassword(e.target.value)}
            />
          </div>
 
          {error && (
            <div>
              <p className="PW-error">{error}</p>
            </div>
          )}
 
          <div>
            <button type="submit" className="button button-primary">Confirm</button>
          </div>
        </div>
      </form>
    </main>
  )
}
 
export default ForgotPW