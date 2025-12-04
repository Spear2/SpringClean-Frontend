import NavbarCleaner from "../../components/Navbar/NavBarCleaner";
import SideBarCleaner from "../../components/SideBarCleaner/SideBarCleaner";
import {
  Building,
  MapPin,
  Phone,
  Globe,
  UserCheck,
  Wrench,
  Info,
  Users,
  Mail,
  Sparkles,
} from "lucide-react";
import "../../pages/CompanyPages/CompanyStyles/CompanyProfile.css";

export default function CleanerProfile() {
  const company = {
    name: "SpringClean Co.",
    tagline: "Your Trusted Cleaning Partner",
    legalName: "SpringClean Co.",
    address: "123 Clean Street, Quezon City, Philippines",
    website: "www.springclean.com",
    employees: 25,
    businessType: "Cleaning Services",
    phone: "+63 912 345 6789",
    email: "springcleanco@gmail.com",
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
      "Move-in/Move-out Cleaning",
      "Carpet and Upholstery Cleaning",
      "Window Cleaning",
    ],
  };

  return (
    <div className="company-profile-page">
      <NavbarCleaner />
      <div className="content-wrapper">
        <SideBarCleaner />
        <div className="company-profile-container">
          {/* Header */}
          <header className="profile-header">
            <div className="profile-photo-wrapper">
              {/* Replace with company logo or photo */}
              <div className="profile-photo-placeholder">SC</div>
            </div>
            <div className="profile-title">
              <h1>
                <span className="highlight">{company.name}</span>
              </h1>
              <p className="tagline">{company.tagline}</p>
            </div>
          </header>

          {/* Main Content Two Columns */}
          <section className="profile-main">
            <div className="left-column">
              {/* About Us */}
              <div className="section about-us">
                <h3>ABOUT US</h3>
                <p>{company.about}</p>
              </div>

              {/* Why Us */}
              <div className="section why-us">
                <h3>
                  <UserCheck className="icon" /> WHY US
                </h3>
                <ul>
                  {company.whyUs.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="right-column">
              {/* Company Info */}
              <div className="section company-info">
                <h3>
                  <Info className="icon" />
                  Company Details
                </h3>
                <ul>
                  <li>
                    <Building className="small-icon" />
                    <strong>LEGAL NAME of FIRM: </strong>
                    {company.legalName}
                  </li>
                  <li>
                    <MapPin className="small-icon" />
                    <strong>Headquarter Address: </strong>
                    {company.address}
                  </li>
                  <li>
                    <Globe className="small-icon" />
                    <strong>Website: </strong>
                    {company.website}
                  </li>
                  <li>
                    <Users className="small-icon" />
                    <strong>Total Number of Employees: </strong>
                    {company.employees}
                  </li>
                  <li>
                    <Sparkles className="small-icon" />
                    <strong>Business Type: </strong>
                    {company.businessType}
                  </li>
                  <li>
                    <Phone className="small-icon" />
                    <strong>Phone Number: </strong>
                    {company.phone}
                  </li>
                  <li>
                    <Mail className="small-icon" />
                    <strong>Email: </strong>
                    {company.email}
                  </li>
                </ul>
              </div>

              {/* Our Service */}
              <div className="section our-service">
                <h3>
                  <Wrench className="icon" /> OUR SERVICE
                </h3>
                <ul>
                  {company.services.map((service, idx) => (
                    <li key={idx}>{service}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
