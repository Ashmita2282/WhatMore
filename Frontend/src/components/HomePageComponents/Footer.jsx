import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <div className="bg-black text-white pt-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-pink-500 via-pink-400 to-purple-400 
  py-8 px-4 md:py-12 md:px-6 rounded-lg 
  max-w-6xl mx-4 md:mx-10 lg:mx-16
  text-center md:text-left 
  flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Founders and Marketers, assemble!
            </h2>
            <p className="text-lg">
              Win the video marketing game before everyone else does
            </p>
          </div>
          <button className="mt-6 md:mt-0 bg-black text-white font-medium py-6 px-6 rounded-full flex items-center space-x-2 hover:bg-gray-800 transition">
            <span>Try it yourself</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Footer Section */}
        <footer className="mt-12 py-5 px-6">
          < div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {/* Column 1 */}
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Features</h3>
              <ul className="space-y-2 text-base">
                <li>Shoppable Videos</li>
                <li>Studio</li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-base">
                <li>Blog</li>
                <li>Customer Stories</li>
                <li>Customers</li>
                <li>Partners</li>
                <li>Shopify Apps</li>
                <li>FAQs</li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-base">
                <li>Getting started</li>
                <li><Link to="/about-us">About Us</Link></li>
                <li>Pricing</li>
                <li><Link to="/terms&conditions">Terms and Conditions</Link></li>
                <li>Careers</li>
                <li><Link to="/contact">Contact us</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              </ul>
            </div>


            {/* Column 4 */}
            {/* <div>
              <h3 className="text-lg font-bold mb-4">Compare</h3>
              <ul className="space-y-2">
                <li>VidsCommerce Vs Quinn</li>
                <li>VidsCommerce Vs Vimotia</li>
              </ul>
            </div> */}
            {/* Column 5 */}
            {/* <div>
              <h3 className="text-lg font-bold mb-4">Free AI Tools</h3>
              <ul className="space-y-2">
                <li>AI Image To Video Converter</li>
                <li>Dropshipping Ads Maker</li>
                <li>Instagram Ads Maker</li>
                <li>Tiktok Ads Maker</li>
                <li>Facebook Ads Maker</li>
                <li>AI Video Maker</li>
                <li>Auto Add Captions</li>
                <li>Amazon Product Review Video</li>
                <li>Instagram Reel Maker</li>
                <li>Add Music To Video</li>
              </ul>
            </div> */}
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
