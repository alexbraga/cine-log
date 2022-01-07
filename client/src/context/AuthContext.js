import React, { createContext } from "react";
import usePersistedState from "../hooks/usePersistedState";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  // eslint-disable-next-line
  const [isLoaded, setIsLoaded] = usePersistedState(true, "loaded");
  const [user, setUser] = usePersistedState(null, "username");
  const [isAuthenticated, setIsAuthenticated] = usePersistedState(
    false,
    "auth"
  );

  return (
    <div className="content">
      {!isLoaded ? (
        <h3>Loading...</h3>
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
}

export default AuthProvider;
