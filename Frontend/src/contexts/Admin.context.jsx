import { useContext, useState, createContext } from "react";
//create context here
const AdminContext = createContext();
export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const value = {
    admin,
    setAdmin,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

//create hook
export const useAdmin = () => {
  return useContext(AdminContext);
};
