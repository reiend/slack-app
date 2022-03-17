import {Navigate} from "react-router-dom";

const RequiredAuth = ({children}) => {
  if(localStorage.getItem("access-Token") === undefined) {
    return <Navigate to={"/"} replace/>
  }

  return children;
};

export default RequiredAuth;


