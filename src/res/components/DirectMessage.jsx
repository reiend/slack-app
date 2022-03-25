import React, { useState, useRef } from "react";
import { useUserListContext } from "@context/UserListContext.jsx";

import axios from "axios";
import "./DirectMessage.scss";

const DirectMessage = ({ onClickCancelAdd, setChannel, getDirects }) => {

  const [usersListFilter, setUsersListFilter] = useState(null);

  const {usersList, usersListID} = useUserListContext();

  const inputReceiverRef = useRef(null);

  const onSubmitSend = (evt) => {
    evt.preventDefault();

    const message = (evt.target["send-message"].value);
    const email =  `${evt.target["send-user"].value}`;

    const userEmailIndex = (usersList.indexOf(email));
    const userID = usersListID[userEmailIndex];

    // console.log(userID, email);
    axios({
      method: "POST",
      url: `${process.env.BASEURL}messages?receiver_id=${userID}&receiver_class=User&body=${message}`,
      headers: {
        ["access-token"]: localStorage.getItem("access-token"),
        ["client"]: localStorage.getItem("client"),
        ["expiry"]: localStorage.getItem("expiry"),
        ["uid"]: localStorage.getItem("uid"),
      },
    }).then((res)=> {
      setChannel((prevChannel) => {
        // console.log(updatedDirects);
        // console.log(res);
        
        const updatedDirects = [...prevChannel.direct, email];
        const newChannelsInfo = {...prevChannel, direct: updatedDirects};
        return newChannelsInfo;
      });
    });
    getDirects();
    evt.target["send-message"].value = "";
  };

  const onClickGetUser = (evt) => {
    inputReceiverRef.current.value = evt.target.innerText;
  }

  const onChangeFilterUser = (evt) => {
    if (evt.target.value === "") {
      setUsersListFilter(null);
    } else {
      const filteredUser = usersList.filter(
        (user) => user.startsWith(evt.target.value)
      );
      setUsersListFilter(
        <ul className="filter-users-list-container-direct">
          {filteredUser.map((filterUser, i) => (
            <li key={filteredUser + i} onClick={onClickGetUser}>{filterUser}</li>
          ))}
        </ul>
      );
    }
  };

  return (
    <form className="send" onSubmit={onSubmitSend}>
      <div className="input-add-channel-container">
        <label htmlFor="add-channel" className="add-channel-label">
          Message
        </label>
        <textarea
          name="send-message"
          className="send-message"
          id="send-message"
          cols="26"
          rows="6"
        />
      </div>
      <div className="input-reviever-container">
        <label htmlFor="send-user" className="send-reciever-label">
          Email:{" "}
        </label>
        <input
          type="text"
          className="send-user"
          name="send-user"
          id="send-user"
          onChange={onChangeFilterUser}
          ref={inputReceiverRef}
        />
      </div>
      <button className="submit-add" type="submit">
        send
      </button>
      <button className="cancel-add" onClick={onClickCancelAdd}>
        cancel
      </button>
      {usersListFilter}
    </form>
  );
};

export default DirectMessage;
