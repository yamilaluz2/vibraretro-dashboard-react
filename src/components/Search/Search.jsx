import React from 'react';
import './Search.css';

const Search = ({ placeholder, onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder || "Buscar..."}
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
};

export default Search;
