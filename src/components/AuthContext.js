// AuthContext.js
import React, { createContext, useContext } from 'react';
import { userStore } from '../userStore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user data when the app loads
  React.useEffect(() => {
    userStore.initialize();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: userStore.isAuthenticated,
        login: userStore.login,
        logout: userStore.logout,
        updateUser: userStore.updateUser,
        getUser: userStore.getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);