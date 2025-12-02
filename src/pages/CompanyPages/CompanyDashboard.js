import NavbarCleaner from "../../components/Navbar/NavBarCleaner";
import "../../CleanersStyles/cleanerDashboard.css";
import { useState, useEffect } from "react"
import useCompany from "../../Hooks/useCompany"

export default function CleanersDashboard() {


  const [bookings, setBookings] = useState([]);


  const company = useCompany();
  const fetchBookings = async () => {
      if (!company || !company.companyCleanerId) return;
  
      try {
        const res = await fetch(`http://localhost:8080/api/bookings/company/${company.companyCleanerId}/bookings`);
        if (!res.ok) {
          throw new Error("Network error while fetching bookings");
        }
        const data = await res.json();
        setBookings(data);
  
  
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
  
      } 
    };

    useEffect(() => {
        if (company && company.companyCleanerId) {
          fetchBookings();
        }
      }, [company]);

  return (
    <div>
      <NavbarCleaner />

      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>
            Welcome Back, <span className="highlight">Cleaner!</span>
          </h1>
          <p>
            Here’s your quick overview for today’s performance and bookings.
          </p>
        </header>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Total Bookings</h3>
            <p className="number">12</p>
            <p className="desc">Bookings assigned this month</p>
          </div>

          <div className="dashboard-card">
            <h3>Upcoming Schedules</h3>
            <p className="number">3</p>
            <p className="desc">Scheduled cleanings this week</p>
          </div>

          <div className="dashboard-card">
            <h3>Payments Received</h3>
            <p className="number">₱8,500</p>
            <p className="desc">Total income this month</p>
          </div>
        </div>

        <div className="recent-activity">
          <h1 className="dashboard-title">Recent Bookings</h1>
          <table>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Date</th>
                <th>Service</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr>
                  
                    <td>{booking.customerFirstName} {booking.customerLastName}</td>
                    <td>{booking.date}</td>
                    <td>{booking.serviceType}</td>
                    <td>
                      <span className="status paid">{booking.status}</span>
                    </td>
                    
                </tr>
              ))}
              <tr>
                <td>John Cruz</td>
                <td>Oct 30, 2025</td>
                <td>Office Cleaning</td>
                <td>
                  <span className="status completed">Completed</span>
                </td>
              </tr>
              <tr>
                <td>Ana Dela Cruz</td>
                <td>Oct 31, 2025</td>
                <td>Deep Cleaning</td>
                <td>
                  <span className="status in-progress">In Progress</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
