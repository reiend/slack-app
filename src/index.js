import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import Signin from "@components/Signin.jsx";
import Signup from "@components/Signup.jsx";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

const app = document.createElement("div");
document.body.appendChild(app);

ReactDOM.render(
  <Router>
    <Routes>
      <Route element={ <App/>}>
        <Route index element={ <Signin/> }/>
        <Route path="/signup" element={ <Signup/> }/>
      </Route>
    </Routes>
  </Router>,
  app,
);

