import React from "react";
import {
  NavLink,
  useLocation,
} from "react-router-dom";

import "./Link.scss";

const QueryNavLink = ({to, ...props}) => {
  const location = useLocation();
  return ( <NavLink to={to + location.search} {...props} />);
};

export default QueryNavLink;
