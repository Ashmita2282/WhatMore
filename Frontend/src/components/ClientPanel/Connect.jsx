import React from "react";
import {useNavigate } from "react-router-dom";
import styles from "./Connect.module.css";

const Connect = () => {
const navigate=useNavigate();
const store_id = localStorage.getItem("store_id"); // Directly retrieve store ID

  const redirectToFacebookLogin = () => {
    window.location.href = "http://localhost:5000/auth/facebook";
  };

  const handleLoadClick = () => {
    console.log(`store id from connect.jsx: ${store_id}`);
    navigate(`/videoGrid/${store_id}`);
  }

  const handleSiteClick = () => {
    navigate(`/integration`);
  }

  return (
    <div className={styles.outside_container}>
    <div className={styles.container}>
      <div className={styles.inner_container}>
      <h2>Seamless Integration</h2>
      <p>Connect your Instagram Business account and eCommerce store to access posts and product details ensuring a smooth shopping experience for customers.</p>

      <div className={styles.buttonContainer}>
        <button className={styles.btn} onClick={redirectToFacebookLogin}>Connect</button>
        <button className={styles.btn} onClick={handleLoadClick}>Load Data</button>
      </div>
      <button className={styles.btn} onClick={handleSiteClick}>Add to site</button>
    </div>
    </div>
    </div>
  );
};

export default Connect;