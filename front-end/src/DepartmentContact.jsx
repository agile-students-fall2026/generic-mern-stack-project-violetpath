
import React, { useState } from "react";
import "./DepartmentContact.css";

const departments = [
  {
    id: 1,
    name: "Computer Science",
    shortName: "CS",
    category: "STEM",
    description:
      "Course requirements, major planning, electives, and computer science academic support.",
    website: "https://cs.nyu.edu/",
    contact:
      "https://cs.nyu.edu/home/undergrad/",
    location: "Warren Weaver Hall",
    advisor: {
      name: "Computer Science Undergraduate Advising",
      role: "Undergraduate Academic Advising",
      description:
        "Get assistance with course selection, major requirements, and academic planning.",
      link: "https://cs.nyu.edu/home/undergrad/",
    },
  },
  {
    id: 2,
    name: "Data Science",
    shortName: "DS",
    category: "STEM",
    description:
      "Data science curriculum, major requirements, course planning, and academic support.",
    website: "https://cds.nyu.edu/",
    contact: "https://cds.nyu.edu/academics/",
    location: "Center for Data Science",
    advisor: {
      name: "Data Science Academic Advising",
      role: "Undergraduate Academic Advising",
      description:
        "Find guidance on data science courses, degree requirements, and major planning.",
      link: "https://cds.nyu.edu/academics/",
    },
  },
  {
    id: 3,
    name: "Mathematics",
    shortName: "MATH",
    category: "STEM",
    description:
      "Mathematics major and minor requirements, course sequences, and academic resources.",
    website: "https://math.nyu.edu/",
    contact: "https://math.nyu.edu/dynamic/undergrad/",
    location: "Warren Weaver Hall",
    advisor: {
      name: "Mathematics Undergraduate Advising",
      role: "Undergraduate Academic Advising",
      description:
        "Get support with mathematics course selection and degree requirements.",
      link: "https://math.nyu.edu/dynamic/undergrad/",
    },
  },
  {
    id: 4,
    name: "Economics",
    shortName: "ECON",
    category: "Social Sciences",
    description:
      "Economics major and minor requirements, course planning, and departmental resources.",
    website: "https://as.nyu.edu/departments/econ.html",
    contact: "https://as.nyu.edu/departments/econ.html",
    location: "NYU Department of Economics",
    advisor: {
      name: "Economics Undergraduate Advising",
      role: "Undergraduate Academic Advising",
      description:
        "Find information about economics degree requirements and academic advising.",
      link: "https://as.nyu.edu/departments/econ.html",
    },
  },
  {
    id: 5,
    name: "Psychology",
    shortName: "PSY",
    category: "Social Sciences",
    description:
      "Psychology degree requirements, research opportunities, and academic guidance.",
    website: "https://as.nyu.edu/departments/psychology.html",
    contact: "https://as.nyu.edu/departments/psychology.html",
    location: "NYU Department of Psychology",
    advisor: {
      name: "Psychology Undergraduate Advising",
      role: "Undergraduate Academic Advising",
      description:
        "Receive guidance on psychology courses, major requirements, and academic progress.",
      link: "https://as.nyu.edu/departments/psychology.html",
    },
  },
  {
    id: 6,
    name: "Biology",
    shortName: "BIO",
    category: "STEM",
    description:
      "Biology course planning, major requirements, academic resources, and research opportunities.",
    website: "https://as.nyu.edu/departments/biology.html",
    contact: "https://as.nyu.edu/departments/biology.html",
    location: "NYU Department of Biology",
    advisor: {
      name: "Biology Undergraduate Advising",
      role: "Undergraduate Academic Advising",
      description:
        "Get assistance with biology coursework, degree planning, and requirements.",
      link: "https://as.nyu.edu/departments/biology.html",
    },
  },
  {
    id: 7,
    name: "Chemistry",
    shortName: "CHEM",
    category: "STEM",
    description:
      "Chemistry curriculum, course prerequisites, degree requirements, and academic resources.",
    website: "https://as.nyu.edu/departments/chemistry.html",
    contact: "https://as.nyu.edu/departments/chemistry.html",
    location: "NYU Department of Chemistry",
    advisor: {
      name: "Chemistry Undergraduate Advising",
      role: "Undergraduate Academic Advising",
      description:
        "Find support for chemistry course sequences and degree requirements.",
      link: "https://as.nyu.edu/departments/chemistry.html",
    },
  },
  {
    id: 8,
    name: "English",
    shortName: "ENG",
    category: "Humanities",
    description:
      "English literature courses, degree requirements, and academic support.",
    website: "https://as.nyu.edu/departments/english.html",
    contact: "https://as.nyu.edu/departments/english.html",
    location: "NYU Department of English",
    advisor: {
      name: "English Undergraduate Advising",
      role: "Undergraduate Academic Advising",
      description:
        "Get information about English major requirements and course planning.",
      link: "https://as.nyu.edu/departments/english.html",
    },
  },
];

const advisingResources = [
  {
    title: "CAS Academic Advising",
    subtitle: "General Academic Advising",
    description:
      "Get guidance on degree progress, academic policies, registration, and general course planning.",
    link: "https://cas.nyu.edu/academic-advising.html",
    initials: "CAS",
  },
  {
    title: "Major & Minor Advising",
    subtitle: "Department-Specific Support",
    description:
      "Connect with your department to discuss major requirements, prerequisites, and electives.",
    link: "https://cas.nyu.edu/",
    initials: "M&M",
  },
  {
    title: "University Student Services",
    subtitle: "Student Support",
    description:
      "Find university resources for registration, records, and student services.",
    link: "https://www.nyu.edu/students.html",
    initials: "NYU",
  },
];

