import React, { useState, useEffect } from "react";
import Signin from "@components/Signin.jsx";
import Signup from "@components/Signup.jsx";
import Chat from "@components/Chat.jsx";
// import DirectMessage from "./res/components/DirectMessage.jsx";
import RequiredAuth from "@components/RequiredAuth.jsx";
import { Routes, Route, Outlet } from "react-router-dom";
import axios from "axios";


const App = () => {
  const [accessToken, setAccessToken] = useState();
  const [client, setClient] = useState();
  const [expiry, setExpiry] = useState();
  const [uid, setUID] = useState();
  const [usersList, setUsersList] = useState([]);

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

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.BASEURL}/users`,
      headers: {
        ["access-token"]: localStorage.getItem("access-token"),
        ["client"]: localStorage.getItem("client"),
        ["expiry"]: localStorage.getItem("expiry"),
        ["uid"]: localStorage.getItem("uid"),
      },
    }).then((res) => {
      res.data.data.forEach((user) => {
        setUsersList((prevUsersList) => ([ ...prevUsersList, user.email]));
      });
    })
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Signin {...setSignInHeaders} />} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="chat"
          element={
            <RequiredAuth>
              <Chat {...signInHeaders} usersList={usersList}/>
            </RequiredAuth>
          }
        />
      </Routes>
      <Outlet />
    </div>
  );
};

export default App;
