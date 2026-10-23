import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../services/api";
import "../styles/ProductListingPage.css";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";

const ProductListing = ({ filtersOpen, onCloseFilters }) => {
  // states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "";
  const selectedBrands = searchParams.getAll("brand");
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  // effects
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts({
          search: searchTerm,
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
  }, [searchTerm]);

  const filteredProducts = products.filter((product) => {
    const categoryMatches =
      !selectedCategory || selectedCategory === product.category;
    const brandMatches =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const minPriceMatches = !minPrice || product.price >= Number(minPrice);
    const maxPriceMatches = !maxPrice || product.price <= Number(maxPrice);

    return (
      categoryMatches && brandMatches && minPriceMatches && maxPriceMatches
    );
  });

  const handleFiltersChange = (changes) => {
    setSearchParams((previousParams) => {
      const params = new URLSearchParams(previousParams);

      if ("category" in changes) {
        params.delete("category");
        if (changes.category) params.set("category", changes.category);
      }
      if ("brands" in changes) {
        params.delete("brand");
        changes.brands.forEach((brand) => params.append("brand", brand));
      }
      if ("minPrice" in changes) {
        if (changes.minPrice) params.set("minPrice", changes.minPrice);
        else params.delete("minPrice");
      }
      if ("maxPrice" in changes) {
        if (changes.maxPrice) params.set("maxPrice", changes.maxPrice);
        else params.delete("maxPrice");
      }
      return params;
    });
  };

  return (
    <div className="product-listing-page">
      <FilterSidebar
        isOpen={filtersOpen}
        onClose={onCloseFilters}
        products={products}
        selectedCategory={selectedCategory}
        selectedBrands={selectedBrands}
        minPrice={minPrice}
        maxPrice={maxPrice}
        handleFiltersChange={handleFiltersChange}
      />
      {loading && <div className="loading-state">Loading products...</div>}

      {error && <div className="error-state">Error: {error}</div>}

      {!loading &&
        !error &&
        (filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-results">No products found.</div>
        ))}
    </div>
  );
};

export default ProductListing;
