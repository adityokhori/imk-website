import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import ScrollToTop from "../../components/scrollToTop";
import { motion } from "framer-motion";
import ShowSideGenre from "../../components/ShowSideGenre";

const Fiction = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://gutendex.com/books/?page=10`);
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
    alert("Please log in first to view book details.");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const booksToDisplay = searchResults.length > 0 ? searchResults : books;

  return (
    <div className="flex flex-row container mx-auto  mt-20">
      <div className="flex flex-col px-4 py-8 w-full">
        <div className=" font-[Poppins] text-gray-800">
          <h1 className="text-2xl font-semibold">Fiction:</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 ">
          {booksToDisplay.map((book, index) =>
            !user || !emailVerified ? (
              <Link to="/login">
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={
                    !user || !emailVerified
                      ? "cursor-not-allowed border-2 border-inherit rounded-lg shadow-md p-2 flex flex-col items-center justify-center"
                      : "hover:bg-slate-100 border-2 border-inherit rounded-lg shadow-md p-2 flex flex-col items-center justify-center"
                  }
                  onClick={!user || !emailVerified ? warningLogin : null}
                >
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
                </motion.div>
              </Link>
            ) : (
              <Link to={`/book/${book.id}`} key={book.id}>
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={
                    !user || !emailVerified
                      ? "cursor-not-allowed border-2 border-inherit rounded-lg shadow-md p-2 flex flex-col items-center justify-center"
                      : "hover:bg-slate-100 border-2 border-inherit rounded-lg shadow-md p-2 flex flex-col items-center justify-center"
                  }
                  onClick={!user || !emailVerified ? warningLogin : null}
                >
                  <div className="w-32 h-50 mb-4 rounded-lg overflow-hidden">
                    <img
                      src={book.formats["image/jpeg"]}
                      alt={book.title}
                      className="w-50 h-50 object-fill"
                    />
                  </div>
                  <h2 className="text-lg font-semibold line-clamp-2">
                    {book.title}
                  </h2>
                </motion.div>
              </Link>
            )
          )}
        </div>

        <ScrollToTop />
      </div>
    </div>
  );
};

export default Fiction;
