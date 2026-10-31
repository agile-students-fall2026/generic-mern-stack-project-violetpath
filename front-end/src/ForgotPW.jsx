import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './ForgotPW.css'
 
const ForgotPW = () => {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [error, setError] = useState('')
 
  const navigate = useNavigate()
 
  const handleSubmit = e => {
    e.preventDefault() // prevent the default browser form submission stuff
 
    // check that the two new passwords are the same
    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match')
      return
    }
 
    setError('')
    navigate('/login') // go back to the log in page after resetting
  }

  return (
    <main className="ForgotPW">
      <form onSubmit={handleSubmit}>
        <h1>Violet Path</h1>
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
            <input
              id="new_password_field"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </div>
 
          <div className="formField">
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
            <button type="submit" className="button">Confirm</button>
          </div>
        </div>
      </form>
    </main>
  )
}
 
export default ForgotPW