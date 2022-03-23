import { useLocation, Navigate, Outlet } from 'react-router-dom';
import TokenService from '../../services/Token';
// @desc    chekc if user is authenticated
const RequireAuth = () => {
  const auth = TokenService.getAccessToken();
  const location = useLocation();
  return (
    // Outlet represent child component of RequireAuth
    // if user is authenticated, then render Outlet
    // if user is not authenticated, then redirect to login page, with state location to make app know where user came from
    auth ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    )
  );
};

export default RequireAuth;
