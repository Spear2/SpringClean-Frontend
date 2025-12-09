import React, { useState, useEffect } from "react";
import HomeBar from "../../components/Navbar/NavBarCustomer";
import CleanerCardComponent from "../../components/CustomerHomePage/CleanerCardComponent";
import { useNavigate } from "react-router-dom";
import "../../CustomersStyles/CustomerHomePage.css";

export default function CustomerHomePage() {
  const [companyCleaner, setCompanyCleaner] = useState([]);
  const navigate = useNavigate();

  // Added 'desc' property to each object
  const cleaners = [
    {
      name: "Sparkle PH",
      loc: "Quezon City",
      rate: 4.8,
      img: "https://missouripoisoncenter.org/wp-content/uploads/2021/07/windex.jpg",
      desc: "Specialists in deep residential cleaning and sanitization. We make your home sparkle like new.",
    },
    {
      name: "MaidEasy Services",
      loc: "Makati City",
      rate: 4.7,
      img: "https://www.constructionplacements.com/wp-content/uploads/2024/02/House-Cleaner-Tips-for-Finding-the-Right-One.jpg",
      desc: "Convenient and reliable maid services for busy professionals in Makati. Condo cleaning experts.",
    },
    {
      name: "CleanWave Inc.",
      loc: "Cebu City",
      rate: 4.9,
      img: "https://t4.ftcdn.net/jpg/04/12/59/01/360_F_412590144_1OMbFP4AKKQt6stlYPhhPlwdV0L0gOUX.jpg",
      desc: "Industrial and commercial cleaning solutions. We handle the tough jobs so you don't have to.",
    },
    {
      name: "FreshSpace Cleaners",
      loc: "Davao City",
      rate: 4.6,
      img: "https://www.pristinehome.com.au/wp-content/uploads/2018/11/Benefits-of-Having-Your-Home-Cleaned-by-a-Professional-Cleaner.jpg",
      desc: "Eco-friendly cleaning using non-toxic products. Safe for pets and children.",
    },
    {
      name: "LinisPro",
      loc: "Pasig City",
      rate: 4.5,
      img: "https://crewcare.co.nz/admin_assets/blog/debunking-stereotypes_.jpg",
      desc: "Affordable and efficient standard cleaning for apartments and small offices.",
    },
    {
      name: "Kintab Cleaning Co.",
      loc: "Taguig City",
      rate: 4.8,
      img: "https://media.istockphoto.com/id/1350701180/photo/woman-cleaning-floor-with-mop.jpg?s=612x612&w=0&k=20&c=xZBxsNd-qIFKOcyMywRGIV2u9bp-HuWZSAk_OaWwzKc=",
      desc: "Premium floor polishing and upholstery care. We restore the shine to your home.",
    },
    {
      name: "EcoLinis Solutions",
      loc: "Iloilo City",
      rate: 4.9,
      img: "https://1clean.co.uk/wp-content/uploads/2023/05/What-is-domestic-cleaning-article-Main-Image-1024x576.webp",
      desc: "Sustainable cleaning practices for the environmentally conscious homeowner.",
    },
    {
      name: "Maid in Manila",
      loc: "Manila",
      rate: 4.4,
      img: "https://sparklehomecleaning.co.uk/wp-content/uploads/2024/02/Regular_domestic_cleaning_services.webp",
      desc: "Traditional housekeeping services with a modern touch. Reliable and trustworthy.",
    },
    {
      name: "Pristine Homes PH",
      loc: "Baguio City",
      rate: 4.7,
      img: "https://plus.unsplash.com/premium_photo-1664910214915-b89e63fcb72e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xlYW5lcnN8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000",
      desc: "Specialized in move-in and move-out cleaning for vacation homes and rentals.",
    },
  ];

  useEffect(() => {
    fetch("http://localhost:8080/api/company-cleaners")
      .then((res) => res.json())
      .then((data) => setCompanyCleaner(data))
      .catch((err) => {
        console.error("Error Fetching cleaners: ", err);
      });
  }, []);

  const handleViewHistory = () => {
    navigate("/customer/bookingSummary");
  };

  return (
    <>
      <HomeBar />

      <div className="main-wrapper">
        {/* Page Header */}
        <header className="settings-header">
          <div className="top-content">
            <h1>Book Now!</h1>
            <span>Trusted professionals ready to make your home shine.</span>
          </div>
          <button className="btn-viewhistory" onClick={handleViewHistory}>
            View Booking History
          </button>
        </header>

        {/* Cleaner Cards */}
        <div className="chp-card-wrapper">
          {companyCleaner.map((com) =>
            cleaners.map((cleaner, i) =>
              // Ensure your ID matching logic is correct here (using index 'i' vs ID)
              com.companyCleanerId == i ? (
                <CleanerCardComponent
                  key={com.companyCleanerId}
                  index={com.companyCleanerId}
                  name={com.companyName}
                  loc={cleaner.loc}
                  rate={cleaner.rate}
                  img={cleaner.img}
                  desc={cleaner.desc} // <--- PASSING DESCRIPTION HERE
                />
              ) : null
            )
          )}
        </div>
      </div>
    </>
  );
}
