import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Books from "./pages/Books";
import Nav from "./components/nav";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookDetail from "./pages/BookDetail";
import MyBooks from "./pages/MyBooks";
import BookRead from "./pages/BooksRead";
import AboutPage from "./pages/AboutPage";
import LandingPage from "./pages/LandingPage";
import Fiction from "./pages/Genres/Fiction"
import NonFiction from "./pages/Genres/NonFiction"
import Fantasy from "./pages/Genres/Fantasy"
import Mistery from "./pages/Genres/Mistery"
import Romance from "./pages/Genres/Romance"
import SciFiction from "./pages/Genres/SciFiction"
import Thriller from "./pages/Genres/Thriller"


import { motion } from "framer-motion";
import AllGenre from "./pages/Genres/All-Genre";

const AppLayout = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeIn", delay: 0.2 }}
    >
      <Nav />
      <Outlet />
    </motion.div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/book",
        element: <Books />,
      },
      {
        path: "/book/:id",
        element: <BookDetail />,
      },
      {
        path: "/book/read/:userId/:bookId",
        element: <BookRead />,
      },
      {
        path: "/mybooks",
        element: <MyBooks />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/genre/fiction",
        element: <Fiction />,
      },
      {
        path: "/genre/non-fiction",
        element: <NonFiction />,
      },
      {
        path: "/genre/science-fiction",
        element: <SciFiction />,
      },
      {
        path: "/genre/fantasy",
        element: <Fantasy />,
      },
      {
        path: "/genre/thriller",
        element: <Thriller />,
      },
      {
        path: "/genre/romance",
        element: <Romance/>,
      },
      {
        path: "/genre/mistery",
        element: <Mistery />,
      },
      {
        path: "/genre/All-Genre",
        element: <AllGenre />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="w-full">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
