import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import ScrollToTop from "./components/HomePageComponents/ScrollToTop"; // Import ScrollToTop
import App from "./App";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </React.StrictMode>
);

