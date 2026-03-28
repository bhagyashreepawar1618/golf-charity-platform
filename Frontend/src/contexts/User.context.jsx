import { useContext, useState, createContext } from "react";
import axios from "axios";
//create context here
const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const value = {
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

//create hook
export const useUser = () => {
  return useContext(UserContext);
};
