import React from "react";
import {Link} from "react-router-dom"
const Button = ({to, children, stats}) => {
  return (
    <Link to={to}>
    <button className={`bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded hover:bg-indigo-400 
    duration-500 ${stats}`}>
      {children}
    </button>
    </Link>
    
  );
};

export default Button;
