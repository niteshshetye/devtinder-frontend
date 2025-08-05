import React from "react";

const Header = ({ heading = "" }) => {
  return <h1 className="text-bold text-2xl">{heading}</h1>;
};

export default Header;
