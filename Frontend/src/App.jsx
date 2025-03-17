
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"
import Home from "./pages/HomePage/Home";
import Login from "./pages/HomePage/Login";
import SignUp from "./pages/HomePage/SignUp";
import ClientHome from "./pages/Client/ClientHome";
import DashboardLayoutBranding  from "./pages/Client/ClientPage";
import ManualShopifyConnect from "./components/ClientPanel/ManualShopifyConnect";
import SuperAdminHome from "./pages/SuperAdmin/SuperAdminHome";
import FacebookAuth from "./components/ClientPanel/FacebookAuth";
import VideoGrid from "./components/ClientPanel/VideoGrid";
import Grid from "./components/ClientPanel/Grid";

const App = () => {

  const [videos, setVideos] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [count, setCount] = useState(0);
  const httpsUrlRegex = /(https?:\/\/[^\s]+)/g;
  // const location = useLocation();

  const token = localStorage.getItem("token");

    useEffect(() => {
      const fetchPageAccessToken = async () => {
        try {
          const tokenResponse = await fetch("http://localhost:5000/auth/facebook/get_page_access_token", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
  
          const tokenData = await tokenResponse.json();
  
          if (!tokenData.pageAccessToken) {
            throw new Error("Failed to fetch Page Access Token");
          }
  
          console.log("Fetched Page Access Token:", tokenData.pageAccessToken);
  
          fetchVideos(tokenData.pageAccessToken);
        } catch (err) {
          console.error("Error fetching Page Access Token:", err);
        }
      };
  
      const fetchVideos = async (pageAccessToken) => {
        try {
          const response = await fetch("http://localhost:5000/auth/facebook/api/videos", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "Facebook-Page-Access-Token": pageAccessToken,
            },
            withCredentials: true,
          });
  
          const data = await response.json();
          setVideos(data);
      
          // Store videos in the database
          await axios.post(
            "http://localhost:5000/auth/facebook/saveVideos",
            {
              videos: data.map((video) => ({
                id: video.id,
                likes: video.likes,
                extracted_url: video.caption?.match(httpsUrlRegex)?.[0] || null,
                media_url: video.media_url,
              })),
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
        } catch (err) {
          console.error("Error fetching videos:", err);
        }
      };
  
      fetchPageAccessToken();
    }, [token]);


  const handleVideoClick = (video) => {
    setCurrentPost(video);
    
    setCount(count + 1);
  };

  const closeSlider = () => {
    setCurrentPost(null);
  };


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/client" element={<ClientHome />} />
      <Route path="/clientPage" element={<DashboardLayoutBranding count={count} />} />
      <Route path="/videoGrid" element={<VideoGrid videos={videos} handleVideoClick={handleVideoClick} />} />
      <Route path="/facebook" element={<FacebookAuth />} />
      <Route path="/shopify" element={<ManualShopifyConnect />} />
      <Route path="/superadmin" element={<SuperAdminHome />} />
    </Routes>
      {currentPost && (
          <Grid
            closeSlider={closeSlider}
            currentPost={currentPost}
            videos={videos}
          />
        )}
   
   </BrowserRouter>

  );
};

export default App;
