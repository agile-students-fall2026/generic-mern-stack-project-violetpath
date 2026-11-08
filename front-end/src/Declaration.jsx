import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Declaration.css';
import { currentMajor, majors } from './mockDeclaration';

function Declaration() {
  const [query, setQuery] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [signature, setSignature] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Filter majors based on the search input
  const filteredMajors = majors.filter((major) =>
    major.toLowerCase().includes(query.trim().toLowerCase())
  );

  // Validate declaration form
  function validate() {
    const newErrors = {};

    if (!selectedMajor) {
      newErrors.major = 'Please choose a major.';
    }

    if (!date) {
      newErrors.date = 'Please pick a date.';
    }

    if (!reason.trim()) {
      newErrors.reason = 'Please tell us why you are declaring.';
    }

    if (!signature.trim()) {
      newErrors.signature = 'Please type your full name.';
    }

    return newErrors;
  }

  // Handle the declaration form submission
  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  }

  // Handle search input changes
  function handleSearch(event) {
    setQuery(event.target.value);
    setSelectedMajor('');
  }

  // Handle major selection
  function handleSelectMajor(major) {
    setSelectedMajor(major);
    setErrors((prev) => ({
      ...prev,
      major: '',
    }));
  }

  // Cancel selection and show all majors again
  function handleCancelSelection() {
    setSelectedMajor('');
    setQuery('');
  }

  // Submission success page
  if (submitted) {
    return (
      <div className="decl-page">
        <div className="decl-container">
          <h1>Declaration Submitted</h1>

          <section className="decl-card decl-success">
            <h2>Thank you!</h2>

            <p>
              You declared <strong>{selectedMajor}</strong> as
              your major effective {date}.
            </p>

            <Link
              to="/"
              className="decl-btn decl-btn-primary decl-success-home"
            >
              Back to Home
            </Link>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="decl-page">
      <div className="decl-container">
        <h1>Declaration</h1>

        <p className="decl-subtitle">
          Current major: {currentMajor}
        </p>

        <form onSubmit={handleSubmit} noValidate>

          {/* Major Selection Card */}
          <section className="decl-card">
            <h2>Select Major</h2>

            <label
              className="decl-label"
              htmlFor="decl-search"
            >
              Search for a major
            </label>

            <input
              id="decl-search"
              type="text"
              className="decl-input"
              placeholder="Search majors"
              value={query}
              onChange={handleSearch}
            />

            {/* Show selected major or search results */}
            {selectedMajor ? (
              <div className="decl-selection">
                <div className="decl-selected-major">
                  <span>
                    Selected major:
                    <strong> {selectedMajor}</strong>
                  </span>
                </div>

                <button
                  type="button"
                  className="decl-cancel"
                  onClick={handleCancelSelection}
                >
                  Cancel Selection
                </button>
              </div>
            ) : (
              <ul className="decl-list">
                {filteredMajors.length === 0 && (
                  <li className="decl-empty">
                    No majors match your search.
                  </li>
                )}

                {filteredMajors.map((major) => (
                  <li key={major}>
                    <button
                      type="button"
                      className="decl-result"
                      onClick={() => handleSelectMajor(major)}
                    >
                      {major}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {errors.major && (
              <p className="decl-error">
                {errors.major}
              </p>
            )}
          </section>

          {/* Declaration Information Card */}
          <section className="decl-card">
            <h2>Declaration Information</h2>

            <label
              className="decl-label"
              htmlFor="decl-date"
            >
              Effective Date
            </label>

            <input
              id="decl-date"
              type="date"
              className="decl-input"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />

            {errors.date && (
              <p className="decl-error">
                {errors.date}
              </p>
            )}

            <label
              className="decl-label"
              htmlFor="decl-reason"
            >
              Reason for Declaring
            </label>

            <textarea
              id="decl-reason"
              className="decl-input decl-textarea"
              rows={4}
              placeholder="Enter your reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
            />

            {errors.reason && (
              <p className="decl-error">
                {errors.reason}
              </p>
            )}

            <label
              className="decl-label"
              htmlFor="decl-signature"
            >
              Student Signature
            </label>

            <input
              id="decl-signature"
              type="text"
              className="decl-input"
              placeholder="Type your full name"
              value={signature}
              onChange={(event) => setSignature(event.target.value)}
            />

            {errors.signature && (
              <p className="decl-error">
                {errors.signature}
              </p>
            )}
          </section>

          {/* Submit Button */}
          <button
            type="submit"
            className="decl-btn decl-btn-primary decl-submit"
          >
            Submit Declaration
          </button>
        </form>

        {/* Home Button */}
        <Link
          to="/"
          className="decl-btn decl-btn-home"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

export default Declaration;