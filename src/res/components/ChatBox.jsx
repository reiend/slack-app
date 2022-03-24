import React, {useState} from "react";
import "./ChatBox.scss";

const ChatBox = ({
  channel,
  channelTypeRender,
  onSubmitSendChannelMessage,
}) => {


  const onClickIsAddMember = () => {
    console.log("add member");
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

            <button onClick={onClickIsAddMember}>add member</button>

            <form
              className="messages-form"
              onSubmit={onSubmitSendChannelMessage}
            >
              <div>
                <input
                  type="text"
                  className="message"
                  id="message"
                  name="message"
                />
                <button>send</button>
              </div>
            </form>
          </div>
        </div>
      ))}
      {/* filler */}
      <div className="chat-room-filler"></div>
    </div>
  );
};

export default ChatBox;

