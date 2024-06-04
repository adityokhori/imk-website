import React from "react";
import {Link} from "react-router-dom"
const Button = ({to, children, stats, onClick}) => {
  return (
    <Link to={to}>
    <button className={`font-[Poppins] rounded
    duration-500 ${stats}`} onClick={onClick}>
      {children}
    </button>
    </Link>
    
  );
};

export default Button;
