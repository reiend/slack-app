import React, { useState } from "react";
import Backdrop from "@components/Backdrop.jsx";
import AddMember from "@components/AddMember.jsx";
import ChatBoxOptions from "@components/ChatBoxOptions.jsx";
import {CHANNEL_ID, CHANNEL_NAME, CHANNEL_MESSAGES} from "@globals/constants.js"
import "./ChatBox.scss";

const ChatBox = ({
  channel,
  channelTypeRender,
  onSubmitSendChannelMessage,
}) => {
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [channelID, setChannelID] = useState();

  const onClickIsAddMember = (evt) => {
    const presentChannelID = evt.target.parentElement.parentElement.parentElement;
    setChannelID(presentChannelID);
    setIsAddingMember(true);
  };

  return (
    <div className="chat-room-container">
      {/* render channels here */}
      {/* filler */}
      <div className="chat-room-filler"></div>

      {channel[channelTypeRender].map((channelInfo, i) => (
        <div
          className="chat-room"
          key={channelInfo[CHANNEL_ID] + `${i}`}
          id={channelInfo[CHANNEL_ID]}
        >
          <h2>{channelInfo[CHANNEL_NAME]}</h2>
          <div className="chat-box">
            <ul className="messages-container">
              {
                channelInfo[CHANNEL_MESSAGES].map(({id, body}) => <li key={id}>{body}</li> )
              }
            </ul>
            <ChatBoxOptions
              onSubmitSendChannelMessage={onSubmitSendChannelMessage}
              onClickIsAddMember={onClickIsAddMember}
            />
          </div>
        </div>
      ))}
      {/* filler */}
      <div className="chat-room-filler"></div>
      {isAddingMember && (
        <AddMember
          setIsAddingMember={setIsAddingMember}
          channelID={channelID}
        />
      )}
      {isAddingMember && <Backdrop />}
    </div>
  );
};

export default ChatBox;
