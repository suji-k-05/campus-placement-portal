import React from 'react';
import './About.css';

export default function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1 className="title">About Us</h1>
        <p className="description">
          Welcome to our <span className="highlight">Placement Management System</span>, 
          designed to connect students with top recruiters efficiently.
        </p>

        <h2 className="section-title">🌟 Our Mission</h2>
        <p className="description">
          We aim to simplify placements with AI-powered resume screening, 
          real-time job alerts, and seamless recruiter-student interactions.
        </p>

        <h2 className="section-title">🚀 Why Choose Us?</h2>
        <ul className="features-list">
          <li>🔹 AI-powered Resume Screening</li>
          <li>🔹 Real-time Job Alerts & Notifications</li>
          <li>🔹 Seamless Student-Recruiter Interaction</li>
          <li>🔹 Smart Placement Tracking & Management</li>
        </ul>

        <h2 className="section-title">🎭 Meet Our Team</h2>
        <div className="team-grid">
          {[
            { name: "John Doe", role: "Placement Head", img: "https://th.bing.com/th/id/OIP.so5s5QgNUgKSgouiR2R1zQHaHa?pid=ImgDet&w=178&h=178&c=7&dpr=1.5" },
            { name: "Jane Smith", role: "HR Manager", img: "https://th.bing.com/th/id/OIP.hPVyTvdZJCyjrrvQtufjngHaHa?pid=ImgDet&w=178&h=178&c=7&dpr=1.5" },
            { name: "Alex Brown", role: "Tech Lead", img: "https://th.bing.com/th/id/OIP.L96g_kD-se3hCIRSMV-XyAHaLG?pid=ImgDet&w=178&h=267&c=7&dpr=1.5" },
            { name: "Lisa White", role: "Marketing Head", img: "https://th.bing.com/th/id/OIP.r7GuVgRG7Dm_9K5bMuKjpgHaHa?pid=ImgDet&w=178&h=178&c=7&dpr=1.5" }
          ].map((member, index) => (
             <div className="team-member" key={index}>
               <img src={member.img} alt={`Team ${index + 1}`} className="team-img" />
               <p className="team-name">{member.name}</p>
               <p className="team-role">{member.role}</p>
             </div>
          ))}
        </div>
        {/* Footer */}
       <footer className="footer">

        <h2 className="section-title">📩 Contact Us</h2>
        <p className="description">
          Have questions? Reach us at  
          <a href="mailto:support@placementms.com" className="email"> support@placementms.com</a>
        </p>
      
        <p>&copy; 2025 MobileStore. All Rights Reserved.</p>
        <ul className="social-links">
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">Instagram</a></li>
        </ul>
      </footer> 
      </div>
      

    </div>
    
  );
}

