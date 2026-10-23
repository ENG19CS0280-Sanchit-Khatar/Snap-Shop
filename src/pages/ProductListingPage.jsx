import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProducts } from "../services/api";
import "./ProductListingPage.css";

const ProductListingPage = () => {
  // states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // effects
  useEffect(() => {}, []);
};

export default ProductListingPage;
