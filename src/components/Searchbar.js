import React from 'react';

const Searchbar = ({ search, onSearchChange }) => {
  return (
    <div className="searchbar">
        <input
        type="text"
        placeholder="Search Pokemon..."
        value={search}
        onChange={onSearchChange}
        className="searchbarInput"
        />
    </div>
  );
};

export default Searchbar;