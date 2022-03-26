import useAuth from './useAuth';
import TokenServices from '../services/Token';

const useLogout = () => {
  const { auth, setAuth } = useAuth();

  const logout = () => {
    setAuth({});
    TokenServices.deleteRefreshToken();
    // note : if there's any server side logout logic, it should be here
  };

  return logout;
};

export default useLogout;
