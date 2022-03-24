import React from "react";
import "./AddMember.scss";

const AddMember = ({
  setIsAddingMember,
}) => {

  const onClickCloseAddMember = () => setIsAddingMember(false);

  const onSubmitAddMember = (evt) => {
    evt.preventDefault();
    console.log(evt.target["add-member"].value);
  };

  return (
    <form className="add-member-form" onSubmit={onSubmitAddMember}>
      <div className="input-add-member-container">
        <label htmlFor="add-member" className="add-member-label">
          Add member
        </label>
        <input
          type="text"
          className="input-member"
          name="add-member"
          id="add-member"
        />
      </div>

      <button className="add-member" type="submit">
        add 
      </button>

      <button className="cancel-add-member" onClick={onClickCloseAddMember}>
        cancel
      </button>
    </form>
  );
};

export default AddMember;
