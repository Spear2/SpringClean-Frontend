import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerPayment({ onConfirm }) {
  const navigate = useNavigate();

  const paymentMethods = [
    {
      id: "creditCard",
      label: "Credit Card",
      brandImage: "https://cdn-icons-png.flaticon.com/128/8983/8983163.png",
      fields: [
        { name: "cardNumber", label: "Card Number", type: "text" },
        { name: "expiryDate", label: "Expiry Date", type: "text" },
        { name: "cvv", label: "CVV", type: "password" },
      ],
    },
    {
      id: "paypal",
      label: "PayPal",
      brandImage: "https://cdn-icons-png.flaticon.com/128/888/888870.png",
      fields: [{ name: "email", label: "PayPal Email", type: "email" }],
    },
    {
      id: "bankTransfer",
      label: "Bank Transfer",
      brandImage: "https://cdn-icons-png.flaticon.com/128/349/349229.png",
      fields: [
        { name: "accountNumber", label: "Account Number", type: "text" },
        { name: "bankName", label: "Bank Name", type: "text" },
      ],
    },
    {
      id: "cash",
      label: "Cash",
      brandImage: "https://cdn-icons-png.flaticon.com/512/3458/3458714.png",
      fields: [],
    },
    {
      id: "mobileWallet",
      label: "Mobile Wallet",
      brandImage: "https://cdn-icons-png.flaticon.com/128/1796/1796819.png",
      fields: [
        { name: "walletProvider", label: "Wallet Provider", type: "text" },
        { name: "phoneNumber", label: "Phone Number", type: "tel" },
      ],
    },
  ];

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [formData, setFormData] = useState({});
  const [amount, setAmount] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const selectedMethodObj = paymentMethods.find((m) => m.id === selectedMethod);

  const handleSelectMethod = (id) => {
    setSelectedMethod(id);
    setFormData({});
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      newErrors.amount = "Please enter a valid amount.";
    }

    if (!selectedMethod) {
      newErrors.selectedMethod = "Please select a payment method.";
    } else {
      selectedMethodObj.fields.forEach((field) => {
        if (!formData[field.name] || formData[field.name].trim() === "") {
          newErrors[field.name] = `${field.label} is required.`;
        }
      });
    }

    if (!agreed) {
      newErrors.agreed = "You must agree to the terms.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayClick = () => {
    if (validate()) {
      setShowModal(true);
    }
  };

  const handleConfirmPayment = () => {
  // Get existing booking details
  const booking = JSON.parse(localStorage.getItem("bookingDetails")) || {};

  // Combine with payment info
  const bookingSummary = {
    ...booking,
    paymentMethod: selectedMethodObj.label,
    amount,
    status: "Pending",
  };

  // Save combined info
  localStorage.setItem("bookingSummary", JSON.stringify(bookingSummary));

  setShowModal(false);
  navigate("/customer/bookingSummary");
};

  const handleCancel = () => setShowModal(false);

  return (
    <>
      <header className="settings-header">
        <h1>Payment Options</h1>
        <span>Choose your preferred payment method.</span>
      </header>

      <section className="payment-container" aria-label="Payment options and details">
        <div className="payment-options" role="list">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`payment-card${selectedMethod === method.id ? " selected" : ""}`}
              onClick={() => handleSelectMethod(method.id)}
              tabIndex={0}
              role="listitem button"
              aria-pressed={selectedMethod === method.id}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleSelectMethod(method.id);
              }}
            >
              <img src={method.brandImage} alt={`${method.label} logo`} />
              <div>{method.label}</div>
            </div>
          ))}
        </div>

        <label htmlFor="amount" className="visually-hidden">
          Amount
        </label>
        <input
          id="amount"
          type="text"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          aria-invalid={!!errors.amount}
          aria-describedby={errors.amount ? "amount-error" : undefined}
        />
        {errors.amount && (
          <small id="amount-error" className="error-message">
            {errors.amount}
          </small>
        )}

        {selectedMethodObj &&
          selectedMethodObj.fields.map((field) => (
            <div key={field.name} className="field-group">
              <label htmlFor={field.name}>{field.label}</label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name] || ""}
                onChange={handleChange}
                aria-invalid={!!errors[field.name]}
                aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
              />
              {errors[field.name] && (
                <small id={`${field.name}-error`} className="error-message">
                  {errors[field.name]}
                </small>
              )}
            </div>
          ))}

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            aria-invalid={!!errors.agreed}
            aria-describedby={errors.agreed ? "agree-error" : undefined}
          />
          I agree to the terms and conditions applied.
        </label>
        {errors.agreed && (
          <small id="agree-error" className="error-message">
            {errors.agreed}
          </small>
        )}

        <button className="pay-btn" onClick={handlePayClick}>
          Pay
        </button>
      </section>

      {showModal && selectedMethodObj && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="confirm-payment-title">
          <div className="modal-content">
            <h2 id="confirm-payment-title">Confirm Payment</h2>
            <ul>
              <li>
                <strong>Payment Method:</strong> {selectedMethodObj.label}
              </li>
              <li>
                <strong>Amount:</strong> {amount}
              </li>
              {selectedMethodObj.fields.map((field) => (
                <li key={field.name}>
                  <strong>{field.label}:</strong> {formData[field.name]}
                </li>
              ))}
            </ul>
            <div className="modal-actions">
              <button onClick={handleConfirmPayment}>Confirm</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
