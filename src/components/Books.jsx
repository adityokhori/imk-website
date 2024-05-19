import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./button";
import { PiDownloadSimpleBold } from "react-icons/pi";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://gutendex.com/books/");
        setBooks(response.data.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <p className="flex min-h-screen justify-center items-center text-2xl text-white">
        Loading...
      </p>
    );
  }

  if (error) {
    console.log(error.message);
    return (
      <p className="flex min-h-screen justify-center items-center text-2xl text-white">
        Error: {error.message}
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md"
          >
            <img
              src={book.formats["image/jpeg"]}
              alt={book.title}
              className="w-1/2 h-40 object-fill mb-4 rounded-lg"
            />
            <h2 className="text-lg font-semibold line-clamp-2">{book.title}</h2>
            <p className="text-gray-600 line-clamp-1">
              {book.authors.map((author) => author.name).join(", ")}
            </p>
            <br></br>
            <div className="mt-auto">
              <Button>Read</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
