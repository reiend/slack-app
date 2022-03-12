import React from "react";
import { Link } from "react-router-dom";
import "./Link.scss";

const Error = () => {
  return (
    <main className="py2">
      <h2>Threre's nothing here</h2>    
      <Link to="/" className="back">back</Link>
    </main> 
  );
};

export default Error;

