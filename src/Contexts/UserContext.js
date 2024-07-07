import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext({
  user: null,
  login: async (email, password) => {},
  logout: () => {},
  token: null,
  setToken: (token) => {}
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('access_token'));

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('access_token');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (email, password) => {
    const response = await fetch('http://localhost:8001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data.session.access_token)
    if (response.ok) {
      setUser(data.user);
      setToken(data.session.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('access_token', data.session.access_token);

      //console.log(JSON.stringify(data.access_token))
    } else {
      throw new Error(data.message || 'Login failed');
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8001/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setUser(null);
        localStorage.removeItem('user'); // Clear user data from local storage
        localStorage.removeItem('access_token');
        console.log('Logged out successfully');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
