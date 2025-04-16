import { useState, useEffect, useRef } from "react";
import InfiniteScrollingText from "./InfiniteScrollingText";
import ProductMenuPopUp from "./ProductMenuPopUp";
import ResourceMenuPopUp from "./ResourceMenuPopUp";
import { Link } from "react-router-dom";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProduct, setIsOpenProduct] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpenProduct(false);
    }
  };
  const openLoginInNewTab = () => {
    window.open("/login", "_blank", "noopener,noreferrer");
  };

  const closeMenuWithDelay = () => {
    setTimeout(() => setIsMenuOpen(false), 300);
  };

  useEffect(() => {
    if (isOpenProduct) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenProduct]);

  const [isResourceOpen, setIsResourceOpen] = useState(false);
  const resourceDropdownRef = useRef(null);

  // New function for handling outside clicks for Resources dropdown
  const handleClickOutsideResources = (event) => {
    if (resourceDropdownRef.current && !resourceDropdownRef.current.contains(event.target)) {
      setIsResourceOpen(false);
    }
  };

  // New useEffect for Resources dropdown
  useEffect(() => {
    if (isResourceOpen) {
      document.addEventListener("mousedown", handleClickOutsideResources);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideResources);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideResources);
    };
  }, [isResourceOpen]);

  const menuRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false); // New state to track animation

  const handleClickOutsideMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsAnimating(true);  // Start exit animation
      setTimeout(() => {
        setIsMenuOpen(false); // Close menu after animation
        setIsAnimating(false);
      }, 300); // Match animation duration
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutsideMenu);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, [isMenuOpen]);


  return (
    <header className="fixed top-0 left-0 w-full z-50 flex flex-col items-center">
      {/* Announcement Bar */}
      <InfiniteScrollingText />

      {/* Navigation Bar */}
      <nav className="flex justify-between items-center w-full px-3 py-4 bg-white font-semibold ">

        {/* Left Section: Logo & VidsCommerce */}
        <div className="flex items-center gap-x-3 mr-10">
          <img
            src="./images/vidscommerce.png"
            alt="Logo"
            className="h-8 w-8 sm:h-10 sm:w-10 md:h-10 md:w-10 object-contain"
          />
          <Link to="/">
            <span className="text-xl sm:text-2xl md:text-[1.75rem] lg:text-[2rem] font-bold 
                        hover:text-[#e75471] text-[#0b0a0a] 
                        transition-colors duration-200 ease-in-out">
              VidsCommerce
            </span>
          </Link>
        </div>

        {/* Middle Section: Log In button (Slightly right on small screens) */}
        <div className="flex lg:hidden items-center gap-x-1 md:gap-x-0 mr-5">
          <button
            onClick={openLoginInNewTab}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-[#e75471] text-sm ml-auto whitespace-nowrap mr-0">
            Log In
          </button>

          {/* Right Section: Hamburger Menu (Shown on screens below 1024px) */}
          <button
            onClick={() => {
              if (isMenuOpen) {
                setTimeout(() => setIsMenuOpen(false), 300); // Delay state update to allow animation
              } else {
                setIsMenuOpen(true);
              }
            }}
            className="p-2 border rounded-md flex flex-col justify-center items-center w-10 h-10 relative ml-3">
            <div className={`w-6 h-0.5 bg-black transition-transform duration-300 
              ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}></div>
            <div className={`w-6 h-0.5 bg-black my-1 transition-opacity duration-300 
              ${isMenuOpen ? "opacity-0" : ""}`}></div>
            <div className={`w-6 h-0.5 bg-black transition-transform duration-300 
              ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></div>
          </button>
        </div>


        {/* Slide-in menu for screens below 1024px */}
        <div
          ref={menuRef} // Attach ref here
          className={`absolute right-0 w-[250px] bg-white shadow-md overflow-hidden 
      transition-all duration-300 ease-in-out
      ${isMenuOpen ? "top-full opacity-100 max-h-[500px] p-4" : "opacity-0 max-h-0 p-0 pointer-events-none"}`}
        >
<ul className="flex flex-col space-y-1 text-[#151414] text-sm font-semibold">
  <li className="relative flex items-center" ref={dropdownRef}>
    <div className="relative w-full">
      <button
        className="transition px-3 py-1 flex items-center justify-between w-full"
        onClick={() => setIsOpenProduct((prev) => !prev)}
      >
        <span>Products</span>
        <span>
          <svg width="8" height="7" viewBox="0 0 9 6" fill="none">
            <path d="M7.70078 1.39961L4.50078 4.59961L1.30078 1.39961" fill="#151414"></path>
            <path d="M7.70078 1.39961L4.50078 4.59961L1.30078 1.39961L7.70078 1.39961Z" stroke="#151414" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </span>
      </button>
      {isOpenProduct && <ProductMenuPopUp closeDropdown={() => setIsOpenProduct(false)} />}
    </div>
  </li>
  
  <li className="relative flex items-center" ref={resourceDropdownRef}>
    <div className="relative w-full">
      <button
        className="transition px-3 py-1 flex items-center justify-between w-full"
        onClick={() => setIsResourceOpen(!isResourceOpen)}
      >
        <span>Resources</span>
        <span>
          <svg width="8" height="7" viewBox="0 0 9 6" fill="none">
            <path d="M7.70078 1.39961L4.50078 4.59961L1.30078 1.39961" fill="#151414"></path>
            <path d="M7.70078 1.39961L4.50078 4.59961L1.30078 1.39961L7.70078 1.39961Z" stroke="#151414" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </span>
      </button>
      {isResourceOpen && <ResourceMenuPopUp closeDropdown={() => setIsResourceOpen(false)} />}
    </div>
  </li>

  <li>
    <a href="#" className="px-4 py-1.5 flex items-center gap-x-2 text-base font-semibold">
      <span>Partners</span>
      <span className="bg-gradient-primary-3 text-base px-1 rounded-md">30%</span>
    </a>
  </li>
  
  <li>
    <a href="#" className="px-4 py-1.5 block text-base font-semibold">Pricing</a>
  </li>
  
  <li>
    <a href="#" className="px-4 py-1.5 block text-base font-semibold">Customer Stories</a>
  </li>
</ul>


        </div>

        {/* Navigation Links for Larger Screens */}
        <ul className="hidden lg:flex w-full lg:w-[50%] justify-center space-x-3 text-[#151414] text-sm font-semibold">
          <li className="relative" ref={dropdownRef}>
            <div className="relative">
              <button
                onClick={() => setIsOpenProduct((prev) => !prev)}
                className="transition px-2 py-1 flex items-center"
              >
                Products
                <span className="pl-1 pt-1">
                  <svg width="8" height="7" viewBox="0 0 9 6" fill="none">
                    <path d="M7.70078 1.39961L4.50078 4.59961L1.30078 1.39961" fill="#151414"></path>
                    <path d="M7.70078 1.39961L4.50078 4.59961L1.30078 1.39961L7.70078 1.39961Z"
                      stroke="#151414" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </span>
              </button>

              {isOpenProduct && <ProductMenuPopUp closeDropdown={() => setIsOpenProduct(false)} />}
            </div>
          </li>

          <li className="relative" ref={resourceDropdownRef}>
            <button
              className=" rounded-lg p-1 flex items-center"
              onClick={() => setIsResourceOpen(!isResourceOpen)}
            >
              Resources
              <span className="pl-1 pt-1">
                <svg width="8" height="7" viewBox="0 0 9 6" fill="none">
                  <path d="M7.70078 1.39961L4.50078 4.59961L1.30078 1.39961" fill="#151414"></path>
                  <path d="M7.70078 1.39961L4.50078 4.59961L1.30078 1.39961L7.70078 1.39961Z"
                    stroke="#151414" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  </path>
                </svg>
              </span>
            </button>

            {isResourceOpen && (
              <ResourceMenuPopUp closeDropdown={() => setIsResourceOpen(false)} />
            )}
          </li>

          <li className="pt-4 font-medium">
            <a href="#" className="rounded-lg p-1">Customer Stories</a>
          </li>
          <li className="pt-4 font-medium">
            <a href="#" className="rounded-lg p-1">Partners <span className="bg-gradient-primary-3 text-xs px-1 rounded-md">30%</span></a>
          </li>
          <li className="pt-4 font-medium">
            <a href="#" className="rounded-lg p-1">Pricing</a>
          </li>
        </ul>

        {/* Right Section - Buttons */}
        <div className="hidden lg:flex w-[30%] pl-0 justify-start space-x-4 text-sm">
          <button className="hidden md:flex border-2 border-black px-3 py-2 rounded-lg items-center space-x-2 hover:bg-[#e75471] hover:text-white hover:border-[#e75471] text-sm">
            <span>
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.2531 3.11526C13.242 3.03484 13.1716 2.99034 13.1133 2.98544C12.6841 2.95318 12.2548 2.92118 11.8255 2.88944C11.8255 2.88944 10.9714 2.04151 10.8776 1.94766C10.7838 1.85386 10.6006 1.88239 10.5295 1.90332C10.5191 1.90641 10.3429 1.96077 10.0516 2.05093C9.76626 1.22994 9.26273 0.475487 8.37692 0.475487C8.35246 0.475487 8.32729 0.476478 8.30212 0.47791C8.0502 0.144745 7.73812 0 7.46857 0C5.40508 0 4.41925 2.57957 4.11015 3.89042C3.30833 4.13888 2.73871 4.31551 2.66595 4.33837C2.21839 4.47876 2.20424 4.49286 2.14547 4.91459C2.10124 5.23388 0.930176 14.2903 0.930176 14.2903L10.0554 16L14.9997 14.9304C14.9997 14.9304 13.264 3.19567 13.2531 3.11526ZM9.54721 2.20691L8.77507 2.4459C8.77535 2.39148 8.77563 2.33794 8.77563 2.2794C8.77563 1.76916 8.7048 1.35833 8.59117 1.03265C9.0476 1.08994 9.35157 1.60926 9.54721 2.20691ZM8.02497 1.13383C8.15187 1.4518 8.23438 1.90812 8.23438 2.52389C8.23438 2.55539 8.2341 2.5842 8.23383 2.61333C7.73168 2.76887 7.18602 2.93774 6.63916 3.10716C6.94622 1.92211 7.52178 1.34974 8.02497 1.13383ZM7.4119 0.553477C7.50096 0.553477 7.59068 0.583715 7.67655 0.642813C7.01523 0.954003 6.30638 1.73776 6.00703 3.30291L4.74652 3.6933C5.09714 2.49949 5.92975 0.553477 7.4119 0.553477Z"
                  fill="#95BF46"
                ></path>
              </svg>
            </span>
            <span className="text-sm">Install for Free</span>
          </button>
          <button
            onClick={openLoginInNewTab}
            className="bg-black text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg hover:bg-[#e75471] text-sm sm:text-sm whitespace-nowrap">
            Log In
          </button>
        </div>
      </nav>
    </header>
  );
};
export default Header;