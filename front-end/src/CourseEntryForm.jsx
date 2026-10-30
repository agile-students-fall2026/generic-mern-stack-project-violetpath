
import { useState } from "react";
import "./CourseEntryForm.css";

function CourseEntryForm() {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [credits, setCredits] = useState("");
  const [semester, setSemester] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const newCourse = {
      code: courseCode.trim(),
      name: courseName.trim(),
      credits: Number(credits),
      semester: semester,
    };

    console.log("New course:", newCourse);

    // Clear the form after submission
    setCourseCode("");
    setCourseName("");
    setCredits("");
    setSemester("");
  }

  return (
    <main className="course-entry-page">
      <div className="course-entry-container">

        <h1 className="course-entry-title">
          Violet Path
        </h1>

        <form
          className="course-entry-form"
          onSubmit={handleSubmit}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "32px",
              margin: "0 0 12px",
            }}
          >
            Add a Course
          </h2>

          <div className="course-entry-field">
            <label
              className="course-entry-label"
              htmlFor="course-code"
            >
              Course Code
            </label>

            <input
              id="course-code"
              className="course-entry-input"
              type="text"
              placeholder="e.g. CSCI-UA 102"
              value={courseCode}
              onChange={(event) =>
                setCourseCode(event.target.value)
              }
              required
            />
          </div>

          <div className="course-entry-field">
            <label
              className="course-entry-label"
              htmlFor="course-name"
            >
              Course Name
            </label>

            <input
              id="course-name"
              className="course-entry-input"
              type="text"
              placeholder="e.g. Data Structures"
              value={courseName}
              onChange={(event) =>
                setCourseName(event.target.value)
              }
              required
            />
          </div>

          <div className="course-entry-field">
            <label
              className="course-entry-label"
              htmlFor="course-credits"
            >
              Credits
            </label>

            <input
              id="course-credits"
              className="course-entry-input"
              type="number"
              min="1"
              max="6"
              step="1"
              placeholder="e.g. 4"
              value={credits}
              onChange={(event) =>
                setCredits(event.target.value)
              }
              required
            />
          </div>

          <div className="course-entry-field">
            <label
              className="course-entry-label"
              htmlFor="course-semester"
            >
              Semester
            </label>

            <select
              id="course-semester"
              className="course-entry-select"
              value={semester}
              onChange={(event) =>
                setSemester(event.target.value)
              }
              required
            >
              <option value="">Select Semester</option>
              <option value="Fall 2026">Fall 2026</option>
              <option value="Spring 2027">Spring 2027</option>
              <option value="Fall 2027">Fall 2027</option>
              <option value="Spring 2028">Spring 2028</option>
            </select>
          </div>

          <button
            className="course-entry-button"
            type="submit"
          >
            Add Course
          </button>
        </form>

      </div>
    </main>
  );
}

export default CourseEntryForm;
