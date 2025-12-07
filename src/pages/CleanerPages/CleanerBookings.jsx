import React from "react";
import "./Styles/CleanerBookings.css";
import { useAuth } from "../../auth/useAuth";
import NavBarCompany_Cleaner from "../../components/Navbar/NavBarCompany_Cleaner";
import JobDetailsTab from "../../components/JobDetailsTab/JobDetailsTab"; // Make sure path matches your folder structure

export default function CleanerBookings() {
  const assignedJobs = [
    {
      id: 1,
      customerName: "Sarah Connor",
      date: "Aug 14, 2025",
      time: "09:00 AM - 12:00 PM",
      address: "245 Cyberdyne Ave, Tech District",
      serviceType: "Deep Cleaning",
      price: "$120",
      status: "Pending",
      notes: "Please focus on the kitchen grease. The key is under the mat.",
    },
    {
      id: 2,
      customerName: "Bruce Wayne",
      date: "Aug 15, 2025",
      time: "02:00 PM - 04:00 PM",
      address: "1007 Mountain Drive, Gotham Heights",
      serviceType: "Standard Cleaning",
      price: "$85",
      status: "Confirmed",
      notes: "Do not enter the basement. Security alarm code is 1939.",
    },
    {
      id: 3,
      customerName: "Peter Parker",
      date: "Aug 16, 2025",
      time: "10:00 AM",
      address: "20 Ingram St, Queens",
      serviceType: "Move-out Cleaning",
      price: "$150",
      status: "Declined",
      notes: "Apartment is empty. Just need floors and windows done.",
    },
  ];

  return (
    <div className="CleanerBookings-container">
      <NavBarCompany_Cleaner />

      {/* Header aligned with the cards below */}
      <div className="dashboard-header">
        <div>
          <h1>Bookings</h1>
        </div>
        <div>
          <h1 style={{ opacity: 0.5 }}>{assignedJobs.length} Jobs Assigned</h1>
        </div>
      </div>

      <div className="booking-list-body">
        {assignedJobs.map((job) => (
          <JobDetailsTab
            key={job.id} // Key must stay in the map
            customerName={job.customerName}
            date={job.date}
            time={job.time}
            address={job.address}
            serviceType={job.serviceType}
            price={job.price}
            status={job.status}
            notes={job.notes}
          />
        ))}
      </div>
    </div>
  );
}
