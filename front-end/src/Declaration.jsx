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

  const filteredMajors = majors.filter((major) =>
    major.toLowerCase().includes(query.trim().toLowerCase())
  );

  function validate() {
    const newErrors = {};
    if (!selectedMajor) newErrors.major = 'Please choose a major.';
    if (!date) newErrors.date = 'Please pick a date.';
    if (!reason.trim()) newErrors.reason = 'Please tell us why you are declaring.';
    if (!signature.trim()) newErrors.signature = 'Please type your full name.';
    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="decl-page">
        <header className="decl-header">
          <Link to="/" className="decl-back">← Home</Link>
          <h1>Declaration Submitted</h1>
        </header>
        <div className="decl-card decl-success">
          <h2>Thank you!</h2>
          <p>
            You declared <strong>{selectedMajor}</strong> as your major
            effective {date}.
          </p>
          <Link to="/" className="decl-btn decl-btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="decl-page">
      <header className="decl-header">
        <Link to="/" className="decl-back">← Home</Link>
        <h1>Major Declaration</h1>
        <p className="decl-subtitle">Current major: {currentMajor}</p>
      </header>

      <form className="decl-card" onSubmit={handleSubmit} noValidate>
        <h2>Choose your major</h2>
        <input
          type="text"
          className="decl-input"
          placeholder="Search majors"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <ul className="decl-list">
          {filteredMajors.length === 0 && (
            <li className="decl-empty">No majors match your search.</li>
          )}
          {filteredMajors.map((major) => (
            <li key={major}>
              <button
                type="button"
                className={
                  'decl-result' +
                  (selectedMajor === major ? ' decl-result-selected' : '')
                }
                onClick={() => setSelectedMajor(major)}
              >
                {major}
              </button>
            </li>
          ))}
        </ul>
        {errors.major && <p className="decl-error">{errors.major}</p>}

        <label className="decl-label" htmlFor="decl-date">Effective date</label>
        <input
          id="decl-date"
          type="date"
          className="decl-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {errors.date && <p className="decl-error">{errors.date}</p>}

        <label className="decl-label" htmlFor="decl-reason">Reason for declaring</label>
        <textarea
          id="decl-reason"
          className="decl-input decl-textarea"
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        {errors.reason && <p className="decl-error">{errors.reason}</p>}

        <label className="decl-label" htmlFor="decl-signature">Student signature</label>
        <input
          id="decl-signature"
          type="text"
          className="decl-input"
          placeholder="Type your full name"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
        />
        {errors.signature && <p className="decl-error">{errors.signature}</p>}

        <button type="submit" className="decl-btn decl-btn-primary">
          Submit Declaration
        </button>
      </form>
    </div>
  );
}

export default Declaration;