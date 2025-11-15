import { Link } from "react-router-dom";
import "./NavBarCleanerStyle.css";

export default function NavbarCleaner() {
  return (
    <nav className="navbar-cleaner">
      <div className="navbar-logo">
        <Link to="/cleaner">
          <span className="logo-text">SpringClean</span>
        </Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/cleaner">Dashboard</Link></li>
        <li><Link to="/cleaner/bookings">Bookings</Link></li>
        <li><Link to="/cleaner/schedule">Schedule</Link></li>
        <li><Link to="/cleaner/payments">Payments</Link></li>
        <li><Link to="/cleaner/profile">Profile</Link></li>
      </ul>

      <div className="navbar-user">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
          alt="Cleaner avatar"
          className="navbar-avatar"
        />
        <span className="navbar-name">Hi, Cleaner!</span>
      </div>
    </nav>
  );
}
