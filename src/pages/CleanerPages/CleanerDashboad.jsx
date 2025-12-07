import React from "react";
import "../CleanerPages/Styles/CleanerDashboard.css";
import NavBarCompany_Cleaner from "../../components/Navbar/NavBarCompany_Cleaner";
import KPI from "../../components/KPI/KPICard";
import { useAuth } from "../../auth/useAuth";
import useCleaner from "../../Hooks/useCleaner";
import BookingTab from "../../components/BookingTab/BookingTab";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function CleanerDashboard() {
  const auth = useAuth();
  const cleaner = useCleaner();

  if (!cleaner) return <p>Loading...</p>;

  const kpiData = [
    { title: "Total Earnings", info: "$1,250" },
    { title: "Attendance", info: "95%" },
    { title: "Pending Jobs", info: "3" },
  ];

  const chartData = [
    { day: "Mon", jobs: 2 },
    { day: "Tue", jobs: 5 },
    { day: "Wed", jobs: 3 },
    { day: "Thu", jobs: 6 },
    { day: "Fri", jobs: 4 },
    { day: "Sat", jobs: 7 },
    { day: "Sun", jobs: 1 },
  ];

  const pendingBookings = [
    { id: 1, customer: "John Doe", date: "2024-07-01", status: "Pending" },
    { id: 2, customer: "Jane Smith", date: "2024-07-03", status: "Pending" },
    { id: 3, customer: "Bob Johnson", date: "2024-07-05", status: "Pending" },
    { id: 4, customer: "Alice Brown", date: "2024-07-07", status: "Pending" },
    { id: 5, customer: "John Cena", date: "2024-07-07", status: "Done" },
    { id: 6, customer: "John Snow", date: "2024-07-07", status: "Done" },
  ];

  return (
    <div className="CleanerDashboard-container">
      <NavBarCompany_Cleaner />

      <div className="dashboard-header">
        <h1>Welcome back, {cleaner.cleanerName}</h1>
        <h1>Dashboard</h1>
      </div>

      <div className="dashboard-body">
        {/* TOP: KPIs */}
        <div className="kpi-sidebar">
          {kpiData.map((item, index) => (
            <KPI key={index} title={item.title} info={item.info} />
          ))}
        </div>

        {/* BOTTOM: Split Content */}
        <div className="dashboard-content">
          {/* --- LEFT HALF: Bookings --- */}
          <div className="half-section">
            <h2 className="booking-tab-header">Pending Bookings</h2>

            {/* We add this wrapper so only the list scrolls, header stays fixed */}
            <div className="scrollable-list">
              {pendingBookings.map((booking, index) => (
                <BookingTab
                  key={index}
                  customer={booking.customer}
                  date={booking.date}
                  status={booking.status}
                />
              ))}
            </div>
          </div>

          {/* Vertical Divider Line (Optional) */}
          <div style={{ width: "1px", backgroundColor: "#e0e0e0" }}></div>

          {/* --- RIGHT HALF: Bar Graph --- */}
          <div className="half-section">
            <h2 className="booking-tab-header">Weekly Activity</h2>

            <div style={{ width: "100%", height: "100%", minHeight: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} stroke="#e0e0e0" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#666" }}
                  />
                  <Tooltip cursor={{ fill: "transparent" }} />
                  <Bar
                    dataKey="jobs"
                    fill="#1c4274"
                    radius={[10, 10, 0, 0]}
                    barSize={40}
                  />

                  {/* 2. ADD A NAME PROP (This is what the legend will display) */}
                  <Bar
                    name="Jobs Completed"
                    dataKey="jobs"
                    fill="#1c4274"
                    radius={[10, 10, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
