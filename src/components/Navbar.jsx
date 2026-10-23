import React, { useState, useEffect } from "react";
import { ShoppingCart, User, Menu } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import "../styles/Navbar.css";
import SearchBar from "./SearchBar";

const Navbar = (props) => {
  // states
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState("");

  // effect for debouncing the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchInput]);
  console.log("debouncedSearchInput", searchInput, debouncedSearchInput);

  // handlers
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    <header className="navbar-header">
      {/* Left section */}
      <div className="navbar-left">
        <button className="navbar-menu-btn">
          <Menu size={24} />
        </button>
        <Link to="/" className="navbar-brand">
          Snap Shop
        </Link>
      </div>
      {/* Center section */}
      <div className="navbar-search-container">
        <SearchBar
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Search products..."
        />
      </div>
      {/* Right section */}
      <div className="navbar-right">
        <div className="navbar-action-item">
          <ShoppingCart size={20} />
        </div>
        <div className="navbar-action-item">
          <User size={20} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
