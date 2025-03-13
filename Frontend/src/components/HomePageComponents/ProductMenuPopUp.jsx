import React from "react";

function ProductMenuPopUp({ closeDropdown }) {
  return (
    <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2 z-50">
      <a 
        href="#" 
        className="block px-4 py-2 hover:bg-gray-100"
        onClick={closeDropdown} // Close dropdown on click
      >
        Product 1
      </a>
      <a 
        href="#" 
        className="block px-4 py-2 hover:bg-gray-100"
        onClick={closeDropdown} // Close dropdown on click
      >
        Product 2
      </a>
    </div>
  );
}

export default ProductMenuPopUp;
