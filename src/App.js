import React, {useState, useEffect} from "react";
import Signin from "@components/Signin.jsx";
import Signup from "@components/Signup.jsx";
import Chat from "@components/Chat.jsx";
import RequiredAuth from "@components/RequiredAuth.jsx";
import { Routes, Route, Outlet } from "react-router-dom";

const App = () => {
  const [accessToken, setAccessToken] = useState();
  const [client, setClient] = useState();
  const [expiry, setExpiry] = useState();
  const [uid, setUID] = useState();
  const [isAddingChannel, setIsAddingChannel] = useState();

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

  const observeChannelAdd = {
    isAddingChannel,
    setIsAddingChannel,
  }

  return (
    
    <div>
        <Routes>
          <Route path="/" element={ <Signin { ...setSignInHeaders }/> }/>
          <Route path="signup" element={ <Signup /> }/>
          <Route path="chat" element={ 
              <RequiredAuth>
                <Chat {...signInHeaders} {...observeChannelAdd}/> 
              </RequiredAuth>
           } />
        </Routes>
       <Outlet/>
    </div>
  );
};

export default App;
