import { useAppSelector, useAppDispatch } from './redux';
import { logout } from '../store/slices/authSlice';
import { useLogoutMutation } from '../store/api/authApi';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth
  );
  const [logoutMutation] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      dispatch(logout());
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    logout: handleLogout,
  };
};
