import { useEffect, useState } from "react";

export default function useCleaner() {
  const [cleaner, setCleaner] = useState(null);

  useEffect(() => {
    const cleanerId = localStorage.getItem("cleanerId");
    const type = localStorage.getItem("type");

    if (!cleanerId || type !== "cleaner") {
      console.error("No cleaner ID found in localStorage");
      return;
    }

    fetch(`http://localhost:8080/api/company-cleaners/${cleanerId}`)
      .then((res) => res.json())
      .then((data) => setCleaner(data))
      .catch((err) => console.error("Error fetching cleaner:", err));
  }, []);

  return cleaner;
}
