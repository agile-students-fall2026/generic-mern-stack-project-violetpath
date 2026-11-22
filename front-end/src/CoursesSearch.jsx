import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './CoursesSearch.css'

function CoursesSearch() {
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState('')
  const [keyword, setKeyword] = useState('')
  const [school, setSchool] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/api/courses')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load courses')
        }
        return response.json()
      })
      .then(data => setCourses(data))
      .catch(() => setError('Could not load courses'))
      .finally(() => setLoading(false))
  }, [])

  const results = courses.filter((course) => {
    const text = `${course.code} ${course.name} ${course.description}`.toLowerCase()
    const matchesSearch = text.includes(keyword.toLowerCase())
    const matchesSchool = school === 'All' || course.school === school

    return matchesSearch && matchesSchool
  })

  function handleSearch(e) {
    e.preventDefault()
    setKeyword(search.trim())
  }

  return (
    <main className="courses-page">
      <div className="courses-logo">VioletPath</div>

      <h1>Courses</h1>

      <form className="courses-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for Courses"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <select
        className="courses-filter"
        value={school}
        onChange={(e) => setSchool(e.target.value)}
      >
        <option value="All">All Schools</option>
        <option value="College of Arts and Science">
          College of Arts and Science
        </option>
        <option value="Tandon School of Engineering">
          Tandon School of Engineering
        </option>
      </select>

      <div className="courses-results">
        {loading ? (
          <p>Loading courses...</p>
        ) : error ? (
          <p>{error}</p>
        ) : results.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          results.map((course) => (
            <div className="course-card" key={course.code}>
              <h3>{course.code} - {course.name}</h3>
              <p><strong>Academic Career:</strong> {course.career}</p>
              <p><strong>School:</strong> {course.school}</p>
              <p><strong>Instruction List (In-person/online):</strong> {course.format}</p>
              <p><strong>Course Description:</strong> {course.description}</p>
              <p><strong>Course Prerequisite:</strong> {course.prerequisite}</p>
            </div>
          ))
        )}
      </div>

      <Link to="/" className="courses-home">Home</Link>
    </main>
  )
}

export default CoursesSearch

