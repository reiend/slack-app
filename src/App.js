import React, {useState, useEffect} from "react";
import { Outlet } from "react-router-dom";

const App = () => {

  const [accessToken, setAccessToken] = useState();
  const [client, setClient] = useState();
  const [expiry, setExpiry] = useState();
  const [uid, setUID] = useState();

  // const setSignInHeaders = {
  //   setAccessToken,
  //   setClient,
  //   setExpiry,
  //   setUID,
  // };

  const signInHeaders = {
    accessToken,
    client,
    expiry,
    uid,
  };

  // tempory data for sign in headers
  // remove this after setting headers on forms
  useEffect(() => {
    setAccessToken("zx_weZm7ysoq-130aohvTA");
    setClient("AWpKzV1fYKVAnOfCcf59Bw");
    setExpiry("1648648223");
    setUID("usapptest2@gmail.com");
  }, []);

  return (
    <div>
      {/* <h2>Auth route Initial</h2> */}
      <Outlet/>
    </div>
  );
};

export default App;
