// pages/BookDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "../components/button";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://gutendex.com/books/${id}/`);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

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
    <div className="mt-20">
      <div className="flex flex-row justify-center items-center ">
        <img src={book.formats["image/jpeg"]} alt={book.title} />
        <div>
          <h1>{book.title}</h1>
          <p>{book.authors.map((author) => author.name).join(", ")}</p>
          <Button>Read Now</Button>
          <Button>Download</Button>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
