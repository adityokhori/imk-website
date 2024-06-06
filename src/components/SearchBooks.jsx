import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchBooks = ({ setSearchResults }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const resultsRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full">
      <input
        type="text"
        id="search"
        value={query}
        placeholder="Search books"
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        required
        className="p-2 w-full font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-800"
      />
      {results.length > 0 && (
        <ul
          ref={resultsRef}
          className="fixed z-10 w-1/2 bg-white border border-gray-300 rounded-md max-h-60 overflow-auto mt-8"
        >
          {results.map((book) => (
            <Link
              to={`/book/${book.id}`}
              key={book.id}
              onClick={handleResultClick}
            >
              <li className="flex items-center justify-between p-2 border-b border-gray-300 last:border-0 hover:bg-slate-200">
                <div className="flex flex-col">
                  <span className="flex-1 font-semibold">{book.title}</span>
                  <span className="flex-1">
                    {book.authors.map((author) => author.name).join(", ")}
                  </span>
                </div>
                {book.formats["image/jpeg"] && (
                  <img
                    src={book.formats["image/jpeg"]}
                    alt={book.title}
                    className="ml-2 w-8 h-10 object-cover"
                  />
                )}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBooks;
