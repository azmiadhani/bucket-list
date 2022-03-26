import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useState, useEffect, useContext } from 'react';
import TokenService from '../../services/Token';

const Preload = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const { auth, setAuth } = useAuth();

  // on Logout / setAuth({}) then execute
  useEffect(() => {
    console.log('Preload useEffect [auth]');
    console.log(auth);
    // on mount, assign localstorage token to auth context
    if (initialLoad == true) {
      setInitialLoad(false);
      console.log('Preload initialLoad==true');
      const accessToken = TokenService.getAccessToken();
      const refreshToken = TokenService.getRefreshToken();
      var tempAuth = {};
      if (accessToken) {
        tempAuth.accessToken = accessToken;
      }
      if (refreshToken) {
        tempAuth.refreshToken = refreshToken;
      }
      if (Object.keys(tempAuth).length == 0) {
        // logout
      }
      setAuth(tempAuth);
    } else {
      console.log('Preload initialLoad==false');
      // if setAuth as empty object, then logout
      if (Object.keys(auth).length == 0) {
        console.log('auth == {} && delete token');
        TokenService.deleteToken();
      } // if auth exist then store token to local storage
      else if (Object.keys(auth).length > 0) {
        console.log('auth == exists && store token');
        TokenService.storeToken(auth.accessToken, auth.refreshToken);
      }
    }
  }, [auth]);

  const assignToken = () => {};

  return (
    initialLoad == false && (
      <>
        <Outlet />
      </>
    )
  );
};

export default Preload;
