import React from "react";
import "./Styles/CleanerEarningsStyles.css";
import NavBarCompany_Cleaner from "../../components/Navbar/NavBarCompany_Cleaner";
import PaymentRow from "../../components/PaymentRow"; // Import the component above

export default function CleanerPayments() {
  // Mock Data
  const transactions = [
    {
      id: 1,
      date: "Aug 14, 2025",
      customer: "Sarah Connor",
      service: "Deep Cleaning",
      amount: "+$120.00",
      status: "Paid",
    },
    {
      id: 2,
      date: "Aug 12, 2025",
      customer: "Bruce Wayne",
      service: "Standard Cleaning",
      amount: "+$85.00",
      status: "Paid",
    },
    {
      id: 3,
      date: "Aug 10, 2025",
      customer: "Peter Parker",
      service: "Move-out Cleaning",
      amount: "+$150.00",
      status: "Pending",
    },
    {
      id: 4,
      date: "Aug 05, 2025",
      customer: "Clark Kent",
      service: "Standard Cleaning",
      amount: "+$85.00",
      status: "Paid",
    },
    {
      id: 5,
      date: "Aug 01, 2025",
      customer: "Tony Stark",
      service: "Post-Construction",
      amount: "+$300.00",
      status: "Paid",
    },
  ];

  return (
    <div className="CleanerPayments_container">
      <NavBarCompany_Cleaner />

      {/* Header */}
      <div className="dashboard-header">
        <h1>Earnings</h1>
        <h1>August 2025</h1>
      </div>

      <div className="payments-body">
        {/* 1. TOTAL BALANCE CARD */}
        <div className="balance-card">
          <div className="balance-info">
            <p>Total Balance</p>
            <h1>$1,250.00</h1>
          </div>
          <div className="payout-btn-container">
            <button className="payout-btn">Request Payout</button>
          </div>
        </div>

        {/* 2. TRANSACTION HISTORY */}
        <h2 className="section-title">Transaction History</h2>

        <div className="history-list">
          {transactions.map((t) => (
            <PaymentRow
              key={t.id}
              date={t.date}
              customer={t.customer}
              service={t.service}
              amount={t.amount}
              status={t.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
