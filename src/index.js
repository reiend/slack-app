import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Expenses from "@routers/Expenses.jsx";
import Invoices from "@routers/Invoices.jsx";
import Error from "@routers/Error.jsx";
import Invoice from "@routers/Invoice.jsx";
import InvoicesIndex from "@routers/InvoicesIndex.jsx";

const app = document.createElement("div");
document.body.appendChild(app);

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={ <App/> }>
        <Route path="expenses" element={ <Expenses/> }/>
        <Route path="invoices" element={ <Invoices/> }>
          <Route path=":invoiceID" element={ <Invoice/> }/>
          <Route index element={ <InvoicesIndex/> }/>
        </Route>
        <Route path="*" element={ <Error/> }/>  
      </Route>
    </Routes>   
  </Router>,
  app
);
