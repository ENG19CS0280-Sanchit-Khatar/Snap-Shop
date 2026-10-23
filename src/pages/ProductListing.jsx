import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../services/api";
import "../styles/ProductListingPage.css";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";

const ProductListing = () => {
  // states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "";
  const selectedBrand = searchParams.get("brand") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  // effects
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts({
          search: searchTerm,
          category: selectedCategory,
          brand: selectedBrand,
          minPrice: minPrice,
          maxPrice: maxPrice,
        });
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchTerm, selectedCategory, minPrice, maxPrice, selectedBrand]);

  return (
    <div className="product-listing-page">
      {loading && <div className="loading-state">Loading products...</div>}

      {error && <div className="error-state">Error: {error}</div>}

      {!loading &&
        !error &&
        (products.length > 0 ? (
          <div className="product-grid-layout">
            <FilterSidebar />
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="no-results">No products found.</div>
        ))}
    </div>
  );
};

export default ProductListing;
