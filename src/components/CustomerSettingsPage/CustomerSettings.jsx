import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerSettings() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    darkMode: localStorage.getItem("darkMode") === "true",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    if (settings.darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", settings.darkMode);
  }, [settings.darkMode]);

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  const handleBack = () => {
    navigate("/customer/home");
  };

  return (
    <>
      <div className="main-wrapper">
        {/* 🏷 Header above container */}
        <div className="settings-header">
    <h1>Settings</h1>
    <span>Manage appearance and preferences according to your needs</span>
  </div>

        {/* ⚙️ Settings Container */}
        <div className="settings-container">
          <div className="settings-card">
            {/* 🔔 Notification Preferences */}
            <section className="settings-section">
              <h2>Notifications</h2>
              <div className="toggle-row">
                <label>Email Notifications</label>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle("emailNotifications")}
                />
              </div>
              <div className="toggle-row">
                <label>SMS Notifications</label>
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={() => handleToggle("smsNotifications")}
                />
              </div>
            </section>

            {/* 🌙 Theme Preference */}
            <section className="settings-section">
              <h2>Appearance</h2>
              <div className="toggle-row">
                <label>Dark Mode</label>
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={() => handleToggle("darkMode")}
                />
              </div>
            </section>

            {/* 🔑 Password Update */}
            <section className="settings-section">
              <h2>Change Password</h2>
              <div className="input-row">
                <label>Current Password</label>
                <input
                  type="password"
                  name="current"
                  value={password.current}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                />
              </div>
              <div className="input-row">
                <label>New Password</label>
                <input
                  type="password"
                  name="new"
                  value={password.new}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                />
              </div>
              <div className="input-row">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirm"
                  value={password.confirm}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                />
              </div>
            </section>

            {/* ✅ Buttons */}
            <div className="settings-actions">
              <button className="save-btn" onClick={handleSave}>
                Save Changes
              </button>
              <button className="back-btn" onClick={handleBack}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
