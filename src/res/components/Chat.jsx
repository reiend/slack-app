import React, { useState } from "react";
import "./Chat.scss";

const Chat = () => {
  const [isExpanded, setIsExpended] = useState(false);
  const [expandedInfo, setExpandedInfo] = useState(false);

  const channel = {
    text: ["general", "resources", "help", "group-1"],
    voice: [],
    direct: [],
  };

  const onClickChannelInfoExpand = (evt) => {
    setIsExpended(true);
    const FIRST_WORD = 0;
    const channelType = evt.target.innerText
      .split(" ")[FIRST_WORD]
      .toLowerCase();
    const channelNames = channel[channelType];
    setExpandedInfo(
      channelNames.map(name => <li className="channel-name">{name}</li>)
    );
  };

  const onMouseChannelInfoExpand = () => setIsExpended(false);

  return (
    <main className="chat">
      <nav className="account" ariaLabel="account-info">
        <span className="profile">JL</span>
        <ul className="account-info">
          <li>Friends</li>
          <li>Settings</li>
          <li id="logout">Logout</li>
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
        onMouseLeave={onMouseChannelInfoExpand}
      >
        <nav className={
          !isExpanded? "channel-info" : "channel-info channel-info-expanded"
        } ariaLabel="channel-Info">
          {Object.keys(channel).map((type) => (
            <h2 className="channel-type" onClick={onClickChannelInfoExpand}>
              {type} channel
            </h2>
          ))}
        </nav>
        { isExpanded && <ul> {expandedInfo} </ul> }
      </div>
    </main>
  );
};

export default Chat;
