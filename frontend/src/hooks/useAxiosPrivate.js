import { axiosPrivate } from '../api/axios';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    console.log('[auth, refresh]');
    // request interceptors to set the accessToken if the request headers not exist yet
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        console.log('requestIntecept ', auth);
        // if Authorization header is not set, then that means that this is not a retry
        // request (prevRequest.sent)
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = 'Bearer ' + auth?.accessToken;
        }
        // return request configuration
        return config;
      },
      (error) => {
        // handle error
        // return the error
        return Promise.reject(error);
      }
    );

    // response interceptors to handle if the response status is 401 (unauthorized)
    const responseIntercept = axiosPrivate.interceptors.response.use(
      // if the reponse is good then we just gonna return the response
      (response) => response,
      // if the response is bad then we gonna check if the error is unauthorized
      async (error) => {
        console.log('Error responseIntercept ', auth);
        // get previous request from error?.config
        const prevRequest = error?.config;
        // if response status 401 and if prevRequest.sent is true then we gonna refresh
        // the token to prevent endless loop
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          // enabled to prevent endless request loop
          prevRequest.sent = true;
          // if the error is unauthorized then we gonna refresh the token
          const newAccessToken = await refresh();
          // set the new access token to the header
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          // return the request with modified header (new accessToken)
          return axiosPrivate(prevRequest);
        }
        // return the error
        return Promise.reject(error);
      }
    );

    // cleanup function
    return () => {
      console.log('eject');
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);
  // Still question about why need to use refresh as dependencies
  // }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
