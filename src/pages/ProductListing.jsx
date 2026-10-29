import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getPaginatedItems } from "../services/api";
import "../styles/ProductListingPage.css";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 15;

const ProductListing = ({ filtersOpen, onCloseFilters }) => {
  // states
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "";
  const selectedBrands = searchParams.getAll("brand");
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  // effects
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await getPaginatedItems({
          limit: ITEMS_PER_PAGE,
          skip: (page - 1) * ITEMS_PER_PAGE,
          category: selectedCategory,
          search: searchTerm,
        });
        setProducts(data.products);
        setTotalProducts(data.total);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page, searchTerm, selectedCategory]);

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
      params.delete("search");

      if ("category" in changes) {
        params.delete("category");
        if (changes.category) params.set("category", changes.category);
        params.set("page", "1");
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
      params.set("page", "1");
      return params;
    });
  };

  const handlePageChange = (nextPage) => {
    setSearchParams((previousParams) => {
      const params = new URLSearchParams(previousParams);
      params.set("page", String(nextPage));
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
          <>
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(totalProducts / ITEMS_PER_PAGE)}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="no-results">No products found.</div>
        ))}
    </div>
  );
};

export default ProductListing;
