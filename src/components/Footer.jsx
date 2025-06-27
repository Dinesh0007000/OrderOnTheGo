import '../styles/Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';
import { toast } from 'react-toastify';
import ProtectedLink from './ProtectedLink';

function Footer() {
  return (
    <div className="Footer">
      <div className="footer-top">
        <div className="footer-column">
          <h4>SBfoods</h4>
          <p>Delicious food delivered to your doorstep.</p>
          <div className="footer-social">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><ProtectedLink to="/" className="footer-link">Home</ProtectedLink></li>
            <li><ProtectedLink to="/all-restaurants" className="footer-link">Restaurants</ProtectedLink></li>
            <li><ProtectedLink to="/profile" className="footer-link">Profile</ProtectedLink></li>
            <li><ProtectedLink to="/cart" className="footer-link">Cart</ProtectedLink></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Report Issue</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SBfoods. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
