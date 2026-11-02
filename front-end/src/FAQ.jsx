import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./FAQ.css";

const faqs = [
  {
    category: "Courses",
    question: "How do I add my courses?",
    answer:
      "Go to the Courses page and select Add Course. Enter your course information to add it to your plan.",
  },
  {
    category: "GPA",
    question: "How do I use GPA calculator?",
    answer:
      "Go to the Target GPA Calculator, enter your current GPA and credit information, and choose your target GPA.",
  },
  {
    category: "Major",
    question: "What happens if I change my major?",
    answer:
      "Your degree requirements may change. Check your new major requirements and contact your academic advisor.",
  },
  {
    category: "Courses",
    question: "My course got cancelled, now what?",
    answer:
      "Check for alternative courses and contact your department or academic advisor for guidance.",
  },
  {
    category: "General",
    question: "How can I contact my department?",
    answer:
      "Visit the Department Contacts page to find department websites and contact information.",
  },
  {
    category: "General",
    question: "How can I contact my advisor?",
    answer:
      "Visit the Department Contacts page and use the Advisor Contact section.",
  },
];

export default function FAQ() {
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [openQuestion, setOpenQuestion] = useState(null);

  const categories = ["Courses", "GPA", "Major", "General"];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      category === "All" || faq.category === category;

    const matchesSearch =
      faq.question
        .toLowerCase()
        .includes(submittedSearch.toLowerCase()) ||
      faq.answer
        .toLowerCase()
        .includes(submittedSearch.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSubmittedSearch(search.trim());
    setOpenQuestion(null);
  };

  const handleCategory = (selectedCategory) => {
    setCategory(
      category === selectedCategory ? "All" : selectedCategory
    );
    setOpenQuestion(null);
  };

  return (
    <div className="faq-page">
      <header className="faq-top-bar">
        <h1>FAQ</h1>
      </header>

      <main className="faq-main">
        <div className="faq-logo-box">
          <div className="faq-logo">LOGO</div>
        </div>

        <h2>Frequently Asked Questions</h2>

        <form className="faq-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for questions"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (!e.target.value) setSubmittedSearch("");
            }}
          />
          <button type="submit">Search</button>
        </form>

        <div className="faq-category-section">
          <h3>Mostly asked categories</h3>

          <div className="faq-category-buttons">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={
                  category === item ? "faq-selected" : ""
                }
                onClick={() => handleCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="faq-question-list">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <div
                className="faq-question-item"
                key={faq.question}
              >
                <button
                  className="faq-question-button"
                  onClick={() =>
                    setOpenQuestion(
                      openQuestion === faq.question
                        ? null
                        : faq.question
                    )
                  }
                  aria-expanded={
                    openQuestion === faq.question
                  }
                >
                  {faq.question}
                </button>

                {openQuestion === faq.question && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="faq-no-results">
              No questions found.
            </p>
          )}
        </div>

        <div className="faq-bottom">
          <p>still haven’t found what you are looking for?</p>

          <Link
            to="/department/contact"
            className="faq-support-button"
          >
            Contact Support
          </Link>

          <Link to="/" className="faq-home-button">
            Home
          </Link>
        </div>
      </main>
    </div>
  );
}
