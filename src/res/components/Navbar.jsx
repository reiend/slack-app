import React from "react";
import "./Navbar.scss";

const Navbar = ({ onClickSignout }) => {
  const FIRST_LETTER = 0;
  return (
    <nav className="account" aria-label="account-info">
      <span className="profile">
        {localStorage.getItem("firstname")
          ? localStorage.getItem("firstname")[FIRST_LETTER]
          : localStorage.getItem("uid")[FIRST_LETTER]}
        {localStorage.getItem("lastname")
          ? localStorage.getItem("lastname")[FIRST_LETTER]
          : ""}
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
