import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getCategories } from "../services/api";
import "../styles/FilterSidebar.css";

const FilterSidebar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "all";

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesData();
  }, []);

  const handleCategoryChange = (categorySlug) => {
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      if (categorySlug === "all") {
        params.delete("category");
      } else {
        params.set("category", categorySlug);
      }
      return params;
    });
  };

  return (
    <aside className="filter-sidebar">
      <h3>Product Categories</h3>

      {loading ? (
        <p className="filter-loading">Loading filters...</p>
      ) : (
        <ul className="filter-list">
          <li>
            <button
              className={`filter-btn ${selectedCategory === "all" ? "active" : ""}`}
              onClick={() => handleCategoryChange("all")}
            >
              All Products
            </button>
          </li>

          {categories.map((itm) => {
            const slug = typeof itm === "object" ? itm.slug : itm;
            const name = typeof itm === "object" ? itm.name : itm;

            return (
              <li key={slug}>
                <button
                  className={`filter-btn ${selectedCategory === slug ? "active" : ""}`}
                  onClick={() => handleCategoryChange(slug)}
                >
                  {name.charAt(0).toUpperCase() +
                    name.slice(1).replace("-", " ")}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
};

export default FilterSidebar;
