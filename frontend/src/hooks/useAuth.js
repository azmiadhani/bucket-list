import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

// @desc    returning AuthContext
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
