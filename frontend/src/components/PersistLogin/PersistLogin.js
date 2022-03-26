import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  // only run once when component load
  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // only refreshToken when accessToken not exist in auth state
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  // run everytime isLoading state changes
  useEffect(() => {
    console.log(`isLoading : ${isLoading}`);
    console.log(`aT : ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return <>{!persist ? <Outlet /> : isLoading ? <></> : <Outlet />}</>;
};

export default PersistLogin;
