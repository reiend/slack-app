import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Signin from "@components/Signin.jsx";
import Signup from "@components/Signup.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Signin />
        {/* <Signup/> */}
      </div>
    </BrowserRouter>
  );
};

export default App;
