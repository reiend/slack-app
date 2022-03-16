import React, {useState, useEffect} from "react";
import Signin from "@components/Signin.jsx";
import Signup from "@components/Signup.jsx";
import Chat from "@components/Chat.jsx";

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
  useEffect(() => {
    setAccessToken("zx_weZm7ysoq-130aohvTA");
    setClient("AWpKzV1fYKVAnOfCcf59Bw");
    setExpiry("1648648223");
    setUID("usapptest2@gmail.com");
  }, []);

  return (
    <div>
      {/* <Signin {...setSignInHeaders}/> */}
      {/* <Signup/> */}
      <Chat signInHeaders={signInHeaders} token={accessToken}/>
    </div>
  );
};

export default App;
