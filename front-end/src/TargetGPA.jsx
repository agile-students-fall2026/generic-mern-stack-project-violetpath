import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./TargetGPA.css";

const API_URL = "http://localhost:3000";

function TargetGPA() {
  const [gpaData, setGpaData] = useState(null);
  const [targetGPA, setTargetGPA] = useState("");
  const [creditLeft, setCreditLeft] = useState("");
  const [result, setResult] = useState(null);
  const [loadError, setLoadError] = useState("");

  // Get GPA information from backend
  useEffect(() => {
    fetch(`${API_URL}/degree-progress/gpa`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load GPA data.");
        }
        return response.json();
      })
      .then((data) => {
        setGpaData(data);
        setCreditLeft(String(data.creditsLeft));
      })
      .catch(() => setLoadError("Could not load GPA data."));
  }, []);

  // Calculate target GPA using backend
  const calculateGPA = () => {
    setResult(null);
    setLoadError("");

    if (!gpaData || targetGPA === "" || creditLeft === "") {
      setLoadError("Please enter a target GPA and remaining credits.");
      return;
    }

    fetch(`${API_URL}/calculate-target-gpa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentGPA: Number(gpaData.cumulativeGPA),
        targetGPA: Number(targetGPA),
        completedCredits: Number(gpaData.creditsTaken),
        futureCredits: Number(creditLeft),
      }),
    })
      .then((response) =>
        response.json().then((data) => {
          if (!response.ok) {
            throw new Error(data.error || "Calculation failed.");
          }
          return data;
        })
      )
      .then((data) => setResult(data))
      .catch((error) => setLoadError(error.message));
  };

  return (
    <div className="target-gpa-page">
      <div className="target-gpa-container">
        <h2>GPA Calculator</h2>

        {/* Current GPA information */}
        <section className="target-gpa-summary">
          <p>Credits Taken: {gpaData?.creditsTaken ?? "—"}</p>
          <p>Credits Left: {gpaData?.creditsLeft ?? "—"}</p>

          <div className="target-gpa-overall">
            <p>Major GPA: {gpaData?.majorGPA ?? "—"}</p>
            <p>Minor GPA: {gpaData?.minorGPA ?? "—"}</p>
            <p>Cumulative GPA: {gpaData?.cumulativeGPA ?? "—"}</p>
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
                  value={targetGPA}
                  onChange={(e) => {
                    setTargetGPA(e.target.value);
                    setResult(null);
                  }}
                />
              </div>

              <div className="target-gpa-input-row">
                <label htmlFor="credit-left">
                  Credit Left:
                </label>
                <input
                  id="credit-left"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="e.g. 16"
                  value={creditLeft}
                  onChange={(e) => {
                    setCreditLeft(e.target.value);
                    setResult(null);
                  }}
                />
              </div>

              <button
                type="button"
                onClick={calculateGPA}
                disabled={!gpaData}
              >
                Calculate
              </button>
            </div>

            <div className="target-gpa-divider" />

            <div className="target-gpa-achievable">
              <h4>Achievable?</h4>
              <p>
                {result
                  ? result.achievable
                    ? "Yes"
                    : "No"
                  : "—"}
              </p>
            </div>
          </div>

          {loadError && <p>{loadError}</p>}
        </section>

        {/* Estimated grades section */}
        <section className="target-gpa-estimate">
          <h3>Required Grades</h3>

          <p className="target-gpa-estimate-description">
            How many A / A- grades do you need to reach
            your target GPA?
          </p>

          <p>
            Required GPA: {result ? result.requiredGPA : "—"}
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