import React from "react";

import "@dneier";
import "./HelloWorld.scss";

const HelloWorld = () => {
  return (
    <div className="app">
      <div className="card bg--white br5">
        <h1 className="hello-world txt--blue-D2 fsz9 mb5">Hello world</h1>
        <span className="bdg--sld-blue-D4 mx2">WIP</span>
        <span className="bdg--sld-blue-D7 mx2">Installing Dependencies</span>
        <span className="bdg--sld-blue-D10 mx2">Getting things ready</span>
      </div>
    </div>
  )
};

export default HelloWorld;

