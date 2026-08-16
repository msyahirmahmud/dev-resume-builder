/**
 * Dev Resume Builder - Core Logic
 * Handles resume data state, real-time preview updates, export/import, and theme toggling.
 */

const defaultResumeData = {
  personalInfo: {
    fullName: "Syahir Mahmud",
    jobTitle: "Full Stack Software Engineer",
    email: "syahir136erezeki@gmail.com",
    phone: "+60 12-345 6789",
    location: "Kuala Lumpur, Malaysia",
    website: "https://github.com/msyahirmahmud",
    summary: "Passionate software engineer experienced in building performant web applications, RESTful microservices, and modern CLI tools."
  },
  skills: ["JavaScript", "TypeScript", "Node.js", "React", "Python", "Docker", "Git", "REST APIs", "SQL"],
  experience: [
    {
      company: "Tech Solutions Inc.",
      role: "Senior Frontend Engineer",
      period: "2024 - Present",
      details: "Led modern frontend web development, optimized application performance, and improved Core Web Vitals."
    },
    {
      company: "Innovate Labs",
      role: "Software Developer",
      period: "2022 - 2024",
      details: "Built microservices and scalable REST APIs using Node.js and Express."
    }
  ],
  education: [
    {
      institution: "University of Technology",
      degree: "B.Sc. in Computer Science",
      year: "2018 - 2022"
    }
  ]
};

function generateHTMLResume(data, theme = "modern", isDarkMode = false) {
  const darkClass = isDarkMode ? "dark-theme" : "";
  const skillsHTML = data.skills.map(skill => `<span class="skill-tag">${escapeHTML(skill)}</span>`).join('');
  
  const expHTML = data.experience.map(exp => `
    <div class="exp-item">
      <div class="exp-header">
        <strong>${escapeHTML(exp.role)}</strong> - <span class="company">${escapeHTML(exp.company)}</span>
        <span class="period">${escapeHTML(exp.period)}</span>
      </div>
      <p class="exp-details">${escapeHTML(exp.details)}</p>
    </div>
  `).join('');

  const eduHTML = data.education.map(edu => `
    <div class="edu-item">
      <strong>${escapeHTML(edu.degree)}</strong>
      <div>${escapeHTML(edu.institution)} (${escapeHTML(edu.year)})</div>
    </div>
  `).join('');

  return `
    <div class="resume-container theme-${theme} ${darkClass}">
      <header class="resume-header">
        <h1>${escapeHTML(data.personalInfo.fullName)}</h1>
        <h2 class="title">${escapeHTML(data.personalInfo.jobTitle)}</h2>
        <div class="contact-info">
          <span>📧 ${escapeHTML(data.personalInfo.email)}</span> | 
          <span>📞 ${escapeHTML(data.personalInfo.phone)}</span> | 
          <span>📍 ${escapeHTML(data.personalInfo.location)}</span> | 
          <span>🌐 <a href="${escapeHTML(data.personalInfo.website)}" target="_blank">${escapeHTML(data.personalInfo.website)}</a></span>
        </div>
      </header>
      
      <section class="section">
        <h3>Professional Summary</h3>
        <p>${escapeHTML(data.personalInfo.summary)}</p>
      </section>

      <section class="section">
        <h3>Technical Skills</h3>
        <div class="skills-grid">${skillsHTML}</div>
      </section>

      <section class="section">
        <h3>Work Experience</h3>
        ${expHTML}
      </section>

      <section class="section">
        <h3>Education</h3>
        ${eduHTML}
      </section>
    </div>
  `;
}

function toggleDarkModeState(currentSetting) {
  return !currentSetting;
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function exportJSON(data) {
  return JSON.stringify(data, null, 2);
}

function parseJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed && parsed.personalInfo && Array.isArray(parsed.skills)) {
      return parsed;
    }
    throw new Error("Invalid resume format structure");
  } catch (err) {
    return null;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { defaultResumeData, generateHTMLResume, escapeHTML, exportJSON, parseJSON, toggleDarkModeState };
}
