
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './DepartmentContact.css'

const DepartmentContact = () => {
  const [search, setSearch] = useState('')
  const [advisor, setAdvisor] = useState('')
  const [email, setEmail] = useState('')
  const [showForm, setShowForm] = useState(false)

  const departments = [
    { name: 'Computer Science', website: 'https://cs.nyu.edu/' },
    { name: 'Data Science', website: 'https://cds.nyu.edu/' }
  ]

  const filtered = departments.filter(dept =>
    dept.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSubmit = e => {
    e.preventDefault()
    setShowForm(false)
  }

  return (
    <main className="contact-page">
      <div className="contact-main">
    

        <h2>Department Contacts</h2>

        <div className="contact-search">
          <input
            type="text"
            placeholder="Search for departments"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="button">Search</button>
        </div>

        <section className="contact-departments">
          <h3>Your Departments</h3>

          <div className="contact-department-list">
            {filtered.map(dept => (
              <div className="contact-department-card" key={dept.name}>
                <h4>{dept.name}</h4>
                <div className="contact-card-buttons">
                  <a href={dept.website} target="_blank" rel="noreferrer">
                    Contact
                  </a>
                  <a href={dept.website} target="_blank" rel="noreferrer">
                    Website
                  </a>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <p>No departments found.</p>}
          </div>
        </section>

        <section className="contact-advisor-section">
          <h3>Advisor Contact</h3>

          <div className="contact-advisor-card">
            <h4>{advisor || 'Your Advisor'}</h4>

            {email ? (
              <a href={`mailto:${email}`}>Email</a>
            ) : (
              <a href="https://cas.nyu.edu/academic-advising.html">
                Find Advisor
              </a>
            )}

            <button onClick={() => setShowForm(!showForm)}>
              add advisor
            </button>
          </div>

          {showForm && (
            <form className="contact-advisor-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Advisor name"
                value={advisor}
                onChange={e => setAdvisor(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Advisor email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit">Save</button>
            </form>
          )}
        </section>

        <div className="contact-bottom">
          <Link to="/" className="contact-home-button">Home</Link>
        </div>
      </div>
    </main>
  )
}

export default DepartmentContact
