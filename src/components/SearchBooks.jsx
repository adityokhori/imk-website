import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchBooks = ({ setSearchResults }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 2) {
      try {
        const response = await axios.get(
          `https://gutendex.com/books/?search=${searchQuery}`
        );
        setResults(response.data.results);
        setSearchResults(response.data.results);
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    } else {
      setResults([]);
      setSearchResults([]);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && query.length > 2) {
      try {
        const response = await axios.get(
          `https://gutendex.com/books/?search=${query}`
        );
        setSearchResults(response.data.results);
        setResults(response.data.results);
        setQuery("");
        setResults([]);
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    }
  };

  const handleResultClick = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <div className="relative w-1/3 flex flex-row ">
      <input
        type="text"
        id="search"
        value={query}
        placeholder="Search your book..."
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        required
        className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
      />
      {results.length > 0 && (
        <ul className="fixed z-10 w-1/2 bg-white border border-gray-300 rounded-md max-h-60 overflow-auto mt-16">
          {results.map((book) => (
            <Link to={`/book/${book.id}`} key={book.id} onClick={handleResultClick}>
              <li className="p-2 border-b border-gray-300 last:border-0">
                {book.title}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBooks;
