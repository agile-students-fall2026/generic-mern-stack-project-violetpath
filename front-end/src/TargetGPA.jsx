import { Link } from 'react-router-dom'
import './TargetGPA.css'

function TargetGPA() {
  return (
    <main className="target-gpa-page">
      <div className="target-gpa-container">
        <header className="target-gpa-header">
          <h1>LOGO</h1>
        </header>

        <h2>GPA Calculator</h2>

        <section className="target-gpa-box">
          <div className="target-gpa-summary">
            <p>1-1 GPA: XX</p>
            <p>1-2 GPA: XX</p>
            <p>2-1 GPA: XX</p>

            <div className="target-gpa-overall">
              <p>Major GPA: 3.7</p>
              <p>Minor GPA: 3.8</p>
              <p>Cumulative GPA: 3.8</p>
            </div>
          </div>

          <div className="target-gpa-inputs">
            <div className="target-gpa-fields">
              <div className="target-gpa-input-row">
                <label htmlFor="target-gpa">Target GPA:</label>
                <input
                  id="target-gpa"
                  type="number"
                  step="0.01"
                  placeholder="Type"
                />
              </div>

              <div className="target-gpa-input-row">
                <label htmlFor="credit-left">Credit Left:</label>
                <input
                  id="credit-left"
                  type="number"
                  placeholder="Type"
                />
              </div>
            </div>

            <div className="target-gpa-achievable">
              Achievable
              <br />
              or not
            </div>
          </div>

          <p className="target-gpa-estimate">
            How many A, A- needed → Estimation...
          </p>
        </section>

        <Link className="target-gpa-home" to="/">
          Home
        </Link>
      </div>
    </main>
  )
}

export default TargetGPA