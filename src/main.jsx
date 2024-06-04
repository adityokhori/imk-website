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


const AppLayout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
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
