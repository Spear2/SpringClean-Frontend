import { Link } from "react-router-dom";
import "./NavBarCleanerStyle.css";
import useCleaner from "../../Hooks/useCleaner";
import { useAuth } from "../../auth/useAuth"

export default function NavbarCleaner() {

  const cleaner = useCleaner();
  const { logout } = useAuth();

  if(!cleaner) return <p>Loading...</p>;

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
        <span className="navbar-name">Hi, {cleaner.companyName}!</span>
      </div>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </nav>
  );
}
