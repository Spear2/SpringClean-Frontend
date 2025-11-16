// App.js
import "./App.css";
import React from "react";
import { useEffect } from "react";
import AppRoutes from "./Routes";
import { BrowserRouter } from "react-router-dom";

function App() {
    useEffect(() => {
    // When the app loads, check localStorage and apply dark mode
    const darkMode = localStorage.getItem("darkMode") === "true";
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
