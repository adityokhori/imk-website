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

const AppLayout = () =>{
  return(
    <>
      <Nav/>
      <Outlet/>
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <AppLayout/>,    
    children: [
      {
        path: "/",
        element: <Books/>,
      },
      {
        path: "/login",
        element: <LoginPage/>,
      },
      {
        path: "/register",
        element: <RegisterPage/>,
      },
      {
        path: "/book/:id",
        element: <BookDetail />,
      },
      {
        path: "/mybooks",
        element: <MyBooks />,
      }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="bg-indigo-600 w-full h-auto">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
