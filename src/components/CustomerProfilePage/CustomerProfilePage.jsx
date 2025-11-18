import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    phone: "+1 555-123-4567",
    address: "123 Green Street, Springfield",
    photo: "https://cdn-icons-png.flaticon.com/512/219/219970.png",
  });

  const [editData, setEditData] = useState({ ...profile });
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setEditData({ ...profile });
    setIsEditing(true);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditData((prev) => ({ ...prev, photo: imageUrl }));
    }
  };

  const handleSave = () => {
    setProfile({ ...editData });
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleBack = () => {
    navigate("/customer/home");
  };

  return (
    <>
    <div className="top-content">
        <h1>Manage Profile</h1>
        <span>View and manage profile information up to date.</span>
    </div>
    <div className="ccpr-profile-page-container">
      <div className="ccpr-profile-layout">
        {/* LEFT SIDE - Profile Image */}
        <div className="ccpr-profile-left">
          <div className="ccpr-profile-image-box">
            <img src={profile.photo} alt="Profile" className="ccpr-profile-image" />
          </div>
        </div>

        {/* RIGHT SIDE - Info Fields */}
        <div className="ccpr-profile-right">
          <div className="ccpr-profile-fields">
            <div className="ccpr-field-row">
              <div className="ccpr-field-item">
                <label>First Name</label>
                <input type="text" value={profile.firstName} readOnly />
              </div>
              <div className="ccpr-field-item">
                <label>Last Name</label>
                <input type="text" value={profile.lastName} readOnly />
              </div>
            </div>

            <div className="ccpr-field-row">
              <div className="ccpr-field-item">
                <label>Email Address</label>
                <input type="email" value={profile.email} readOnly />
              </div>
              <div className="ccpr-field-item">
                <label>Phone Number</label>
                <input type="tel" value={profile.phone} readOnly />
              </div>
            </div>

            <div className="ccpr-field-row single">
              <div className="field-item">
                <label>Address</label>
                <input type="text" value={profile.address} readOnly />
              </div>
            </div>

            <div className="ccpr-profile-buttons">
              <button className="ccpr-edit-btn" onClick={handleEdit}>Edit Profile</button>
              <button className="ccpr-back-btn" onClick={handleBack}>Back to Home</button>
            </div>
          </div>
        </div>
      </div>

      {/* ✨ EDIT MODAL */}
      {isEditing && (
  <div className="ccpr-modal-overlay">
    {/* Use same uniform-box used by the main page so modal looks identical */}
    <div className="ccpr-uniform-box">
      <div className="ccpr-profile-layout">
        {/* LEFT - image + upload (same as page) */}
        <div className="ccpr-profile-left">
          <div className="ccpr-profile-image-box">
            <img src={editData.photo} alt="Edit" className="ccpr-profile-image" />
          </div>

          <label className="ccpr-upload-label">
            Change Photo
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </label>
        </div>

        {/* RIGHT - editable fields (same structure as page but inputs editable) */}
        <div className="ccpr-profile-right">
          <div className="ccpr-profile-fields">
            <div className="ccpr-field-row">
              <div className="ccpr-field-item">
                <label>First Name</label>
                <input
                  type="text"
                  value={editData.firstName}
                  onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                />
              </div>
              <div className="ccpr-field-item">
                <label>Last Name</label>
                <input
                  type="text"
                  value={editData.lastName}
                  onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="ccpr-field-row">
              <div className="ccpr-field-item">
                <label>Email Address</label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                />
              </div>
              <div className="ccpr-field-item">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="ccpr-field-row single">
              <div className="ccpr-field-item">
                <label>Address</label>
                <input
                  type="text"
                  value={editData.address}
                  onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="ccpr-profile-buttons">
            <button className="ccpr-edit-btn" onClick={handleSave}>Save Changes</button>
            <button className="ccpr-back-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
    </>
  );
}
