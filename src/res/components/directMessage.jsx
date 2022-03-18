import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
const handleMessage = (e) => {
  e.preventDefault();
  axios({
    method: "POST",
    mode: "no-cors",
    url: `${process.env.BASEURL}messages?receiver_id=1779&receiver_class=User&body=${e.target.body.value}`,
    headers: {
      // "Access-Control-Allow-origin": "*",
      // "Access-Control-Allow-Headers":
      //   "Origin, X-Requested-With, Content-Type, Accept",
      ["access-token"]: localStorage.getItem("access-token"),
      ["client"]: localStorage.getItem("client"),
      ["expiry"]: localStorage.getItem("expiry"),
      ["uid"]: localStorage.getItem("uid"),
    },
  });
  e.target.body.value = "";
};

export const DirectMessage = ({ accessToken, client, expiry, uid }) => {
  return (
    <form onSubmit={handleMessage}>
      <label htmlFor="messageInput">Message</label>
      <div>
        <textarea
          name="body"
          // ref={textarearef}
          // id="messageinput"
          // placeholder="enter your message..."
          // onkeydown={ontextareaenterpress} // submit form when enter key is pressed
        />
        <div>
          <input value="Send" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default DirectMessage;
