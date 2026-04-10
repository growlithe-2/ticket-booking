import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token')
  });

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth({ token });
  };

  const logout = () => {
    localStorage.clear();
    setAuth({ token: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);