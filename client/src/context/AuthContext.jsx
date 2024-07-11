import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      setIsUserLoggedIn(true);
    }
  }, []);

  const login = (token, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
    setIsUserLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setIsUserLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
