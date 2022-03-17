import React, {useState, useEffect} from "react";
import Signin from "@components/Signin.jsx";
import Signup from "@components/Signup.jsx";
import Chat from "@components/Chat.jsx";
import { Routes, Route, Outlet } from "react-router-dom";

const App = () => {
  const [accessToken, setAccessToken] = useState();
  const [client, setClient] = useState();
  const [expiry, setExpiry] = useState();
  const [uid, setUID] = useState();

  const setSignInHeaders = {
    setAccessToken,
    setClient,
    setExpiry,
    setUID,
  };

  const signInHeaders = {
    accessToken,
    client,
    expiry,
    uid,
  };

  // tempory data for sign in headers
  // remove this after setting headers on forms
  // useEffect(() => {
  //   setAccessToken("zx_weZm7ysoq-130aohvTA");
  //   setClient("AWpKzV1fYKVAnOfCcf59Bw");
  //   setExpiry("1648648223");
  //   setUID("usapptest2@gmail.com");
  // }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={ <Signin { ...setSignInHeaders }/> }/>
        <Route path="signup" element={ <Signup /> }/>
        <Route path="chat" element={ <Chat {...signInHeaders}/> }/>
      </Routes>
       <Outlet/>
    </div>
  );
};

export default App;
