const express = require("express");
const puppeteer = require("puppeteer");
const RegisterModel = require("../models/RegisterModel");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Function to randomly select a template
function getRandomTemplate() {
  const templates = [
    "template1", "template2", "template3", "template4", "template5",
    "template6", "template7", "template8", "template9", "template10",
    "template11", "template12", "template13", "template14", "template15"
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}


// Function to generate AI-based content
function generateAIContent(type, name) {
  const descriptions = {
    bio: [
      "A passionate developer eager to explore new technologies.",
      "An innovative problem solver with a keen eye for detail.",
      "A dedicated software engineer with a strong technical background.",
      "A highly motivated individual with a strong passion for coding.",
      "A results-driven developer with expertise in modern software solutions.",
      "A creative thinker with a flair for building scalable applications.",
      "A self-starter who enjoys solving complex coding challenges.",
      "A meticulous engineer who thrives in high-pressure environments.",
      "An enthusiastic learner always seeking to expand technical knowledge.",
      "A tech enthusiast who loves working on innovative projects.",
      "A skilled programmer with experience in various domains.",
      "A software developer passionate about AI and cloud technologies.",
      "A full-stack developer specializing in performance optimization.",
      "A technology enthusiast skilled in backend and database systems.",
      "A fast learner who enjoys tackling complex programming problems.",
      "A strong communicator with a collaborative mindset for teamwork.",
      "An adaptable developer always looking for the next challenge.",
      "A problem-solver who enjoys building scalable and efficient applications.",
      "An eager developer passionate about continuous learning.",
      "A detail-oriented programmer who values clean and efficient code."
    ],

    project: [
      `Developed a high-performance solution for ${name} using cutting-edge technology.`,
      `Engineered a scalable and user-friendly application named ${name}.`,
      `Implemented advanced features in ${name} to improve efficiency and user experience.`,
      `Designed ${name} to enhance user productivity and workflow automation.`,
      `Optimized ${name} for high availability and fault tolerance.`,
      `Built a feature-rich web application called ${name} using MERN stack.`,
      `Enhanced the security of ${name} with best authentication practices.`,
      `Developed ${name}, an AI-powered tool that automates manual tasks.`,
      `Created ${name}, an open-source project focused on community development.`,
      `Refactored ${name} to improve efficiency and maintainability.`,
      `Deployed ${name} using containerization and cloud technologies.`,
      `Designed ${name} for real-time collaboration using WebSocket technology.`,
      `Implemented data visualization features in ${name} to improve analytics.`,
      `Scaled ${name} for handling thousands of concurrent users.`,
      `Optimized database queries in ${name} to improve performance by 50%.`,
      `Created RESTful API integrations for ${name} to enhance third-party compatibility.`,
      `Enhanced user experience in ${name} through intuitive UI/UX improvements.`,
      `Designed a blockchain-based feature in ${name} to enhance data security.`,
      `Developed a mobile-friendly version of ${name} for better accessibility.`,
      `Implemented AI-based recommendations in ${name} to improve user engagement.`
    ],

    internship: [
      `Worked on industry-relevant tasks at ${name}, gaining hands-on experience.`,
      `Assisted in critical software development at ${name}, enhancing technical knowledge.`,
      `Engaged in real-world problem-solving at ${name}, contributing to team success.`,
      `Developed new features for a large-scale application at ${name}.`,
      `Collaborated with senior developers at ${name} to optimize backend performance.`,
      `Gained expertise in cloud computing while working at ${name}.`,
      `Built automation tools for data processing at ${name}.`,
      `Worked with AI and ML models at ${name} to improve decision-making.`,
      `Developed API integrations at ${name} for third-party applications.`,
      `Contributed to DevOps processes at ${name}, optimizing CI/CD pipelines.`,
      `Implemented security enhancements at ${name} to prevent cyber threats.`,
      `Created technical documentation at ${name} for better maintainability.`,
      `Designed responsive web applications at ${name} using modern frameworks.`,
      `Led a small team of developers at ${name} for a project module.`,
      `Engaged in bug fixing and testing at ${name} to ensure software stability.`,
      `Optimized database queries at ${name} to improve system performance.`,
      `Worked on AI-driven chatbots at ${name} for better user engagement.`,
      `Developed analytics dashboards at ${name} for business intelligence.`,
      `Gained hands-on experience in cloud deployments at ${name}.`,
      `Implemented performance monitoring tools at ${name} to improve reliability.`
    ],

    skills: [
      "Proficient in multiple programming languages and frameworks.",
      "Strong problem-solving skills with hands-on experience in development.",
      "Capable of working with modern tools and technologies effectively.",
      "Expertise in full-stack web development with deep knowledge of databases.",
      "Skilled in designing scalable and high-performance applications.",
      "Experience in writing optimized and clean code for maintainability.",
      "Knowledge of cloud computing and serverless architecture.",
      "Strong background in cybersecurity and penetration testing.",
      "Hands-on experience in DevOps and CI/CD automation pipelines.",
      "Deep understanding of API development and microservices architecture.",
      "Experienced in AI and machine learning model implementations.",
      "Ability to work with data visualization and analytics tools.",
      "Proficiency in responsive web design and modern front-end frameworks.",
      "Expert in backend optimization and database performance tuning.",
      "Skilled in writing efficient algorithms and data structures.",
      "Experience in blockchain development and smart contract programming.",
      "Strong debugging and troubleshooting skills for complex applications.",
      "Knowledgeable in IoT and embedded systems programming.",
      "Familiar with agile development and collaborative project management.",
      "Passionate about continuous learning and staying updated with tech trends."
    ]
  };

  return descriptions[type][Math.floor(Math.random() * descriptions[type].length)];
}


// Route to generate the resume
router.get("/generate/:email", async (req, res) => {
  try {
    console.log(`📨 Generating resume for: ${req.params.email}`);

    // Fetch user details from database
    const user = await RegisterModel.findOne({ email: req.params.email });
    if (!user) {
      console.error("❌ User not found in database.");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User data retrieved successfully.");

    // Generate descriptions for projects, internships, and skills
    const projects = Array.isArray(user.Projects) && user.Projects.length > 0
  ? shuffleArray(user.Projects.map(proj => ({
      name: proj,
      description: generateAIContent("project", proj)
    })))
  : [];

const internships = Array.isArray(user.Internship) && user.Internship.length > 0
  ? shuffleArray(user.Internship.map(intern => ({
      name: intern,
      description: generateAIContent("internship", intern)
    })))
  : [];

  const skills = Array.isArray(user.skills) && user.skills.length > 0
  ? shuffleArray(user.skills.map(skill => ({ name: skill })))
  : [];



    // Select a random template
    const selectedTemplate = getRandomTemplate();
    const templatePath = path.join(__dirname, `../views/${selectedTemplate}.hbs`);

    // Ensure the selected template exists
    if (!fs.existsSync(templatePath)) {
      console.error(`❌ Template not found at ${templatePath}`);
      return res.status(500).json({ message: "Template file not found." });
    }

    // Read and compile the Handlebars template
    const template = fs.readFileSync(templatePath, "utf8");
    const compiledTemplate = handlebars.compile(template);

    // Generate HTML content for the resume
    const htmlContent = compiledTemplate({
      color: user.color || "black",
      firstname: user.firstname,
      lastname: user.lastname,
      description: generateAIContent("bio", `${user.firstname} ${user.lastname}`),
      email: user.email,
      mobilenumber: user.mobilenumber,
      alternativenumber: user.alternativenumber,
      address: user.address,
      collegename: user.collegename,
      degree: user.degree,
      course: user.course,
      cgpa: user.cgpa,
      github: user.github,
      linkedin: user.linkedin,
      interest: user.interest || "Not specified",
      language: Array.isArray(user.language) && user.language.length > 0
        ? user.language.map(lang => `<li>${lang}</li>`).join("")
        : "<li>Not specified</li>",
      skills: skills.length > 0 
        ? skills.map(s => `<li>${s.name} - ${s.description}</li>`).join("")
        : "<li>Not specified</li>",
      skills_description: generateAIContent("skills", ""),
      Projects: projects.length > 0 
        ? projects.map(p => `<li>${p.name} - ${p.description}</li>`).join("")
        : "<li>Not specified</li>",
      Internship: internships.length > 0 
        ? internships.map(i => `<li>${i.name} - ${i.description}</li>`).join("")
        : "<li>Not specified</li>"
    });

    console.log("🔍 Generated HTML content for resume.");

    // Launch Puppeteer to generate PDF
    const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--disable-setuid-sandbox"] });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });

    // 📸 Capture a screenshot for debugging
    await page.screenshot({ path: "debug_screenshot.png", fullPage: true });
    console.log("📷 Screenshot saved as 'debug_screenshot.png'");

    // 📄 Generate PDF
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    // 📝 Save PDF for debugging
    fs.writeFileSync("debug_resume.pdf", pdfBuffer);
    console.log("📄 PDF saved as 'debug_resume.pdf'");

    // 🔍 Check if PDF is too small (possibly empty)
    const pdfSize = fs.statSync("debug_resume.pdf").size;
    console.log(`📄 PDF generated successfully! Size: ${pdfSize} bytes`);

    if (pdfSize < 10000) {
      console.error("⚠️ PDF is too small! Likely an empty file.");
      return res.status(500).json({ message: "Generated PDF is empty. Check template or HTML content." });
    }

        // 📨 Send PDF to user with correct headers
   // 📨 Send PDF to user with correct headers
console.log("📤 Sending PDF Response to frontend...");
console.log("📏 PDF Buffer Size:", pdfBuffer.length, "bytes");

res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": 'attachment; filename="Resume.pdf"',
    "Content-Length": pdfBuffer.length
});
res.end(pdfBuffer);



  } catch (error) {
    console.error("❌ Error generating resume:", error.message, error.stack);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
