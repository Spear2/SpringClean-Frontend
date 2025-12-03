import NavbarCleaner from "../../components/Navbar/NavBarCleaner";
import "../../CleanersStyles/cleanersPayments.css";
import { useState, useEffect} from "react";
import useCompany from "../../Hooks/useCompany"
export default function CleanerPayments() {

  const [paymentList, setPaymentList] = useState([]);
  
  
    const company = useCompany();
  const payments = [
    {
      id: "#1001",
      amount: 1200,
      date: "2025-10-12",
      customer: "Maria Santos",
      status: "Completed",
    },
    {
      id: "#1002",
      amount: 850,
      date: "2025-10-13",
      customer: "John Dela Cruz",
      status: "Pending",
    },
    {
      id: "#1003",
      amount: 950,
      date: "2025-10-14",
      customer: "Angel Locsin",
      status: "Completed",
    },
  ];

  const totalEarnings = paymentList
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + p.amount, 0);

    const fetchPayments = async () => {
      if (!company?.companyCleanerId) return;

      try {
        const res = await fetch(
          `http://localhost:8080/api/payments/company/${company.companyCleanerId}/payments`
        );
        const data = await res.json();
        setPaymentList(data);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      }
    };

    useEffect(() => {
      fetchPayments();
    }, [company]);

  return (
    <div className="cleaner-payments-page">
      <NavbarCleaner />
      <div className="payments-container">
        <h1 className="payments-title">Payment Summary</h1>

        <div className="table-wrapper">
          <table className="payments-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentList.map(pay => (
                <tr key={pay.paymentId}>
                  <td>{pay.paymentId}</td>
                  <td>₱{pay.amount}</td>
                  <td>{pay.paidAt.split('T')[0]}</td>
                  <td>{pay.customerFirstName} {pay.customerLastName}</td>
                  <td><span className={'status ${pay.status.toLowercase()}'}>{pay.status}</span></td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        <div className="payment-summary">
          <span>Total Earnings:</span>
          <strong>₱{totalEarnings.toLocaleString()}</strong>
        </div>
      </div>
    </div>
  );
}
