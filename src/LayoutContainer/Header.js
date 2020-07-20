import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div id="title">
      <span>Employee Details</span>
      <div className="link">
        <NavLink to="/Table">Table</NavLink>
        <NavLink to="/Form">Form</NavLink>
      </div>
    </div>
  );
};

export default Header;
