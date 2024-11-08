import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext); // This hook will access the context value
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user information (e.g., role)
  const [loading, setLoading] = useState(true); // Manage loading state while checking user data

  useEffect(() => {
    // Check if user data exists in localStorage (or fetch from API)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // If user exists, set it to state
    }
    setLoading(false); // Once user data is loaded, set loading to false
  }, []);

  const login = (userData) => {
    setUser(userData); // Store user data in state
    localStorage.setItem('user', JSON.stringify(userData)); // Persist user data in localStorage
  };

  const logout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children} {/* This allows nested components to access the context */}
    </UserContext.Provider>
  );
};
