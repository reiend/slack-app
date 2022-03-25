import React, { createContext, useContext } from "react";

const UserListContext = createContext(null);

const useUserListContext = () => useContext(UserListContext);

const UserListProvider = ({ children, ...props}) => {
  return (
    <UserListContext.Provider {...props}>
      {children}
    </UserListContext.Provider>
  );
};

export default UserListProvider;
export { useUserListContext }
