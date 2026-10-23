import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { getCategoryList } from "../services/api";
import "../styles/FilterSidebar.css";

const FilterSidebar = (props) => {
  const {
    isOpen,
    onClose,
    products,
    selectedCategory,
    selectedBrands,
    minPrice,
    maxPrice,
    handleFiltersChange,
  } = props;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatCategory = (category) =>
    category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const data = await getCategoryList();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesData();
  }, []);

  const availableBrands = [
    ...new Set(
      products
        .filter(
          (product) =>
            !selectedCategory || selectedCategory === product.category,
        )
        .map((product) => product.brand)
        .filter(Boolean),
    ),
  ].sort((a, b) => a.localeCompare(b));

  const selectCategory = (category) => {
    handleFiltersChange({ category, brands: [] });
  };

  if (!isOpen) return null;

  return (
    <div
      className="filter-drawer-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <aside
        className="filter-sidebar"
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="filter-sidebar-header">
          <h2 id="filter-drawer-title">Filters</h2>
          <button className="filter-close-btn" type="button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <p className="filter-loading">Loading filters...</p>
        ) : (
          <div className="filter-sections">
            <section className="filter-section">
              <h3>Categories</h3>
              <ul className="filter-list">
                <li>
                  <label className="filter-checkbox">
                    <input
                      type="radio"
                      name="category"
                      checked={!selectedCategory}
                      onChange={() => selectCategory("")}
                    />
                    <span>All Products</span>
                  </label>
                </li>
                {categories.map((category) => {
                  return (
                    <li key={category}>
                      <label className="filter-checkbox">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => selectCategory(category)}
                        />
                        <span>{formatCategory(category)}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className="filter-section">
              <h3>Brands</h3>
              {availableBrands.length > 0 ? (
                <ul className="filter-list">
                  {availableBrands.map((brand) => (
                    <li key={brand}>
                      <label className="filter-checkbox">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => {
                            const brands = selectedBrands.includes(brand)
                              ? selectedBrands.filter((itm) => itm !== brand)
                              : [...selectedBrands, brand];
                            handleFiltersChange({ brands });
                          }}
                        />
                        <span>{brand}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="filter-loading">
                  No brands available for this category.
                </p>
              )}
            </section>

            <section className="filter-section">
              <h3>Price Range</h3>
              <div className="price-range-inputs">
                <label>
                  Min
                  <input
                    type="number"
                    min="0"
                    value={minPrice}
                    onChange={(event) =>
                      handleFiltersChange({ minPrice: event.target.value })
                    }
                  />
                </label>
                <label>
                  Max
                  <input
                    type="number"
                    min="0"
                    value={maxPrice}
                    onChange={(event) =>
                      handleFiltersChange({ maxPrice: event.target.value })
                    }
                  />
                </label>
              </div>
            </section>
          </div>
        )}

        <div className="filter-actions">
          <button
            className="filter-clear-btn"
            type="button"
            onClick={() =>
              handleFiltersChange({
                category: "",
                brands: [],
                minPrice: "",
                maxPrice: "",
              })
            }
          >
            Clear all
          </button>
        </div>
      </aside>
    </div>
  );
};

export default FilterSidebar;
