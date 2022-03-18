import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  // for adding channel and friends
  const onSubmitAdd = (evt) => {
    evt.preventDefault();
    setIsAddingChannel(false)
  };
  const onClickAdd = () => setIsAdding(true);
  const onClickCancelAdd = () => setIsAdding(false);

  // temporary fetching of channels
  const getChannels = () => {
    axios({
      method: "get",
      url: `${baseURL}/channels?`,
      headers: {
        ["access-token"]: accessToken,
        ["client"]: client,
        ["expiry"]: expiry,
        ["uid"]: uid,
      },
    }).then((res) => {
      const channelsFetch = [];
      res.data.data.forEach((data) => {
        channelsFetch.push(data.name);
      });
      setChannel((prevChannel) => ({ ...prevChannel, text: channelsFetch }));
    });
  };

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
        
        {/* form for adding channels or friends */}
        {
        isAdding && 
        <form className="add" onSubmit={onSubmitAdd}>
          <div className="input-add-container">
            <label htmlFor="add-new" className="add-new">New</label>
            <input type="text" className="input-add" name="add-new" id="add-new"/>
          </div>
          <button className="submit-add" type="submit">save</button>
          <button className="cancel-add" onClick={onClickCancelAdd}>cancel</button>
        </form>
        }
        {/* backdrop for adding channel or friends */}
        { isAdding && <div className="adding-backdrop"></div>}
    </main>
  );
};

export default Chat;
