import React from "react";

import "./CreateChannel.scss";

const CreateChannel = ({onSubmitAdd, onClickCancelAdd}) => {
  return (
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
  );
};

export default CreateChannel; 
