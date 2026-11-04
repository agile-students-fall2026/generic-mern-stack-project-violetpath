
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FAQ.css";

function FAQ() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  const questions = [
    ["How do I check my graduation progress?",
     "Go to Graduation Check to see your completed and remaining credits."],
    ["How do I calculate my GPA?",
     "Use the GPA Calculator to calculate your current or target GPA."],
    ["How do I view my degree requirements?",
     "Go to Degree Requirements to see required courses."],
    ["Who can I contact for help?",
     "Visit Department Contact for more information."]
  ];

  return (
    <div className="faq-page">
      <h1>Frequently Asked Questions</h1>
      <p>Find answers to common questions.</p>

      {questions.map((item, i) => (
        <div className="faq-card" key={i}>
          <div
            className="faq-question"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <strong>{item[0]}</strong>
            <span>{open === i ? "−" : "+"}</span>
          </div>
          {open === i && <p>{item[1]}</p>}
        </div>
      ))}

      <button
        className="faq-outline"
        onClick={() => navigate("/department-contact")}
      >
        Contact Department
      </button>

      <button
        className="faq-home"
        onClick={() => navigate("/")}
      >
        Home
      </button>
    </div>
  );
}

export default FAQ;
