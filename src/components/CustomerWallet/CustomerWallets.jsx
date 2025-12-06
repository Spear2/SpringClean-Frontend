import { useEffect, useState } from "react";
import "./CustomerWallets.css";

export default function Wallet() {
const paymentMethods = [
  { id: "creditCard", label: "Credit Card", icon: "https://cdn-icons-png.flaticon.com/128/8983/8983163.png" },
  { id: "paypal", label: "PayPal", icon: "https://cdn-icons-png.flaticon.com/128/888/888870.png" },
  { id: "bankTransfer", label: "Bank Transfer", icon: "https://cdn-icons-png.flaticon.com/128/3135/3135706.png" },
  { id: "cash", label: "Cash", icon: "https://cdn-icons-png.flaticon.com/128/2331/2331941.png" },
  { id: "mobileWallet", label: "Mobile Wallet", icon: "https://cdn-icons-png.flaticon.com/128/1796/1796819.png" },
];

  const defaultBalances = {
    creditCard: 1000000,
    paypal: 1000000,
    bankTransfer: 1000000,
    cash: 1000000,
    mobileWallet: 1000000,
  };

  const [balances, setBalances] = useState(() => {
    return JSON.parse(localStorage.getItem("walletBalances")) || defaultBalances;
  });

  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("walletHistory")) || [];
  });

  const [activeMethod, setActiveMethod] = useState("creditCard");

  // Sync localStorage on change
  useEffect(() => {
    localStorage.setItem("walletBalances", JSON.stringify(balances));
  }, [balances]);

  useEffect(() => {
    localStorage.setItem("walletHistory", JSON.stringify(history));
  }, [history]);

  const deductFromWallet = (method, amount) => {
    if (balances[method] < amount) {
      alert("Insufficient wallet balance for " + method);
      return false;
    }

    const updatedBalances = {
      ...balances,
      [method]: balances[method] - amount,
    };

    setBalances(updatedBalances);

    const newRecord = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      paymentMethod: method,
      amount: amount,
      status: "Success",
    };

    setHistory((prev) => [newRecord, ...prev]);

    return true;
  };

  return (
    <>
    <div className="wallet-main-wrapper">

      <header className="wallet-header">
        <h1>Customer Wallet</h1>
        <span>Track your balances and transaction activity.</span>
      </header>

      <div className="wallet-container">

        {/* NAV BUTTONS */}
        <div className="wallet-method-tabs">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              className={`wallet-tab-btn ${
                activeMethod === method.id ? "active" : ""
              }`}
              onClick={() => setActiveMethod(method.id)}
            >
              {method.label}
            </button>
          ))}
        </div>

        {/* SINGLE CARD */}
        <section className="wallet-balance-card">
            <div className="wallet-card-header">
                <img
                src={paymentMethods.find((m) => m.id === activeMethod)?.icon}
                alt={paymentMethods.find((m) => m.id === activeMethod)?.label}
                className="wallet-card-icon"
                />
                <h2>{paymentMethods.find((m) => m.id === activeMethod)?.label}</h2>
            </div>

            <div className="wallet-amount-display">
                <p>Available Balance</p>
                <h1>₱ {balances[activeMethod].toLocaleString()}</h1>
            </div>
        </section>

        {/* TRANSACTION HISTORY */}
        <section className="wallet-history">
          <h2>Transaction History</h2>

          {history.length === 0 && <p>No transactions yet.</p>}

          {history.length > 0 && (
            <table className="wallet-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Method</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {history.map((tx) => (
                  <tr key={tx.id}>
                    <td>{tx.date}</td>
                    <td>{tx.time}</td>
                    <td>{tx.paymentMethod}</td>
                    <td>₱ {tx.amount.toLocaleString()}</td>
                    <td>{tx.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
    </>
  );
}
