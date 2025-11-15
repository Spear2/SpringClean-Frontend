import NavbarCleaner from "../../components/Navbar/NavBarCleaner";
import "../../CleanersStyles/cleanerProfile.css";

export default function CleanerProfile() {
  const company = {
    name: "SpringClean Co.",
    address: "123 Clean Street, Quezon City, Philippines",
    email: "contact@springclean.com",
    contact: "+63 912 345 6789",
  };

  const cleaners = [
    { id: 1, name: "Maria Santos", status: "Available" },
    { id: 2, name: "John Dela Cruz", status: "On Duty" },
    { id: 3, name: "Anna Lopez", status: "Day Off" },
    { id: 4, name: "Mark Reyes", status: "Available" },
  ];

  return (
    <div className="company-profile-page">
      <NavbarCleaner />
      <div className="profile-container">
        <div className="profile-card">
          <h1>{company.name}</h1>

          <div className="profile-details">
            <p><strong>📍 Address:</strong> {company.address}</p>
            <p><strong>📧 Email:</strong> {company.email}</p>
            <p><strong>📞 Contact:</strong> {company.contact}</p>
          </div>

          <h2 className="cleaner-list-title">Our Cleaners</h2>
          <ul className="cleaner-list">
            {cleaners.map((cleaner) => (
              <li key={cleaner.id} className="cleaner-item">
                <span className="cleaner-name">{cleaner.name}</span>
                <span
                  className={`cleaner-status ${
                    cleaner.status === "Available"
                      ? "status-available"
                      : cleaner.status === "On Duty"
                      ? "status-onduty"
                      : "status-dayoff"
                  }`}
                >
                  {cleaner.status}
                </span>
              </li>
            ))}
          </ul>

          <button className="profile-edit-btn">Edit Company Info</button>
        </div>
      </div>
    </div>
  );
}
