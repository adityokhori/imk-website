import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ShowSideGenre = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("https://gutendex.com/genres");
        setGenres(response.data.results);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const fetchBooksByGenre = async (genre) => {
    try {
      const response = await axios.get(`https://gutendex.com/books?topic=${genre}`);
      return response.data.results;
    } catch (error) {
      console.error(`Error fetching books for genre ${genre}:`, error);
      return [];
    }
  };

  const renderCarousel = async (genre) => {
    const books = await fetchBooksByGenre(genre);

    return (
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            partialVisibilityGutter: 40
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            partialVisibilityGutter: 30
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            partialVisibilityGutter: 30
          }
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {books.map((book, index) => (
          <img key={index} src={book.formats['image/jpeg']} alt={book.title} />
        ))}
      </Carousel>
    );
  };

  return (
    <div>
      {genres.map((genre, index) => (
        <div key={index}>
          <h2>{genre}</h2>
          {renderCarousel(genre)}
        </div>
      ))}
    </div>
  );
};

export default ShowSideGenre;
