
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './CoursesSearch.css'

const courses = [
  {
    code: 'CSCI-UA 101',
    name: 'Introduction to Computer Science',
    career: 'Undergraduate',
    school: 'College of Arts and Science',
    format: 'In-person',
    description: 'Introduction to programming and computer science.',
    prerequisite: 'None'
  },
  {
    code: 'CS-UY 1114',
    name: 'Introduction to Programming and Problem Solving',
    career: 'Undergraduate',
    school: 'Tandon School of Engineering',
    format: 'In-person',
    description: 'Basic programming and problem-solving concepts.',
    prerequisite: 'None'
  },
  {
    code: 'CSCI-UA 102',
    name: 'Data Structures',
    career: 'Undergraduate',
    school: 'College of Arts and Science',
    format: 'In-person',
    description: 'Introduction to data structures and algorithms.',
    prerequisite: 'CSCI-UA 101'
  },
  {
    code: 'CSCI-UA 202',
    name: 'Operating Systems',
    career: 'Undergraduate',
    school: 'College of Arts and Science',
    format: 'Online',
    description: 'Basic concepts of operating systems.',
    prerequisite: 'Check course requirements'
  }
]

function CoursesSearch() {
  const [search, setSearch] = useState('')
  const [keyword, setKeyword] = useState('')
  const [school, setSchool] = useState('All')

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
        {results.length === 0 ? (
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
