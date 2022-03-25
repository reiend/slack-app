import React, { useState, useRef } from "react";
import "./AddMember.scss";
import { useUserListContext } from "@context/UserListContext.jsx";
import axios from "axios";

const AddMember = ({
  setIsAddingMember,
  channelID,
}) => {

  const [usersListFilter, setUsersListFilter] = useState(null);
  const onClickCloseAddMember = () => setIsAddingMember(false);
  const {usersList, usersListID} = useUserListContext();
  const inputMemberRef = useRef(null);

  const onSubmitAddMember = async (evt) => {
    evt.preventDefault();

    const email =  `${evt.target["add-member"].value}`;
    const userEmailIndex = (usersList.indexOf(email));
    const userID = usersListID[userEmailIndex];

    await axios({
      method: "POST",
      url: `${process.env.BASEURL}channel/add_member?id=${channelID.id}&member_id=${userID}`,
      headers: {
        ["access-token"]: localStorage.getItem("access-token"),
        ["client"]: localStorage.getItem("client"),
        ["expiry"]: localStorage.getItem("expiry"),
        ["uid"]: localStorage.getItem("uid"),
      },
    })

    // clear input to add new memeber
    inputMemberRef.current.value = "";
  };

  const onClickGetUser = (evt) => {
    inputMemberRef.current.value = evt.target.innerText;
  }

  const onChangeFilterUser = (evt) => {
    if (evt.target.value === "") {
      setUsersListFilter(null);
    } else {
      const filteredUser = usersList.filter(
        (user) => user.startsWith(evt.target.value)
      );
      setUsersListFilter(
        <ul className="filter-users-list-container-add-member">
          {filteredUser.map((filterUser, i) => (
            <li key={filteredUser + i} onClick={onClickGetUser}>{filterUser}</li>
          ))}
        </ul>
      );
    }
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
          onChange={onChangeFilterUser}
          ref={inputMemberRef}
        />
      </div>

      <button className="add-member" type="submit">
        add 
      </button>

      <button className="cancel-add-member" onClick={onClickCloseAddMember}>
        cancel
      </button>
      {usersListFilter}
    </form>
  );
};

export default AddMember;
