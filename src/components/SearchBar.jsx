import react from "react";
import { Search } from "lucide-react";
import "../styles/SearchBar.css";

const SearchBar = (props) => {
  const { value, onChange, placeholder = "Search..." } = props;
  return (
    <div className="search-container">
      <span className="search-icon">
        <Search className="search-icon" />
      </span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="search-input"
        id="search-input"
      />
    </div>
  );
};

export default SearchBar;
