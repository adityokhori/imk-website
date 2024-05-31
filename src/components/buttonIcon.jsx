import React from "react";
import {Link} from "react-router-dom"
const ButtonIcon = ({children, stats}) => {
  return (
    <Link >
    <button className={`text-black px-2 py-0 font-[Poppins] rounded hover:bg-indigo-400 
    duration-500 ${stats}`}>
      {children}
    </button>
    </Link>
    
  );
};

export default ButtonIcon;
