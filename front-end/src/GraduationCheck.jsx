import { Link } from 'react-router-dom';
import './GraduationCheck.css';
import { graduationData } from './mockGraduation';

function percent(taken, required) {
  return Math.min(100, Math.round((taken / required) * 100));
}

function ProgressBar({ value, className }) {
  return (
    <div className={`grad-bar ${className}`}>
      <div className="grad-bar-fill" style={{ width: `${value}%` }} />
    </div>
  );
}

function CreditCard({ label, taken, required }) {
  const left = required - taken;
  return (
    <div className="grad-card">
      <div className="grad-card-header">
        <span className="grad-card-title">{label}</span>
        <span className="grad-card-required">{required} required</span>
      </div>
      <ProgressBar value={percent(taken, required)} className="grad-bar-light" />
      <div className="grad-stats">
        <div className="grad-stat">
          <span className="grad-stat-label">Taken</span>
          <span className="grad-stat-value">{taken}</span>
        </div>
        <div className="grad-stat">
          <span className="grad-stat-label">Left</span>
          <span className="grad-stat-value">{left}</span>
        </div>
      </div>
    </div>
  );
}

function GraduationCheck() {
  const { term, major, minor, totalCredits, groups } = graduationData;
  const totalLeft = totalCredits.required - totalCredits.taken;

  return (
    <div className="grad-page">
      <main className="grad-main">
        <div className="grad-intro">
          <h1 className="grad-title">Graduation Check</h1>
          <p className="grad-subtitle">
            {term} - {major}, {minor} minor
          </p>
        </div>
        
        <section className="grad-hero">
          <h2 className="grad-hero-label">Total credits</h2>
          <div className="grad-hero-numbers">
            <span className="grad-hero-taken">{totalCredits.taken}</span>
            <span className="grad-hero-required">/ {totalCredits.required}</span>
          </div>
          <ProgressBar
            value={percent(totalCredits.taken, totalCredits.required)}
            className="grad-bar-hero"
          />
          <p className="grad-hero-left">{totalLeft} credits left to graduate</p>
        </section>

        {groups.map((group) => (
          <CreditCard
            key={group.key}
            label={group.label}
            taken={group.taken}
            required={group.required}
          />
        ))}

        <div className="grad-actions">
          <Link to="/degree/requirements" className="grad-btn grad-btn-outline">
            View requirements
          </Link>
          <Link to="/" className="grad-btn grad-btn-primary">
            Home
          </Link>
        </div>
      </main>
    </div>
  );
}

export default GraduationCheck;