export default function DepartmentContact() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("departments");
  const [expandedAdvisor, setExpandedAdvisor] = useState(null);

  const categories = [
    "All",
    "STEM",
    "Social Sciences",
    "Humanities",
  ];

  const filteredDepartments = departments.filter((department) => {
    const matchesCategory =
      activeCategory === "All" ||
      department.category === activeCategory;

    const query = search.trim().toLowerCase();

    const matchesSearch =
      department.name.toLowerCase().includes(query) ||
      department.shortName.toLowerCase().includes(query) ||
      department.description.toLowerCase().includes(query) ||
      department.advisor.name.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="department-page">
      <div className="department-container">
        <div className="department-header">
          <span className="department-label">
            VIOLET PATH RESOURCES
          </span>
          <h1>Department & Advisor Contacts</h1>
          <p>
            Find academic departments, connect with advisors,
            and get the support you need for your academic journey.
          </p>
        </div>

        <div className="department-tabs">
          <button
            className={`department-tab ${
              activeTab === "departments" ? "active" : ""
            }`}
            onClick={() => setActiveTab("departments")}
          >
            Academic Departments
          </button>

          <button
            className={`department-tab ${
              activeTab === "advisors" ? "active" : ""
            }`}
            onClick={() => setActiveTab("advisors")}
          >
            Academic Advisors
          </button>
        </div>

        {activeTab === "departments" ? (
          <>
            <div className="department-search">
              <span className="department-search-icon">⌕</span>
              <input
                type="text"
                placeholder="Search departments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search departments"
              />
              {search && (
                <button
                  className="department-clear"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <div className="department-categories">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`department-category ${
                    activeCategory === category
                      ? "active"
                      : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="department-count">
              {filteredDepartments.length}{" "}
              {filteredDepartments.length === 1
                ? "department"
                : "departments"}{" "}
              found
            </div>

            <div className="department-grid">
              {filteredDepartments.map((department) => (
                <div
                  key={department.id}
                  className="department-card"
                >
                  <div className="department-card-top">
                    <div className="department-avatar">
                      {department.shortName}
                    </div>
                    <span className="department-type">
                      {department.category}
                    </span>
                  </div>

                  <h3>{department.name}</h3>
                  <p className="department-description">
                    {department.description}
                  </p>

                  <div className="department-location">
                    <span>⌖</span>
                    {department.location}
                  </div>

                  <div className="department-card-divider" />

                  <div className="department-card-actions">
                    <a
                      href={department.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="department-website-btn"
                    >
                      Website ↗
                    </a>

                    <a
                      href={department.contact}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="department-contact-btn"
                    >
                      Contact Info →
                    </a>
                  </div>

                  <button
                    className="department-advisor-toggle"
                    onClick={() =>
                      setExpandedAdvisor(
                        expandedAdvisor === department.id
                          ? null
                          : department.id
                      )
                    }
                    aria-expanded={
                      expandedAdvisor === department.id
                    }
                  >
                    <span>Academic Advisor</span>
                    <span>
                      {expandedAdvisor === department.id
                        ? "−"
                        : "+"}
                    </span>
                  </button>

                  {expandedAdvisor === department.id && (
                    <div className="department-advisor-detail">
                      <strong>{department.advisor.name}</strong>
                      <span>{department.advisor.role}</span>
                      <p>{department.advisor.description}</p>
                      <a
                        href={department.advisor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Advising Information →
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredDepartments.length === 0 && (
              <div className="department-empty">
                <h3>No departments found</h3>
                <p>
                  Try searching for a different department
                  or changing your category.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="advising-section">
            <div className="advising-intro">
              <h2>Connect With an Advisor</h2>
              <p>
                Academic advisors can help you make informed
                decisions about your courses, major
                requirements, and graduation timeline.
              </p>
            </div>

            <div className="advising-grid">
              {advisingResources.map((resource) => (
                <div
                  className="advising-card"
                  key={resource.title}
                >
                  <div className="advising-icon">
                    {resource.initials}
                  </div>
                  <span className="advising-subtitle">
                    {resource.subtitle}
                  </span>
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Find an Advisor <span>→</span>
                  </a>
                </div>
              ))}
            </div>

            <div className="advising-tips">
              <h3>Before Meeting Your Advisor</h3>
              <p>
                Make the most of your advising appointment
                by preparing ahead of time.
              </p>

              <div className="advising-tips-grid">
                <div>
                  <span className="advising-tip-number">01</span>
                  <h4>Review Your Progress</h4>
                  <p>
                    Check your completed credits and
                    remaining degree requirements.
                  </p>
                </div>

                <div>
                  <span className="advising-tip-number">02</span>
                  <h4>Prepare Your Questions</h4>
                  <p>
                    Write down questions about courses,
                    prerequisites, or graduation.
                  </p>
                </div>

                <div>
                  <span className="advising-tip-number">03</span>
                  <h4>Bring Your Course Plan</h4>
                  <p>
                    Share your planned courses and
                    discuss possible adjustments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="department-footer-card">
          <div>
            <h3>Need additional academic support?</h3>
            <p>
              Visit NYU's official student resources for
              additional guidance and support.
            </p>
          </div>
          <a
            href="https://www.nyu.edu/students.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Student Resources →
          </a>
        </div>
      </div>
    </div>
  );
}
