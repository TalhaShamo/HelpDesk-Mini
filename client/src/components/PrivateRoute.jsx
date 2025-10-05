import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute() {
  // Get the logged-in user state from Redux
  const { user } = useSelector((state) => state.auth);

  // If the user is logged in, render the page they are trying to access.
  // The <Outlet /> component is a placeholder for the actual page component.
  if (user) {
    return <Outlet />;
  }

  // If the user is not logged in, redirect them to the /login page.
  return <Navigate to="/login" />;
}

export default PrivateRoute;