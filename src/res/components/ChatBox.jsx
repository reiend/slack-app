import React, { useState } from "react";
import Backdrop from "@components/Backdrop.jsx";
import AddMember from "@components/AddMember.jsx";
import ChatBoxOptions from "@components/ChatBoxOptions.jsx";
import "./ChatBox.scss";

const ChatBox = ({
  channel,
  channelTypeRender,
  onSubmitSendChannelMessage,
}) => {
  const [isAddingMember, setIsAddingMember] = useState(false);

  const onClickIsAddMember = () => {
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
          key={channelInfo[0] + `${i}`}
          id={channelInfo[0]}
        >
          <h2>{channelInfo[1]}</h2>
          <div className="chat-box">
            <ul className="messages-container"></ul>
            <ChatBoxOptions
              onSubmitSendChannelMessage={onSubmitSendChannelMessage}
              onClickIsAddMember={onClickIsAddMember}
            />
          </div>
        </div>
      ))}
      {/* filler */}
      <div className="chat-room-filler"></div>
      {isAddingMember && <AddMember setIsAddingMember={setIsAddingMember} />}
      {isAddingMember && <Backdrop />}
    </div>
  );
};

export default ChatBox;
