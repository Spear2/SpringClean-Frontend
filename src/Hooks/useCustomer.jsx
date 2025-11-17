import { useEffect, useState } from "react";

export default function useCustomer() {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const customerId = localStorage.getItem("customerId");
    const type = localStorage.getItem("type2");

    if (!customerId || type !== "customer") {
      console.error("No customer ID found in localStorage");
      return;
    }

    fetch(`http://localhost:8080/api/customers/${cleanerId}`)
      .then((res) => res.json())
      .then((data) => setCustomer(data))
      .catch((err) => console.error("Error fetching customer:", err));
  }, []);

  return customer;
}
