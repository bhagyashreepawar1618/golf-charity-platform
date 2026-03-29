import { useContext, useState, createContext } from "react";
//create context here
const AdminContext = createContext();
export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  //to store all users list
  const [users, setUsers] = useState([]);
  const value = {
    admin,
    setAdmin,
    users,
    setUsers,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

//create hook
export const useAdmin = () => {
  return useContext(AdminContext);
};
