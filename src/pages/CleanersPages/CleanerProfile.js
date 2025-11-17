import NavbarCleaner from "../../components/Navbar/NavBarCleaner";
import "../../CleanersStyles/cleanerProfile.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import SideBarCleaner from "../../components/SideBarCleaner/SideBarCleaner";
import { Sidebar } from "lucide-react";

export default function CleanerProfile() {
  const { logout } = useAuth();
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
      <div className="content-wrapper">
        <SideBarCleaner />
        <div className="profile-container"></div>
      </div>
    </div>
  );
}
