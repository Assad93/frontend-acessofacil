import React, { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  setToken: () => {},
  userId: null,
  setUserId: () => {},
  countFacialError: null,
  setCountFacialError: () => {},
});

function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [countFacialError, setCountFacialError] = useState(0);
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userId,
        setUserId,
        countFacialError,
        setCountFacialError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
