import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ManualShopifyConnect.module.css"; // Import CSS module

const ManualShopifyConnect = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shopName: "",
    apiKey: "",
    password: "",
    sharedSecret: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear previous messages
    console.log(formData);

    try {
      const response = await fetch("http://localhost:5000/auth/shopify/manual_shopify_connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        },
        withCredentials: true, 
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Credentials saved successfully!");
      } else {
        setMessage(`❌ Failed to save: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error saving credentials:", error);
      setMessage("❌ Error saving credentials. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.manualShopifyContainer}>
      <h2>Manually Connect Shopify</h2>
      {message && <p className={styles.statusMessage}>{message}</p>}
      <form className={styles.shopifyForm} onSubmit={handleSubmit}>
        <input
          type="text"
          name="shopName"
          placeholder="Shopify Store Name"
          value={formData.shopName}
          onChange={handleChange}
          className={styles.shopifyInput}
          required
        />
        <input
          type="text"
          name="apiKey"
          placeholder="API Key"
          value={formData.apiKey}
          onChange={handleChange}
          className={styles.shopifyInput}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="API Password"
          value={formData.password}
          onChange={handleChange}
          className={styles.shopifyInput}
          required
        />
        <input
          type="text"
          name="sharedSecret"
          placeholder="Shared Secret"
          value={formData.sharedSecret}
          onChange={handleChange}
          className={styles.shopifyInput}
          required
        />
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? "Saving..." : "Save Credentials"}
        </button>
      </form>
      <button className={styles.backButton} onClick={() => navigate("/")}>
        Back
      </button>
    </div>
  );
};

export default ManualShopifyConnect;
