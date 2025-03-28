import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from 'react-router-dom';
import "swiper/css";
import "swiper/css/navigation";
import styles from "./VideoGrid.module.css";

const VideoGrid = ({ videos, handleVideoClick }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [showOptions, setShowOptions] = useState({});
    const [fetchedUrls, setFetchedUrls] = useState({}); // Stores URLs fetched from backend
    const [newUrl, setNewUrl] = useState(""); // Stores user input for new URL

    const token = localStorage.getItem("token");

//    console.log(`videos from videoGrid:${videos}`)
    const httpsUrlRegex = /(https:\/\/[^\s]+)/g;

    // Fetch Shopify product data
    useEffect(() => {
        const fetchAllProducts = async () => {
            const endpoint = "https://gristiptest.myshopify.com/api/2025-01/graphql.json";
            const accessToken = "7bcea6ccac70730be7c32d0dc91e5cd3"; 
            let allProducts = [];
            let hasNextPage = true;
            let cursor = null;

            while (hasNextPage) {
                const query = `{
                    products(first: 50, after: ${cursor ? `"${cursor}"` : "null"}) {
                        edges {
                            node {
                                id
                                title
                                handle
                                onlineStoreUrl
                                priceRange {
                                    minVariantPrice {
                                        amount
                                        currencyCode
                                    }
                                }
                            }
                            cursor
                        }
                        pageInfo {
                            hasNextPage
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
                    const products = json.data.products.edges.map(({ node }) => ({
                        id: node.id,
                        name: node.title,
                        url: node.onlineStoreUrl || `https://gristiptest.myshopify.com/products/${node.handle}`,
                        price: `${node.priceRange.minVariantPrice.amount} ${node.priceRange.minVariantPrice.currencyCode}`,
                    }));

                    allProducts = [...allProducts, ...products];

                    hasNextPage = json.data.products.pageInfo.hasNextPage;
                    cursor = json.data.products.edges.length > 0 ? json.data.products.edges[json.data.products.edges.length - 1].cursor : null;

                } catch (error) {
                    console.error("Error fetching Shopify data:", error);
                    hasNextPage = false;
                }
            }

            setProducts(allProducts);
        };

        fetchAllProducts();
    }, []);


    // Fetch video URL from backend caption
    const fetchVideoUrl = async () => {
        try {
            const response = await fetch("http://localhost:5000/client/getVideoUrl", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            const data = await response.json();
            // console.log("Fetched Videos:", data);

            if (response.ok) {
                // Store URLs with their respective video IDs
                const fetchedData = {};
                data.videos.forEach(video => {
                    fetchedData[video.video_id] = video.caption; // Directly using the caption as URL
                });

                setFetchedUrls(fetchedData); // Store as { video_id: url }
            } else {
                console.error("Error fetching video URLs:", data.error);
            }
        } catch (error) {
            console.error("Network error while fetching video URLs:", error);
        }
    };

    useEffect(() => {
        fetchVideoUrl();
    }, []);

    // console.log(fetchedUrls);

    // Update video URL in backend
    const updateVideoUrl = async (videoId) => {
        try {
            const response = await fetch("http://localhost:5000/client/updateVideoUrl", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ video_id: videoId, extracted_url: newUrl }),
                credentials: "include",
            });

            const data = await response.json();
            if (response.ok) {
                await fetchVideoUrl();  // ✅ Fetch fresh data after updating

                // setFetchedUrls((prev) => ({ ...prev, [videoId]: newUrl })); // Update displayed URL
                setShowOptions((prev) => ({ ...prev, [videoId]: false })); // Hide options
                setNewUrl(""); // Reset input
            } else {
                console.error("Error updating video URL:", data.error);
            }
        } catch (error) {
            console.error("Network error while updating video URL:", error);
        }
    };

    const toggleOptions = (videoId) => {
        setShowOptions(prev => ({
            ...prev,
            [videoId]: !prev[videoId]
        }));

        // Fetch video URL when user opens options
        if (!showOptions[videoId]) {
            fetchVideoUrl(videoId);
        }
    };

    // if (!videos.length || !products.length) {
    //     return <p>Loading videos and products...</p>;
    // }

    if (!videos.length) {
        return <p>Loading videos...</p>;
    }
    if (!products.length) {
        return <p>Loading products...</p>;
    }
    

    return (
        <>
            <div className={styles.header}>
                <h1>Instagram Videos</h1>
            </div>
            <div className={styles["video-carousel-container"]}>
                <button className={`${styles["swiper-button-prev"]} swiper-button-prev styled-button`}>
                    &#10094;
                </button>

                <Swiper
                    modules={[Navigation, Autoplay]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    breakpoints={{
                        100: { slidesPerView: 2 },
                        425: { slidesPerView: 5 },
                        1000: { slidesPerView: 6 },
                    }}
                >
                    {videos.map((video) => {
                        const extractedHttpsUrl = fetchedUrls[video.id] || ""; // URL fetched from backend
                        const currProduct = extractedHttpsUrl
                            ? products.find(product => product.url === extractedHttpsUrl)
                            : null;

                        return (
                            <SwiperSlide key={video.id}>
                                <div className={styles["video-slide-container"]}>
                                    <video
                                        src={video.media_url}
                                        autoPlay
                                        loop
                                        muted
                                        className={styles["video-rectangle"]}
                                        onClick={() => handleVideoClick(video)}
                                    />
                                    <div className={styles["video-info"]} onClick={() => handleVideoClick(video)}>
                                        <span className={styles["product-name"]}>{currProduct?.name || "Unavailable"}</span>
                                        <span className={styles["product-price"]}>{currProduct?.price || "Unavailable"}</span>

                                        <img
                                            src="../images/edit.png"
                                            alt="edit_image"
                                            className={styles.redirect_icon}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleOptions(video.id);
                                            }}
                                        />  

                                        {showOptions[video.id] && (
                                            <div className={styles["options-container"]}>
                                                {extractedHttpsUrl ? (
                                                    <>
                                                        <button onClick={() => window.open(extractedHttpsUrl, "_blank")}>
                                                            View Product
                                                        </button>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter new URL"
                                                            value={newUrl}
                                                            onChange={(e) => setNewUrl(e.target.value)}
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                        <button onClick={(e) => {
                                                            e.stopPropagation();
                                                            updateVideoUrl(video.id);
                                                        }}>
                                                            Update URL
                                                        </button>
                                                        <button
                                                            className="clear-button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setNewUrl(""); // Clears the input field
                                                            }}
                                                        >
                                                            X
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter new URL"
                                                            value={newUrl}
                                                            onChange={(e) => setNewUrl(e.target.value)}
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                        <button onClick={(e) => {
                                                            e.stopPropagation();
                                                            updateVideoUrl(video.id);
                                                        }}>
                                                            Add URL
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>

                <button className={`${styles["swiper-button-next"]} swiper-button-next styled-button`}>
                    &#10095;
                </button>
            </div >
        </>
    );
};

export default VideoGrid;
