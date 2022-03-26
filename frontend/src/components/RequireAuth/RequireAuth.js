import { useLocation, Navigate, Outlet } from 'react-router-dom';
import TokenService from '../../services/Token';
import useAuth from '../../hooks/useAuth';
// @desc    chekc if user is authenticated
const RequireAuth = () => {
  console.log('RequireAuth');
  const { auth } = useAuth();
  const location = useLocation();
  return (
    // Outlet represent child component of RequireAuth
    // if user is authenticated, then render Outlet
    // if user is not authenticated, then redirect to login page, with state location to make app know where user came from
    auth?.refreshToken ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    )
  );
};

export default RequireAuth;
