import React, { useState } from "react";
import "./footer.css"; // Import footer styles
import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome CSS


function Footer() {
  const [Date1] = useState(new Date().getFullYear()); // Corrected useState initialization

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@example.com</p>
          <p>Phone: +1234567890</p>
          <p>Address: 123 Dairy Farm Rd, City, Country</p>
        </div>
        <div className="footer-section">
          <h3>Connect with Us</h3>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {Date1} Dairy Farm. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
