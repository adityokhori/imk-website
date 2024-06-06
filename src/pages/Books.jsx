import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase-config";
import SearchBooks from "../components/SearchBooks";
import SmoothScroll from 'smooth-scroll';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`https://gutendex.com/books/?page=${currentPage}`);
        setBooks(response.data.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setEmailVerified(currentUser.emailVerified);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <p className="flex min-h-screen justify-center items-center text-2xl text-black">
        Loading...
      </p>
    );
  }

  if (error) {
    console.log(error.message);
    return (
      <p className="flex min-h-screen justify-center items-center text-2xl text-black">
        Error: {error.message}
      </p>
    );
  }

  const warningLogin = () => {
    alert('Silakan login terlebih dahulu untuk melihat detail buku.');

  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setTimeout (scrollToTop, 500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth"});
  };

  const booksToDisplay = searchResults.length > 0 ? searchResults : books;

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {booksToDisplay.map((book) => (
          !user || !emailVerified ? (
            <Link to="/login">
            <div
              key={book.id}
              className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md cursor-not-allowed border-2 border-inherit"
              onClick={warningLogin}
            >
              <div className="w-32 h-50 mb-4 rounded-lg overflow-hidden">
                <img
                  src={book.formats["image/jpeg"]}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-lg font-semibold line-clamp-2">
                {book.title}
              </h2>
              <p className="text-gray-600 line-clamp-1">
                {book.authors.map((author) => author.name).join(", ")}
              </p>
            </div>
            </Link>
          ) : (
            <Link to={`/book/${book.id}`} key={book.id}>
              <div className="flex flex-col items-center justify-center p-2 rounded-lg shadow-md border-2 border-inherit">
                <div className="w-32 h-50 mb-4 rounded-lg overflow-hidden">
                  <img
                    src={book.formats["image/jpeg"]}
                    alt={book.title}
                    className="w-50 h-50 object-cover"
                  />
                </div>
                <h2 className="text-lg font-semibold line-clamp-2">
                  {book.title}
                </h2>
                <p className="text-gray-600 line-clamp-1">
                  {book.authors.map((author) => author.name).join(", ")}
                </p>
              </div>
            </Link>
          )
        ))}
      </div>

      <div className="flex justify-center mt-12">
        {[...Array(10)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-orange-800 text-white' : 'bg-gray-300 text-black'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
