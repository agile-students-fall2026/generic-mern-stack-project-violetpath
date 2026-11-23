import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./FAQ.css";


function FAQ() { 
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [submittedSearch, setSubmittedSearch] = useState('');

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(submittedSearch.toLowerCase()) ||
    faq.answer.toLowerCase().includes(submittedSearch.toLowerCase())
  );
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  useEffect(() => {
    const getFaqs = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/faqs");
          if (!response.ok) {
            throw new Error("Failed to get FAQs");
          }
          const data = await response.json();
          setFaqs(data);
        } catch (error) {
          console.log("Error getting FAQs:", error);
        }
    };
    
    
    getFaqs();
  },[]);
  
  return (
    <div className="faq-page">
      <div className="faq-container">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions.</p>
        <form
          className="faq-search" 
          onSubmit={(e) => {
            e.preventDefault();
            setSubmittedSearch(search);
            setOpenIndex(null);
          }}
        >

  
        <input
          type="text"
          placeholder="Search FAQs.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
          </form>
        {filteredFaqs.map((faq,index)=>(
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
