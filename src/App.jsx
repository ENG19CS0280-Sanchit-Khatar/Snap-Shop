import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductListing from "./pages/ProductListing";

// import "./App.css";

function App() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="App">
      <Navbar openFilters={() => setFiltersOpen((isOpen) => !isOpen)} />
      <Routes>
        <Route
          path="/"
          element={
            <ProductListing
              filtersOpen={filtersOpen}
              onCloseFilters={() => setFiltersOpen(false)}
            />
          }
        />
      </Routes>
    </div>
  );
}
export default App;
