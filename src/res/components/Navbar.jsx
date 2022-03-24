import React from "react";
import "./Navbar.scss";

const Navbar = ({
  onClickSignout
}) => {
  return (
      <nav className="account" aria-label="account-info">
        <span className="profile">
          {/* { localStorage.getItem("lastname")[FIRST_LETTER] || ""} */}
          {/* { localStorage.getItem("firstname")[FIRST_LETTER] || "N"} */}
        </span>
        <ul className="account-info">
          <li>Friends</li>
          <li>Settings</li>
          <li id="logout" onClick={onClickSignout}>
            Signout
          </li>
        </ul>
      </nav>
  );
};

export default Navbar;

