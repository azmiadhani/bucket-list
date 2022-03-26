import axios from '../api/axios';
import useAuth from './useAuth';
import TokenService from '../services/Token';
const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    // request new accessToken using refreshToken
    const response = await axios.post('/api/auth/refresh-token', {
      refreshToken: TokenService.getRefreshToken(),
    });
    // prev function is the value of the previous state before it was set
    setAuth((prev) => {
      console.log('Previous Auth', JSON.stringify(prev));
      console.log('New Auth', response.data.accessToken);
      // returning the previous state with overwritten accessToken
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
