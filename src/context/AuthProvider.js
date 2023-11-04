import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    name: "minh",
  });

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
