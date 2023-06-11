import { createContext, useState, useEffect } from "react";
import { fetchMe } from "../../../api/registerUser";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ id: null, username: "Guest" });
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function getMe() {
      try {
        const { user } = await fetchMe();
        setUser(user);
        setLoggedIn(true);
      } catch (error) {
        setUser({ username: "Guest" });
        setLoggedIn(false);
      }
    }
    getMe();
  }, [loggedIn]);

  console.log("user from auth provider: ", user);

  const contextValue = {
    user,
    setUser,
    loggedIn,
    setLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
