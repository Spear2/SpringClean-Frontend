import NavbarCleaner from "../../components/Navbar/NavBarCleaner";
import "../../CleanersStyles/cleanerSchedule.css";


export default function CleanersSchedule() {
  return (
    <div>
      <NavbarCleaner />
      <div className="cleaner-content">
        <h1>Schedule</h1>
        <div className="placeholder-box">
          <p>Upcoming schedules will be displayed here.</p>
        </div>
      </div>
    </div>
  );
}