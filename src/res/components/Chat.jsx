import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Chat.scss";

const baseURL = "http://206.189.91.54/api/v1/";
const Chat = ({ accessToken, client, expiry, uid }) => {
  const navigate = useNavigate();

  const [channel, setChannel] = useState({
    text: [],
    voice: [],
    direct: [],
  });

  const [expandedInfo, setExpandedInfo] = useState(false);
  const [isExpanded, setIsExpended] = useState(false);
  // state for adding channel or friend
  const [isAdding, setIsAdding] = useState(false);

  const onClickChannelInfoExpand = (evt) => {
    setIsExpended(true);
    const FIRST_WORD = 0;
    const channelType = evt.target.innerText
      .split(" ")
      [FIRST_WORD].toLowerCase();
    const channelNames = channel[channelType];
    setExpandedInfo(
      channelNames.map((name) => <li className="channel-name">#{name}</li>)
    );
  };

  const onClickSignout = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("client");
    localStorage.removeItem("expiry");
    localStorage.removeItem("uid");
    navigate("/");
  };

  const onClickCloseChannelExpand = () => setIsExpended(false);

  // temporary fetching of channels
  const getChannels = () => {
    axios({
      method: "GET",
      url: `${baseURL}/channels?`,
      headers: {
        ["access-token"]: accessToken,
        ["client"]: client,
        ["expiry"]: expiry,
        ["uid"]: uid,
      },
    }).then((res) => {
      if(!res.data.data) return;
      const channelsFetch = [];
      res.data.data.forEach((data) => {
        channelsFetch.push(data.name);
      });
      setChannel((prevChannel) => ({ ...prevChannel, text: channelsFetch }));
    });
  };

  // for adding channel or friends
  const onSubmitAdd = async (evt) => {
    evt.preventDefault();
    const channelName = evt.target["add-channel"].value;
    const user = evt.target["add-user"].value;
    // console.log(localStorage.getItem("access-token")),
    // console.log(localStorage.getItem("client")),
    // console.log(localStorage.getItem("expiry")),
    // console.log(localStorage.getItem("uid")),
      
    axios({
      method: "POST",
      url: `${baseURL}/channels?name=${channelName}&user_ids=[${user}]`,
      headers: {
        "Access-Control-Allow-origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        ["access-token"]: localStorage.getItem("access-token"),
        ["client"]: localStorage.getItem("client"),
        ["expiry"]: localStorage.getItem("expiry"),
        ["uid"]: localStorage.getItem("uid"),
      },
    });
    console.log(channelName);
    console.log(user);
    console.log(`${baseURL}/channels?name=${channelName}&user_ids=[${user}]`);
  };
  const onClickAdd = () => setIsAdding(true);
  const onClickCancelAdd = () => setIsAdding(false);

  useEffect(() => {
    getChannels();
  }, []);

  return (
    <main className="chat">
      <nav className="account" ariaLabel="account-info">
        <span className="profile">JL</span>
        <ul className="account-info">
          <li>Friends</li>
          <li>Settings</li>
          <li id="logout" onClick={onClickSignout}>
            Signout
          </li>
        </ul>
      </nav>
      <div className="chat-room-container">
        {/* render channels here */}
        {/* filler */}
        <div className="chat-room-filler"></div>
        {channel.text.map((channelName) => (
          <div className="chat-room">
            <h2>{channelName}</h2>
            <div className="chat-box">messages</div>
          </div>
        ))}
        {/* filler */}
        <div className="chat-room-filler"></div>
      </div>
      <div
        className={
          !isExpanded
            ? "channel-info-container"
            : "channel-info-container channel-info-container-expanded"
        }
      >
        <nav
          className={
            !isExpanded ? "channel-info" : "channel-info channel-info-expanded"
          }
          ariaLabel="channel-Info"
        >
          {Object.keys(channel).map((type) => (
            <h2 className="channel-type" onClick={onClickChannelInfoExpand}>
              {type} channel
            </h2>
          ))}
        </nav>
        {isExpanded && (
          <ul className="channel-name-container"> {expandedInfo} </ul>
        )}
        {isExpanded && (
          <span
            className="close-channel-expand"
            onClick={onClickCloseChannelExpand}
          >
            ❌
          </span>
        )}
        {isExpanded && (
          <span className="add-channel" onClick={onClickAdd}>
            +
          </span>
        )}
      </div>

      {/* form for adding channels and friends*/}
      {isAdding && (
        <form className="add" onSubmit={onSubmitAdd}>
          <div className="input-add-channel-container">
            <label htmlFor="add-channel" className="add-channel-label">
              Channel
            </label>
            <input
              type="text"
              className="input-channel"
              name="add-channel"
              id="add-channel"
            />
          </div>

          <div className="input-add-user-container">
            <label htmlFor="add-user" className="add-user-label">
              User ID:{" "}
            </label>
            <input
              type="text"
              className="input-user"
              name="add-user"
              id="add-user"
            />
          </div>

          <button className="submit-add" type="submit">
            save
          </button>
          <button className="cancel-add" onClick={onClickCancelAdd}>
            cancel
          </button>
        </form>
      )}
      {/* backdrop for adding channel and friends*/}
      {isAdding && <div className="adding-backdrop"></div>}
    </main>
  );
};

export default Chat;
