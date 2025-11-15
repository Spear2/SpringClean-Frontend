import NavbarCleaner from "../../components/Navbar/NavBarCleaner";
import "../../CleanersStyles/cleanersPayments.css";

export default function CleanerPayments() {
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

  const totalEarnings = payments
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0);

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
              {payments.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.id}</td>
                  <td>₱{payment.amount.toLocaleString()}</td>
                  <td>{payment.date}</td>
                  <td>{payment.customer}</td>
                  <td
                    className={
                      payment.status === "Completed"
                        ? "status-completed"
                        : "status-pending"
                    }
                  >
                    {payment.status}
                  </td>
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
