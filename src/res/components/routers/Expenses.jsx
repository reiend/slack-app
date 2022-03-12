import React from "react";
import { Link } from "react-router-dom";
import "./Link.scss";

const Expenses = () => {
  return (
    <main className="py2">
      <h2>Expenses</h2>
      <Link to="/" className="back">back</Link>
    </main> 
  );
};

export default Expenses;

