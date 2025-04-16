import React from 'react'
import styles from "./Grid.module.css";
import axios from "axios";

const Details = ({isExpanded, availableSizes, currProduct, selectedSize, isPopupVisible, setIsPopupVisible, setSelectedSize, extractedHttpsUrl ,setIsExpanded}) => {
  
    const token = localStorage.getItem("token");

  // Fetch the current add-to-cart count
  const fetchAndUpdateCartCount = async () => {
    try {
        // Fetch the current add-to-cart count
        const response = await axios.get("http://localhost:5000/analytics/getCartCount", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        let currentCartCount = parseInt(response.data.count, 10) || 0;
        console.log("Fetched Cart Count:", currentCartCount);

        // Increment count
        const newCartCount = currentCartCount + 1;

        // Post the updated count
        const postResponse = await axios.post(
            "http://localhost:5000/analytics/postCartCount",
            { count: newCartCount },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        console.log("Cart count updated successfully:", postResponse.data.count);
        return postResponse.data.count;
    } catch (error) {
        console.error("Error in fetch and update cart count:", error.response ? error.response.data : error.message);
        return null;
    }
};

const handleSizeClick = (size) => {
    console.log("Selected size:", size);
    setSelectedSize(size); // Update the selected size
  };

  const handleBuyNowClick = () => {
    if (isExpanded) {
      setSelectedSize(null); // Remove selected size when collapsing
    }
    setIsExpanded(!isExpanded); // Toggle the expand/collapse of product info
  };

  
    return (
    <div className={styles.video_info}
    style={{
      height: isExpanded ? (availableSizes.length > 6 ? "39%" : "25%") : "20%", // Default height is smaller, expands on click
      transform: isExpanded ? (availableSizes.length > 6 ? "translateY(-22%)" : "translateY(0)") : "translateY(0)", // No transform unless expanded
      transition: "height 0.3s ease, transform 0.3s ease", // Smooth animation for height and transform
    }}
    > 

       {/* Display product name and price */}
      {currProduct && (
      <>
        {isExpanded ? (
          <>
            <div className={styles.size_options}>
              <span className={styles.size_label}>Available Sizes:</span>
              <div className={styles.sizes_container}>
                {availableSizes.map((size, index) => (
                  <button
                    key={index}
                    className={`${styles.size_button} ${selectedSize === size ? styles.selected : ""}`}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            {/* Conditionally render buttons based on size selection */}
            {selectedSize ? (
              <div className={styles.action_buttons}>
                <button
                  className={styles.add_to_cart_button}
                  onClick={() => {
                    console.log(`Added size ${selectedSize} to cart`);
                    setIsPopupVisible(true);  // Show the pop-up
                    fetchAndUpdateCartCount();
                    setTimeout(() => setIsPopupVisible(false), 3000);  // Hide the pop-up after 3 second
                  
                  }}
                >
                  ADD TO CART
                </button>

                <button
                  className={styles.cancel_button}
                  onClick={() => {
                    setSelectedSize(null);
                  }}
                >
                  CANCEL
                </button>
              </div>
            ) : (
              <button className={styles.buy_now_btn} onClick={handleBuyNowClick}>
                Close
              </button>
            )}
          </>
        ) : (
          <>
            <span className={styles.product_name}>{currProduct?.name || "Unavailable"}</span>
            <span className={styles.product_price}>{currProduct?.variants?.[0]?.price ?? "Unavailable"}</span>
            <button className={styles.buy_now_btn} onClick={handleBuyNowClick}>
              BUY NOW
            </button>
          </>
        )}
      </>
    )}
    {isPopupVisible && (
      <div className={styles.popup}>
        <span className={styles.green_tick}>✔</span> {/* Green tick */}
        Item added to cart
      </div>
    )}

    {/* Keep the redirection link */}
    {extractedHttpsUrl && (
      <a
        href={extractedHttpsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.redirect_icon}
      >
        🔗
      </a>
    )}
  </div>

  )
}

export default Details