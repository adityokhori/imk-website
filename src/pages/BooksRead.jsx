import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BookRead = () => {
  const [bookContent, setBookContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId, bookId } = useParams();


  useEffect(() => {
    const fetchBookContent = async () => {
      try {
        console.log(`${bookId}`);
        const response = await fetch(`http://localhost:3001/book/${bookId}`);

        const content = await response.text();
        setBookContent(content);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBookContent();
  }, [bookId]);
  
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
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <pre className="text-sm">{bookContent}</pre>
      </div>
    </div>
  );
};

export default BookRead;
