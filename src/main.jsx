import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Books from "./pages/Books";
import Nav from "./components/nav";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"; 

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
    ]
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="bg-indigo-600">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
