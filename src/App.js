import React, { useState, useEffect, useRef } from "react";
import Signin from "@components/Signin.jsx";
import Signup from "@components/Signup.jsx";
import Chat from "@components/Chat.jsx";
import RequiredAuth from "@components/RequiredAuth.jsx";
import { Routes, Route, Outlet } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "!style-loader!css-loader!react-toastify/dist/ReactToastify.css";
import "./App.scss";

const App = () => {
  toast.configure();
  const [accessToken, setAccessToken] = useState();
  const [client, setClient] = useState();
  const [expiry, setExpiry] = useState();
  const [uid, setUID] = useState();
  const [usersList, setUsersList] = useState([]);
  const [usersListID, setUsersListID] = useState([]);

  const [isHiddenSpinner, setIsHiddenSpinner] = useState(true);
  const [isHiddenRouteContainer, setIsHiddenRouteContainer] = useState(false);

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

  const completeLoad = () => {
    setIsHiddenSpinner(true);
    setIsHiddenRouteContainer(false);
  };

  // useEffect(async () => {
  //   if (localStorage.getItem("access-token") == undefined) {
  //     completeLoad();
  //   } else {
  //     const getUserInfo = async () => {
  //       axios({
  //         method: "get",
  //         url: `${process.env.BASEURL}users`,
  //         headers: {
  //           ["access-token"]: localStorage.getItem("access-token"),
  //           ["client"]: localStorage.getItem("client"),
  //           ["expiry"]: localStorage.getItem("expiry"),
  //           ["uid"]: localStorage.getItem("uid"),
  //         },
  //       }).then((res) => {
  //         res.data.data.forEach((user) => {
  //           setUsersList((prevUsersList) => [...prevUsersList, user.email]);
  //           completeLoad();
  //         });
  //         res.data.data.forEach((user) => {
  //           setUsersListID((prevUsersListID) => [...prevUsersListID, user.id]);
  //           completeLoad();
  //         });
  //       });
  //     };
  //     await getUserInfo();
  //   }
  // }, []);
  //
  return (
    <div className="app-container">
      <div className="spinner" hidden={isHiddenSpinner} />
      <div className="router-container" hidden={isHiddenRouteContainer}>
        <Routes>
          <Route path="/" element={<Signin {...setSignInHeaders} />} />
          <Route
            path="signup"
            element={
              <Signup {...setSignInHeaders} />
            }
          />
          <Route
            path="chat"
            element={
              <RequiredAuth>
                <Chat
                  {...signInHeaders}
                  usersList={usersList}
                  usersListID={usersListID}
                />
              </RequiredAuth>
            }
          />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
