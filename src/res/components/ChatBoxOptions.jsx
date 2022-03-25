import React from "react";
import "./ChatBoxOptions.scss";

const ChatBoxOptions = ({
  onClickIsAddMember,
  onSubmitSendChannelMessage,
}) => {

  return (
    <div className="chatbox-options-container">
      <button className="add-member-button" onClick={onClickIsAddMember} title="add member">+</button>
      <form
        className="message-form"
        onSubmit={onSubmitSendChannelMessage}
      >
        <textarea
          type="text"
          className="message-input"
          id="message-input"
          name="message-input"
        />
        <button className="message-button-send">send</button>
      </form>
    </div>
  );
};

export default ChatBoxOptions;
