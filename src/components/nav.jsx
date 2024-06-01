import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button/button";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase-config";

const Nav = () => {
  let Links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/" },
    { name: "My Books", link: "/mybooks" },
  ];
  let [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);

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
      navigate("/login");
    } catch (error) {
      console.error("error logout", error);
    }
  };

  const ButtonLogOut = ({ children }) => {
    return (
      <button
        className={`bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded hover:bg-indigo-400 duration-500 md:ml-8`}
        onClick={logout}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
          <span className="text-3xl text-indigo-600 mr-1 pt-2">
            <ion-icon name="logo-ionic"></ion-icon>
          </span>
          eBooKita
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <Link
                to={link.link}
                className="text-gray-800 hover:text-gray-400 duration-500 font-[Poppins]"
              >
                {link.name}
              </Link>
            </li>
          ))}
          {!user || !emailVerified ? (
            <>
              <li>
                <Button to={"/login"} stats={"py-2 px-6 md:ml-8"}>
                  Login
                </Button>
              </li>
              <li>
                <Button to={"/register"} stats={"py-2 px-6 md:ml-8"}>
                  Sign Up
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <h3 className="bg-green-400 ml-4 p-2">{user.email}</h3>
              </li>
              <li>
                <ButtonLogOut>Logout</ButtonLogOut>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
