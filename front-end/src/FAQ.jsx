
import { useState } from "react";
import { Link } from "react-router-dom";
import "./FAQ.css";

const faqs = [
  {
    question: "How do I check my graduation progress?",
    answer: "Go to Graduation Check to see your completed and remaining credits.",

  },
  {
    question: "How do I calculate my GPA?",
    answer:"Use the GPA Calculator to calculate your current or target GPA.",
  },
  {
    question: "How do I view my degree requirements?",
    answer: "Go to Degree Requirements to see required courses.",
  },
  {
    question: "Who can I contact for help?",
    answer: "Visit Department Contact for more information.",
  },
];




function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  return (
    <div className="faq-page">
      <div className="faq-container">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions.</p>

        {faqs.map((faq,index)=>(
          <section className="faq-card" key={faq.question}>
            <div
              className="faq-question"
              onClick={() => toggleFaq(index)}
            >
              <strong>{faq.question}</strong>
              <span>{openIndex === index ? "-" : "+"}</span>
            </div>
            {openIndex === index && <p>{faq.answer}</p>}
          </section>
        ))}

      <section className="faq-support">
        <p>Still need help?</p>

        <div className ="faq-support-buttons">
          <Link to="/contact" className="faq-outline">
          Contact Support
          </Link>

          <Link to ="/" className="faq-home">
           Home
          </Link>
        </div>
      </section>
    </div>
  </div>

  );
}

export default FAQ;
