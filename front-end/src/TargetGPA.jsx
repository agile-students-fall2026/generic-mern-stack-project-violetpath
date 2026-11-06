import { Link } from "react-router-dom";
import "./TargetGPA.css";

function TargetGPA() {
  return (
    <div className="target-gpa-page">
      <div className="target-gpa-container">
        <h2>GPA Calculator</h2>

        {/* Current GPA information */}
        <section className="target-gpa-summary">
          <p>1-1 GPA: XX</p>
          <p>1-2 GPA: XX</p>
          <p>2-1 GPA: XX</p>

          <div className="target-gpa-overall">
            <p>Major GPA: 3.7</p>
            <p>Minor GPA: 3.8</p>
            <p>Cumulative GPA: 3.8</p>
          </div>
        </section>

        {/* GPA planning section */}
        <section className="target-gpa-planner">
          <h3>Plan Your GPA</h3>

          <div className="target-gpa-inputs">
            <div className="target-gpa-fields">
              <div className="target-gpa-input-row">
                <label htmlFor="target-gpa">
                  Target GPA:
                </label>
                <input
                  id="target-gpa"
                  type="number"
                  min="0"
                  max="4"
                  step="0.01"
                  placeholder="e.g. 3.90"
                />
              </div>

              <div className="target-gpa-input-row">
                <label htmlFor="credit-left">
                  Credit Left:
                </label>
                <input
                  id="credit-left"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="e.g. 16"
                />
              </div>
            </div>

            <div className="target-gpa-divider" />

            <div className="target-gpa-achievable">
              <h4>Achievable?</h4>
              <p>—</p>
            </div>
          </div>
        </section>

        {/* Estimated grades section */}
        <section className="target-gpa-estimate">
          <h3>Required Grades</h3>

          <p className="target-gpa-estimate-description">
            How many A / A- grades do you need to reach
            your target GPA?
          </p>

          <div className="target-gpa-results">
            <div className="target-gpa-result-item">
              <h4>A needed</h4>
              <p>—</p>
            </div>

            <div className="target-gpa-result-divider" />

            <div className="target-gpa-result-item">
              <h4>A- needed</h4>
              <p>—</p>
            </div>
          </div>
        </section>

        {/* Home button */}
        <Link to="/" className="target-gpa-home">
          Home
        </Link>
      </div>
    </div>
  );
}

export default TargetGPA;