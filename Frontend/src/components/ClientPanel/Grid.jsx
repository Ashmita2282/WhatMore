import React, { useState, useEffect } from "react";
import styles from "./Grid.module.css";
import axios from "axios";
import PrevButton from "../GridComponents/PrevButton";
import NextButton from "../GridComponents/NextButton";
import SideDiv from "../GridComponents/SideDiv";
import CenterDiv from "../GridComponents/CenterDiv";
import Details from "../GridComponents/Details";


const Grid = ({ closeSlider, currentPost, videos }) => {
  const [initialPost, setInitialPost] = useState(currentPost);
  const [animation, setAnimation] = useState("");
  const [products, setProducts] = useState([]); // To store the fetched Shopify products
  const [isExpanded, setIsExpanded] = useState(false); // To handle expand/collapse of product info
  const [selectedSize, setSelectedSize] = useState(null); // To store the selected size
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  
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

//Exract the URL from the caption using regex
const httpsUrlRegex = /(https:\/\/[^\s]+)/g;
const extractedHttpsUrl = initialPost.caption?.match(httpsUrlRegex)?.[0] || "";
const currProduct = extractedHttpsUrl? products.find(product => product.variants[0].url === extractedHttpsUrl): null;

  if (!products.length) {
    return <p>Loading products...</p>;
  }
  
  // Find the available sizes for the current product
  const availableSizes = currProduct?.sizes || []; // Using all unique sizes  

  return (
    <>
      <div className={styles.outer_div}>
        <div className={styles.inner_div}>
          <PrevButton videos={videos} prevIndex={prevIndex} setAnimation={setAnimation} setIsExpanded={setIsExpanded} setSelectedSize={setSelectedSize} setInitialPost={setInitialPost}/>

          {/* Left Div: Previous Video */}
          <div className={`${styles.left_div} ${animation === "prev" ? styles.leftSlide : ""}`}>
            <SideDiv videos={videos} index={prevIndex}/>
          </div>

          <div className={styles.outer_center_div}>
            {/* Center Div: Current Video */}
            <div className={`${styles.center_div} ${styles.activeSlide}`}>

                <CenterDiv initialPost={initialPost}/>
               <Details isExpanded={isExpanded} availableSizes={availableSizes} currProduct={currProduct} selectedSize={selectedSize} isPopupVisible={isPopupVisible} setIsPopupVisible={setIsPopupVisible} setSelectedSize={setSelectedSize} extractedHttpsUrl={extractedHttpsUrl} setIsExpanded={setIsExpanded}/>

            </div>
          </div>

          {/* Right Div: Next Video */}
        <div className={`${styles.right_div} ${animation === "next" ? styles.rightSlide : ""}`}>
        <SideDiv videos={videos} index={nextIndex}/>
          </div>

          <NextButton videos={videos} nextIndex={nextIndex} setAnimation={setAnimation} setIsExpanded={setIsExpanded} setSelectedSize={setSelectedSize} setInitialPost={setInitialPost}/>

          <button onClick={closeSlider} className={styles.close_button}>
            X
          </button>

      </div>
      </div>

    </>
  );
};

export default Grid;