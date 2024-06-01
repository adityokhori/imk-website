import React from "react";
import {Link} from "react-router-dom"
const Button = ({to, children, stats, onClick}) => {
  return (
    <Link to={to}>
    <button className={`bg-indigo-600 text-white font-[Poppins]  rounded hover:bg-indigo-400 
    duration-500 ${stats}`} onClick={onClick}>
      {children}
    </button>
    </Link>
    
  );
};

export default Button;
