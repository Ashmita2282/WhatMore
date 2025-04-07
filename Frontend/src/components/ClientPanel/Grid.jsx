import React, { useState, useEffect } from "react";
import styles from "./Grid.module.css";
import axios from "axios";

const Grid = ({ closeSlider, currentPost, videos }) => {
  const [initialPost, setInitialPost] = useState(currentPost);
  const [animation, setAnimation] = useState("");
  const [products, setProducts] = useState([]); // To store the fetched Shopify products
  const [sizes, setSizes] = useState([]); // To store the fetched sizes for the product
  const [isExpanded, setIsExpanded] = useState(false); // To handle expand/collapse of product info
  const [selectedSize, setSelectedSize] = useState(null); // To store the selected size
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [fetchedUrls, setFetchedUrls] = useState({}); 
  const [videoUrl, setVideoUrl] = useState(null);

  const token = localStorage.getItem("token");

//   useEffect(() => {
//     setInitialPost(currentPost);
// }, [currentPost]);

  // Fetch Shopify product data
  useEffect(() => {
    const fetchShopifyData = async () => {
        const endpoint = "https://gristiptest.myshopify.com/api/2025-01/graphql.json";
        const accessToken = "7bcea6ccac70730be7c32d0dc91e5cd3"; 
        let allProducts = [];
        let cursor = null;
        let hasNextPage = true;

        while (hasNextPage) {
            const query = `{
                products(first: 50, after: ${cursor ? `"${cursor}"` : "null"}) {
                    edges {
                        node {
                            id
                            title
                            handle
                            onlineStoreUrl
                            variants(first: 100) {
                                edges {
                                    node {
                                        id
                                        title
                                        priceV2 {
                                            amount
                                            currencyCode
                                        }
                                        selectedOptions {
                                            name
                                            value
                                        }
                                    }
                                }
                            }
                        }
                    }
                    pageInfo {
                        hasNextPage
                        endCursor
                    }
                }
            }`;

            try {
                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Shopify-Storefront-Access-Token": accessToken,
                    },
                    body: JSON.stringify({ query }),
                });

                const json = await response.json();
                
                const products = json.data.products.edges.map(({ node }) => {
                    const variants = node.variants.edges.map(variant => ({
                        id: variant.node.id,
                        title: variant.node.title,
                        url: node.onlineStoreUrl || `https://gristiptest.myshopify.com/products/${node.handle}`,
                        price: `${variant.node.priceV2.amount} ${variant.node.priceV2.currencyCode}`,
                        size: variant.node.selectedOptions
                            .filter(option => option.name === "Size")
                            .map(option => option.value),
                    }));

                    const allSizes = [...new Set(variants.flatMap(variant => variant.size))];

                    return {
                        id: node.id,
                        name: node.title,
                        variants,
                        sizes: allSizes,
                    };
                });

                allProducts = [...allProducts, ...products];

                // Update cursor and check for next page
                hasNextPage = json.data.products.pageInfo.hasNextPage;
                cursor = json.data.products.pageInfo.endCursor;

            } catch (error) {
                console.error("Error fetching Shopify data:", error);
                break;
            }
        }

        setProducts(allProducts);
    };

    fetchShopifyData();
}, []);


  // Find the current index of the video
  const currentIndex = videos.findIndex((post) => post.id === initialPost.id);

  // Get the previous and next video indices
  const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
  const nextIndex = (currentIndex + 1) % videos.length;

  // Functions to handle next and previous buttons
  const handleNext = () => {
    const nextVideo = videos[nextIndex];
    if (nextVideo) {
      // setInitialPost(nextVideo);
      setAnimation("next");
      setIsExpanded(false); // Reset expanded state
      setSelectedSize(null); // Reset selected size
      setTimeout(() => {
        setInitialPost(nextVideo);
        setAnimation("");  
      }, 500);  

    }
  };

  const handlePrev = () => {
    const prevVideo = videos[prevIndex];
    if (prevVideo) {
      // setInitialPost(prevVideo);
      setAnimation("prev");
      setIsExpanded(false); // Reset expanded state
      setSelectedSize(null); // Reset selected size
      setTimeout(() => {
        setInitialPost(prevVideo);
        setAnimation("");  
        }, 500);
    }
  };

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


  const handleBuyNowClick = () => {
    if (isExpanded) {
      setSelectedSize(null); // Remove selected size when collapsing
    }
    setIsExpanded(!isExpanded); // Toggle the expand/collapse of product info
  };

  const handleSizeClick = (size) => {
    console.log("Selected size:", size);
    setSelectedSize(size); // Update the selected size
  };

const httpsUrlRegex = /(https:\/\/[^\s]+)/g;
const extractedHttpsUrl = initialPost.caption?.match(httpsUrlRegex)?.[0] || "";
const currProduct = extractedHttpsUrl? products.find(product => product.variants[0].url === extractedHttpsUrl): null;

console.log("Extracted URL from grid:", extractedHttpsUrl);
console.log("Current Product:", currProduct);


  if (!products.length) {
    return <p>Loading products...</p>;
  }
  
  // Find the available sizes for the current product
  const availableSizes = currProduct?.sizes || []; // Using all unique sizes

  return (
    <>
      <div className={styles.outer_div}>
        <div className={styles.inner_div}>
          <button className={styles.prev_btn} onClick={handlePrev}>
            &#10094;
          </button>

          {/* Left Div: Previous Video */}
          <div className={`${styles.left_div} ${animation === "prev" ? styles.leftSlide : ""}`}>

            {videos[prevIndex] && (
              <video
                className={styles.center_video}
                src={videos[prevIndex].media_url}
                muted
                autoPlay
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          <div className={styles.outer_center_div}>
            {/* Center Div: Current Video */}
            <div className={`${styles.center_div} ${styles.activeSlide}`}>
              <video
                className={styles.center_video}
                src={initialPost.media_url}
                controls
                muted
                autoPlay
              >
                Your browser does not support the video tag.
              </video>
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
            </div>
          </div>

          {/* Right Div: Next Video */}
          {/* <div
            className={`${styles.right_div} ${animation === "next" ? "slide_in_right" : ""
              }`}
            onAnimationEnd={handleAnimationEnd}
          > */}
        <div className={`${styles.right_div} ${animation === "next" ? styles.rightSlide : ""}`}>
        {videos[nextIndex] && (
              <video
                className={styles.center_video}
                src={videos[nextIndex].media_url}
                muted
                autoPlay
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          <button className={styles.next_btn} onClick={handleNext}>
            &#10095;
          </button>

          <button onClick={closeSlider} className={styles.close_button}>
            X
          </button>

      </div>
      </div>

    </>
  );
};

export default Grid;
