import React from "react";
import {
  Link,
  Outlet,
  useSearchParams,
} from "react-router-dom";
import { getInvoices } from "@src/data.js";
import QueryNavLink from "@routers/QueryNavLink.jsx";
import "./Link.scss";

const Invoices = () => {
  let invoices = getInvoices();
  const [searchParams, setSearchParams] = useSearchParams();

  const onChangeInput = (event) => {
    let filter = event.target.value;
    if (filter) {
      setSearchParams({ filter });
    } else {
      setSearchParams({});
    }
  };

  return (
    <main className="py2">
      <h2>Invoices</h2>
      <div className="invoices-links">
        test
        <input
          value={searchParams.get("filter") || ""}
          onChange={onChangeInput}
        />
        {invoices
          .filter((invoice) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return parseInt(name.indexOf(filter.toLowerCase())) + 1;
          })
          .map((invoice) => (
            <QueryNavLink
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
              className={({ isActive }) => {
                return isActive ? "txt--blue-L5" : "txt--black";
              }}
            >
              {invoice.name}
            </QueryNavLink>
          ))}
        <Link to="/" className="link">
          back
        </Link>
        <Outlet />
      </div>
    </main>
  );
};

export default Invoices;
