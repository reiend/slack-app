import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { BrowserRouter as Router } from "react-router-dom";


const app = document.createElement("div");
document.body.appendChild(app);

ReactDOM.render(
  <Router>
    <App/>
  </Router>,
  app,
);

