import { useState } from "react";
import HomeBar from "../../components/Homebar/HomeBar";
import CustomerPayment from "../../components/CustomerPaymentPage/CustomerPayment";
import "./CustomerPaymentPage.css";

export default function CustomerPaymentPage() {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  // Callback for when payment is confirmed
  function handlePaymentConfirm(details) {
    setPaymentDetails(details);
    setPaymentConfirmed(true);
    // You can add logic here like sending data to backend, showing success message, etc.
    alert("Payment confirmed! Thank you.");
  }

  return (
    <>
      <HomeBar />
      <CustomerPayment onConfirm={handlePaymentConfirm}/>


    </>
  );
}
