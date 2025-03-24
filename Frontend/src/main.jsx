import "./index.css";
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Home from "./pages/HomePage/Home";
// import Login from "./pages/HomePage/Login";
// import SignUp from "./pages/HomePage/SignUp";
// import SuperAdminPanel from "./components/SuperAdminPanel/SuperAdminPanel";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/signup",
//     element: <SignUp />,
//   },
//   {
//     path: "/superadmin-dashboard",
//     element: <SuperAdminPanel />,
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import ScrollToTop from "./components/HomePageComponents/ScrollToTop"; // Import ScrollToTop
import Home from "./pages/HomePage/Home";
import Login from "./pages/HomePage/Login";
import SignUp from "./pages/HomePage/SignUp";
import SuperAdminPanel from "./components/SuperAdminPanel/SuperAdminPanel";
import Contact from "./pages/HomePage/Contact";
import TermsAndConditions from "./pages/HomePage/Tnc";
import PrivacyPolicy from "./pages/HomePage/Privacy";
import AboutUs from "./pages/HomePage/About";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router> {/* Use BrowserRouter instead of RouterProvider */}
      <ScrollToTop /> {/* Ensure scrolling to top on route change */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/superadmin-dashboard" element={<SuperAdminPanel />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms&conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

