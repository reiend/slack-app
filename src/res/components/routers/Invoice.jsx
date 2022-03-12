import React from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { getInvoice, deleteInvoice } from "@src/data.js";
import "./Link.scss";

const Invoice = () => {
  const params = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  const invoice = getInvoice(parseInt(params.invoiceID, 10));

  return (
    <main className="py2">
      <h2>Total Due: {invoice.amount}</h2>
      <p>{invoice.name} {invoice.number}</p>
      <p>Due Date: {invoice.due}</p>
        <button className="btn--sld-blue-L5 fsz1 px2 py1" onClick={
          () => {
            deleteInvoice(invoice.number);
            navigate("/invoices" + location.search);
          }
        }>
          Delete
        </button>
    </main> 
  );
};

export default Invoice;

