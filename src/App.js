import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./App.scss";

const App = () => {
  return(
    <div className="box2">
      <h1>Book keeper</h1>
      <nav className="mt5"> 
        <Link to="/invoices" className="nav-links">Invoices</Link> | {" "}
        <Link to="/expenses" className="nav-links">Expenses</Link>
      </nav>
      <Outlet/>
    </div>
  )
};

export default App;

