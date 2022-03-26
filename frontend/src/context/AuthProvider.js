import { createContext, useEffect, useState } from 'react';
import TokenService from '../services/Token';

// creating context
const AuthContext = createContext({});

// creating provider
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
