import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const FictionC = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("https://gutendex.com/books/?page=10");
      const data = await response.json();
      setBooks(data.results);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div>
      <Carousel responsive={responsive} className="w-1/2">
        {books.map((book) => (
          <Link to={`/book/${book.id}`} key={book.id}>
            <img
              src={book.formats["image/jpeg"]}
              alt={book.title}
              style={{ maxWidth: "50%", height: "auto" }}
            />
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default FictionC;
