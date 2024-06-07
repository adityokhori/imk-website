import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button/button";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase-config";
import SearchBooks from "./SearchBooks";

const Nav = () => {
  let Links = [
    { name: "Browser", link: "/book" },
    { name: "Genres" },
    { name: "About Us", link: "/about" },
    { name: "My Books", link: "/mybooks" },
  ];
  let genres = [
    { name: "Fiction", link: "/genre/fiction" },
    { name: "Non-Fiction", link: "/genre/non-fiction" },
    { name: "Science Fiction", link: "/genre/science-fiction" },
    { name: "Fantasy", link: "/genre/fantasy" },
    { name: "Thriller", link: "/genre/fantasy" },
    { name: "Romance", link: "/genre/fantasy" },
    { name: "Mistery", link: "/genre/fantasy" },
  ];

  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [activeLink, setActiveLink] = useState("");
  const [showGenres, setShowGenres] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setEmailVerified(currentUser.emailVerified);
      }
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      console.log(user?.email);
      setActiveLink(""); // Clear active link on logout
    } catch (error) {
      console.error("error logout", error);
    }
  };

  const ButtonLogOut = ({ children }) => {
    return (
      <button
        className={`bg-red-500 text-white font-[Poppins] py-2 px-6 rounded hover:bg-red-400 duration-500 md:ml-8`}
        onClick={logout}
      >
        {children}
      </button>
    );
  };

  const handleNavClick = (linkName) => {
    setActiveLink(linkName);
    if (linkName === "Genres") {
      setShowGenres(!showGenres);
    } else {
      setShowGenres(false);
    }
  };

  return (
    <div className="z-20 shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-orange-100 py-4 md:px-10 px-7">
        <Link to="/">
          <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
            eBoo<span className="text-orange-800">Kita.</span>
          </div>
        </Link>
        <div className="w-96 hidden md:block">
          <SearchBooks setSearchResults={setSearchResults} />
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>
        <div
          onClick={() => setSearchOpen(!searchOpen)}
          className="text-3xl absolute right-16 top-6 cursor-pointer md:hidden mr-2"
        >
          <ion-icon name="search"></ion-icon>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-orange-100 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li
              key={link.name}
              className="md:ml-8 text-xl md:my-0 my-7 relative"
            >
              <Link
                to={link.link || "#"}
                className={`${
                  activeLink === link.name
                    ? "bg-orange-800 text-white px-2 py-1"
                    : "text-gray-800"
                } hover:text-white hover:bg-orange-800 hover:px-2 py-1  duration-500 font-[Poppins]`}
                onClick={() => handleNavClick(link.name)}
              >
                {link.name}
              </Link>
              {link.name === "Genres" && showGenres && (
                <div className="container mx-auto">
                  <ul className="absolute mt-8">
                    {genres.map((genre) => (
                      <li
                        key={genre.name}
                        className="bg-orange-100 w-96 py-2 px-4 hover:bg-orange-200 text-base"
                      >
                        <Link
                          to={genre.link}
                          onClick={() => setShowGenres(false)}
                        >
                          {genre.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
          {!user || !emailVerified ? (
            <>
              <li>
                <Button
                  to={"/login"}
                  stats={
                    "py-2 px-6 md:ml-8 text-white bg-orange-800 font-bold hover:bg-orange-700 hover:text-white"
                  }
                >
                  Login
                </Button>
              </li>
              <li>
                <Button
                  to={"/register"}
                  stats={
                    "py-2 px-6 md:ml-8  text-orange-800 border border-orange-800 font-bold hover:bg-orange-800 hover:text-white"
                  }
                >
                  Sign Up
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <h3 className="border border-orange-800 text-orange-800 ml-4 p-2">
                  {user.email}
                </h3>
              </li>
              <li>
                <ButtonLogOut>Logout</ButtonLogOut>
              </li>
            </>
          )}
        </ul>
        {searchOpen && (
          <div className="w-full md:hidden mt-5">
            <SearchBooks setSearchResults={setSearchResults} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
