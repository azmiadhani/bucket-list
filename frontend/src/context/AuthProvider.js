import { createContext, useState } from 'react';

// creating context
const AuthContext = createContext({});

// creating provider
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  // take from localstorage, if not exist thenfalse
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem('persist')) || false
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
