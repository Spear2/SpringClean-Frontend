import HomeBar from "../../components/Homebar/HomeBar";
import CleanerCardComponent from "../../components/CustomerHomePage/CleanerCardComponent";
import { useNavigate } from "react-router-dom";
import './CustomerHomePage.css';



export default function CustomerHomePage() {
  const cleaners = [
    { name: "Sparkle PH", loc: "Quezon City", rate: 4.8, img: "https://missouripoisoncenter.org/wp-content/uploads/2021/07/windex.jpg" },
    { name: "MaidEasy Services", loc: "Makati City", rate: 4.7, img: "https://www.constructionplacements.com/wp-content/uploads/2024/02/House-Cleaner-Tips-for-Finding-the-Right-One.jpg" },
    { name: "CleanWave Inc.", loc: "Cebu City", rate: 4.9, img: "https://t4.ftcdn.net/jpg/04/12/59/01/360_F_412590144_1OMbFP4AKKQt6stlYPhhPlwdV0L0gOUX.jpg" },
    { name: "FreshSpace Cleaners", loc: "Davao City", rate: 4.6, img: "https://www.pristinehome.com.au/wp-content/uploads/2018/11/Benefits-of-Having-Your-Home-Cleaned-by-a-Professional-Cleaner.jpg" },
    { name: "LinisPro", loc: "Pasig City", rate: 4.5, img: "https://crewcare.co.nz/admin_assets/blog/debunking-stereotypes_.jpg" },
    { name: "Kintab Cleaning Co.", loc: "Taguig City", rate: 4.8, img: "https://media.istockphoto.com/id/1350701180/photo/woman-cleaning-floor-with-mop.jpg?s=612x612&w=0&k=20&c=xZBxsNd-qIFKOcyMywRGIV2u9bp-HuWZSAk_OaWwzKc=" },
    { name: "EcoLinis Solutions", loc: "Iloilo City", rate: 4.9, img: "https://1clean.co.uk/wp-content/uploads/2023/05/What-is-domestic-cleaning-article-Main-Image-1024x576.webp" },
    { name: "Maid in Manila", loc: "Manila", rate: 4.4, img: "https://sparklehomecleaning.co.uk/wp-content/uploads/2024/02/Regular_domestic_cleaning_services.webp" },
    { name: "Pristine Homes PH", loc: "Baguio City", rate: 4.7, img: "https://plus.unsplash.com/premium_photo-1664910214915-b89e63fcb72e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xlYW5lcnN8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000" },
  ];

  const navigate = useNavigate();

  const handleViewHistory = () => {
    navigate("/customer/bookingSummary")
  };

  return (
    <>
      <HomeBar />
      
      <div className="main-wrapper">
        {/* Page Header */}
        <header className="settings-header">
          <h1>Book Now!</h1>
          <span>Trusted professionals ready to make your home shine.</span>
          <button className="btn-viewhistory"onClick={handleViewHistory}>View Booking History</button>
        </header>

        {/* Cleaner Cards */}
        <div className="card-wrapper">
          {cleaners.map((cleaner, index) => (
            <CleanerCardComponent
              key={index}
              name={cleaner.name}
              loc={cleaner.loc}
              rate={cleaner.rate}
              img={cleaner.img}
            />
          ))}
        </div>
      </div>
    </>
  );
}
