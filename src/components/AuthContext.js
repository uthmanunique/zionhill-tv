import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios'; // Added axios

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/auth/user', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          setUser(res.data); // Set real user data
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem('token'); // Clear invalid token
          setIsAuthenticated(false);
          setUser(null);
        });
    }
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);