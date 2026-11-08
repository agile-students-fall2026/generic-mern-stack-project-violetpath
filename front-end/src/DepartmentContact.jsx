
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './DepartmentContact.css'

function DepartmentContact () {
  const [search, setSearch] = useState('');
  const [advisor, setAdvisor] = useState('');
  const [email, setEmail] = useState('');
  const [showForm, setShowForm] = useState(false);

  const departments = [
    { name: 'Computer Science', website: 'https://cs.nyu.edu/' },
    { name: 'Data Science', website: 'https://cds.nyu.edu/' }
  ]

  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(search.toLowerCase())
  )
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const handleSubmit = (event) => {
    event.preventDefault()
    setShowForm(false)
  };

  return (
    <div className="contact-page">
      <div className="contact-main">

        <h1>Department Contacts</h1>

        <div className="contact-search">
          <input
            type="text"
            placeholder="Search for departments"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button type="button">Search</button>
        </div>

        <section className="contact-departments">
          <h2>Your Departments</h2>

            {filteredDepartments.map((department) => (
              <div className="contact-department-card" key={department.name}>
                <h3>{department.name}</h3>
              
                <div className="contact-card-buttons">
                  <a href={department.website} target="_blank" rel="noreferrer">
                    Contact
                  </a>
                  <a href={department.website} target="_blank" rel="noreferrer">
                    Website
                  </a>
                </div>
              </div>
            ))}
            {filteredDepartments.length === 0 && <p>No departments found.</p>}
        </section>

        <section className="contact-advisor-section">
          <h2>Advisor Contact</h2>

          <div className="contact-advisor-card">
            <h3>{advisor || 'Your Advisor'}</h3>

            {email ? (
              <a href={`mailto:${email}`}>Email</a>
            ) : (
              <a href="https://cas.nyu.edu/academic-advising.html">
                Find Advisor
              </a>
            )}

            <button type="button" onClick={toggleForm}>
              Add advisor
            </button>
          </div>

          {showForm && (
            <form className="contact-advisor-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Advisor name"
                value={advisor}
                onChange={(event) => setAdvisor(event.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Advisor email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <button type="submit">Save</button>
            </form>
          )}
        </section>

        <Link to="/" className="contact-home-button">
         Home
        </Link>
        </div>
      </div>
  );
}

export default DepartmentContact;
