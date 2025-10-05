import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../lib/language';
import './Footer.css';

const Footer = () => {
  const { t, currentLanguage } = useTranslation();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <h3>DigLearners</h3>
              <p className="footer-tagline">
                {currentLanguage === 'rw' 
                  ? 'Gufasha abanyeshuri kwiga ubwoba bwo mu ikoranabuhanga' 
                  : 'Empowering digital literacy in Rwanda'
                }
              </p>
            </div>
            <div className="footer-social">
              <h4>{currentLanguage === 'rw' ? 'Twandikire' : 'Follow Us'}</h4>
              <div className="social-links">
                <a href="#" aria-label="Facebook" className="social-link">
                  <span>📘</span>
                </a>
                <a href="#" aria-label="Twitter" className="social-link">
                  <span>🐦</span>
                </a>
                <a href="#" aria-label="LinkedIn" className="social-link">
                  <span>💼</span>
                </a>
                <a href="#" aria-label="YouTube" className="social-link">
                  <span>📺</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>{currentLanguage === 'rw' ? 'Amashami' : 'Quick Links'}</h4>
            <ul>
              <li><Link to="/">{currentLanguage === 'rw' ? 'Ahabanza' : 'Home'}</Link></li>
              <li><Link to="/login">{currentLanguage === 'rw' ? 'Kwinjira' : 'Login'}</Link></li>
              <li><Link to="/register">{currentLanguage === 'rw' ? 'Kwiyandikisha' : 'Register'}</Link></li>
              <li><Link to="/dashboard">{currentLanguage === 'rw' ? 'Ikibaho' : 'Dashboard'}</Link></li>
            </ul>
          </div>

          {/* Learning Resources */}
          <div className="footer-links">
            <h4>{currentLanguage === 'rw' ? 'Amasomo' : 'Learning'}</h4>
            <ul>
              <li><Link to="/dashboard/lessons">{currentLanguage === 'rw' ? 'Amasomo yanjye' : 'My Lessons'}</Link></li>
              <li><Link to="/dashboard/progress">{currentLanguage === 'rw' ? 'Intambwe' : 'Progress'}</Link></li>
              <li><Link to="/dashboard/achievements">{currentLanguage === 'rw' ? 'Intsinzi' : 'Achievements'}</Link></li>
              <li><Link to="/dashboard/leaderboard">{currentLanguage === 'rw' ? 'Urutonde' : 'Leaderboard'}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-links">
            <h4>{currentLanguage === 'rw' ? 'Ubufasha' : 'Support'}</h4>
            <ul>
              <li><Link to="/help">{currentLanguage === 'rw' ? 'Ubufasha' : 'Help Center'}</Link></li>
              <li><a href="#contact">{currentLanguage === 'rw' ? 'Twandikire' : 'Contact Us'}</a></li>
              <li><Link to="/faq">{currentLanguage === 'rw' ? 'Ibibazo Byibuze' : 'FAQ'}</Link></li>
                <li><Link to="/privacy">{currentLanguage === 'rw' ? 'Politiki y\'Ubwigenge' : 'Privacy Policy'}</Link></li>
                <li><Link to="/cookies">{currentLanguage === 'rw' ? 'Politiki y\'Amakuki' : 'Cookies Policy'}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h4>{currentLanguage === 'rw' ? 'Twandikire' : 'Contact'}</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>info@diglearners.rw</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <span>+250 788 123 456</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>{currentLanguage === 'rw' ? 'Kigali, Rwanda' : 'Kigali, Rwanda'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {currentYear} DigLearners. {currentLanguage === 'rw' 
                ? 'Bose uburenganzira burabitswe.' 
                : 'All rights reserved.'
              }
            </p>
              <div className="footer-bottom-links">
                <Link to="/terms">{currentLanguage === 'rw' ? 'Amabwiriza' : 'Terms'}</Link>
                <Link to="/privacy">{currentLanguage === 'rw' ? 'Ubwigenge' : 'Privacy'}</Link>
                <Link to="/cookies">{currentLanguage === 'rw' ? 'Amakuki' : 'Cookies'}</Link>
              </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
