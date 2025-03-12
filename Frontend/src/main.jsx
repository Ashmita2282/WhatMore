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
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <App />
);

