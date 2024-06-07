import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 1500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 p-3 rounded-full bg-orange-800 text-white hover:bg-orange-700 transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ transition: "opacity 0.3s" }}
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTopButton;
