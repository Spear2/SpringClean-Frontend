import React from "react";
import NavbarCleaner from "../../components/Navbar/NavBarCleaner";
import "../../pages/CompanyPages/CompanyStyles/CompanyProfile.css";
import useCompany from "../../Hooks/useCompany";
import { useAuth } from "../../auth/useAuth"; // <--- 1. IMPORT THIS
import {
  Building,
  MapPin,
  Phone,
  Globe,
  Users,
  Mail,
  Award,
  CheckCircle,
  Edit,
  LogOut, // <--- 2. IMPORT ICON
} from "lucide-react";

export default function CompanyProfile() {
  const { logout } = useAuth(); // <--- 3. GET LOGOUT FUNCTION
  const companyData = useCompany();

  // Combine hook data with fallback mock data
  const company = {
    name: companyData?.companyName || "SpringClean Co.",
    tagline: "Your Trusted Cleaning Partner",
    legalName: companyData?.companyName || "SpringClean Co.",
    address: "123 Clean Street, Quezon City, Philippines",
    website: "www.springclean.com",
    employees: 25,
    businessType: "Cleaning Services",
    phone: "+63 912 345 6789",
    email: companyData?.email || "springcleanco@gmail.com",
    about:
      "SpringClean Co. is a premier cleaning service provider offering high-quality home and office cleaning with a strong focus on customer satisfaction and eco-friendly practices.",
    whyUs: [
      "Reliable and trusted by hundreds of clients.",
      "Highly trained and background-checked cleaning professionals.",
      "Eco-friendly cleaning products and sustainable practices.",
      "Flexible scheduling and customized cleaning plans.",
    ],
    services: [
      "Residential Cleaning",
      "Commercial Cleaning",
      "Deep Cleaning",
      "Move-in/Move-out",
      "Carpet & Upholstery",
      "Window Cleaning",
    ],
    stats: {
      rating: 4.8,
      projects: "120+",
      employees: 25,
    },
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="company-profile-page">
      <NavbarCleaner />

      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h1>Company Profile</h1>
          <p style={{ margin: 0, opacity: 0.7 }}>
            Manage your public information.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="action-btn edit">
            <Edit size={16} /> Edit
          </button>

          {/* 4. ADD THE LOGOUT BUTTON HERE */}
          <button className="action-btn logout" onClick={logout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="profile-body">
        {/* ... Rest of your profile code (Left/Right Columns) ... */}
        {/* (I am hiding the rest to save space, it stays exactly the same) */}

        <div className="profile-column left">
          <div className="profile-card center-content">
            <div className="company-avatar">{getInitials(company.name)}</div>
            <h2 className="company-name">{company.name}</h2>
            <p className="company-tagline">{company.tagline}</p>
            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-val">{company.stats.rating}</span>
                <span className="stat-lbl">Rating</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-val">{company.stats.employees}</span>
                <span className="stat-lbl">Staff</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-val">{company.stats.projects}</span>
                <span className="stat-lbl">Projects</span>
              </div>
            </div>
          </div>
          <div className="profile-card">
            <h3 className="card-header">
              <Building size={18} /> Company Details
            </h3>
            <div className="info-list">
              <div className="info-item">
                <Mail size={16} className="info-icon" />
                <div>
                  <label>Email</label>
                  <p>{company.email}</p>
                </div>
              </div>
              <div className="info-item">
                <Phone size={16} className="info-icon" />
                <div>
                  <label>Phone</label>
                  <p>{company.phone}</p>
                </div>
              </div>
              <div className="info-item">
                <Globe size={16} className="info-icon" />
                <div>
                  <label>Website</label>
                  <p>{company.website}</p>
                </div>
              </div>
              <div className="info-item">
                <MapPin size={16} className="info-icon" />
                <div>
                  <label>Headquarters</label>
                  <p>{company.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-column right">
          <div className="profile-card">
            <h3 className="card-header">About Us</h3>
            <p className="about-text">"{company.about}"</p>
          </div>
          <div className="profile-card">
            <h3 className="card-header">Services Offered</h3>
            <div className="tags-container">
              {company.services.map((service, index) => (
                <span key={index} className="service-tag">
                  {service}
                </span>
              ))}
            </div>
          </div>
          <div className="profile-card">
            <h3 className="card-header">
              <Award size={18} /> Why Choose Us?
            </h3>
            <ul className="why-us-list">
              {company.whyUs.map((point, index) => (
                <li key={index}>
                  <CheckCircle size={16} className="check-icon" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
