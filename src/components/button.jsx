import React from "react";

const Button = ({buttonName, warna}) => {
  return (
    <button
      className={`h-10 px-5 font-semibold rounded-md ${warna} text-white`}
      type="submit"
    >
      {buttonName}
    </button>
  );
};

export default Button;