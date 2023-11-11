import { createContext, useContext, useEffect, useState } from "react";
import { getUserInfo } from "../ultils/helpFunc";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    setUserInfo(getUserInfo());
  }, []);

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
