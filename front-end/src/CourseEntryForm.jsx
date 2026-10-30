
import { useState } from "react";
import "./CourseEntryForm.css";

function CourseEntryForm() {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [credits, setCredits] = useState("");
  const [semester, setSemester] = useState("");

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!courseCode.trim() || !courseName.trim()) {
      setError("Please enter a course code and name.");
      return;
    }

    if (!credits || Number(credits) < 1 || Number(credits) > 6) {
      setError("Credits must be between 1 and 6.");
      return;
    }

    if (!semester) {
      setError("Please select a semester.");
      return;
    }

    const newCourse = {
      id: crypto.randomUUID(),
      code: courseCode.trim(),
      name: courseName.trim(),
      credits: Number(credits),
      semester: semester,
    };

    setCourses((previousCourses) => [
      ...previousCourses,
      newCourse,
    ]);

    setCourseCode("");
    setCourseName("");
    setCredits("");
    setSemester("");
  }

  function handleDelete(id) {
    setCourses((previousCourses) =>
      previousCourses.filter((course) => course.id !== id)
    );
  }

  const groupedCourses = {};

  courses.forEach((course) => {
    if (!groupedCourses[course.semester]) {
      groupedCourses[course.semester] = [];
    }

    groupedCourses[course.semester].push(course);
  });

  return (
    <main className="course-entry-page">
      <div className="course-entry-container">
        <h1 className="course-entry-title">Violet Path</h1>

        <form
          className="course-entry-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <h2 className="course-entry-heading">Add a Course</h2>

          <div className="course-entry-field">
            <label className="course-entry-label" htmlFor="course-code">
              Course Code
            </label>
            <input
              id="course-code"
              className="course-entry-input"
              type="text"
              placeholder="e.g. CSCI-UA 102"
              value={courseCode}
              onChange={(event) => setCourseCode(event.target.value)}
            />
          </div>

          <div className="course-entry-field">
            <label className="course-entry-label" htmlFor="course-name">
              Course Name
            </label>
            <input
              id="course-name"
              className="course-entry-input"
              type="text"
              placeholder="e.g. Data Structures"
              value={courseName}
              onChange={(event) => setCourseName(event.target.value)}
            />
          </div>

          <div className="course-entry-field">
            <label className="course-entry-label" htmlFor="course-credits">
              Credits
            </label>
            <input
              id="course-credits"
              className="course-entry-input"
              type="number"
              placeholder="e.g. 4"
              value={credits}
              onChange={(event) => setCredits(event.target.value)}
            />
          </div>

          <div className="course-entry-field">
            <label className="course-entry-label" htmlFor="course-semester">
              Semester
            </label>
            <select
              id="course-semester"
              className="course-entry-select"
              value={semester}
              onChange={(event) => setSemester(event.target.value)}
            >
              <option value="">Select Semester</option>
              <option value="Fall 2026">Fall 2026</option>
              <option value="Spring 2027">Spring 2027</option>
              <option value="Fall 2027">Fall 2027</option>
              <option value="Spring 2028">Spring 2028</option>
            </select>
          </div>

          {error && (
            <p className="course-entry-error" role="alert">
              {error}
            </p>
          )}

          <button className="course-entry-button" type="submit">
            Add Course
          </button>
        </form>

        <section className="course-list">
          <h2>My Courses</h2>

          {courses.length === 0 && (
            <p>No courses added yet.</p>
          )}

          {Object.keys(groupedCourses).map((term) => (
            <div className="semester-group" key={term}>
              <h3>{term}</h3>

              {groupedCourses[term].map((course) => (
                <div className="course-card" key={course.id}>
                  <div>
                    <strong>{course.code}</strong>
                    <p>{course.name}</p>
                    <p>{course.credits} credits</p>
                  </div>

                  <button
                    className="course-delete-button"
                    type="button"
                    onClick={() => handleDelete(course.id)}
                    aria-label={`Delete ${course.code}`}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

export default CourseEntryForm;
