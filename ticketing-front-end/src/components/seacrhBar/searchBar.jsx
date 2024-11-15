// SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form className="search-bar">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Caută după numărul ticketului.."
            />
        </form>
    );
};

export default SearchBar;
