import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PowerIcon, UserPlusIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  // Initialize hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the user from the global Redux state
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    dispatch(reset());  // Reset the state
    navigate('/login'); // Redirect to the login page
  };

  return (
    <header className="navbar bg-blue-50 text-blue-800 shadow-md rounded-box mb-8 p-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          HelpDesk Mini
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {user ? ( // If a user IS logged in, show Logout
            <li>
              <button onClick={onLogout} className="btn btn-ghost text-lg">
                <PowerIcon className="h-5 w-5 mr-1" /> Logout
              </button>
            </li>
          ) : ( // If NO user is logged in, show Login/Register
            <>
              <li>
                <Link to="/login" className="btn btn-ghost text-lg">
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" /> Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn btn-ghost text-lg">
                  <UserPlusIcon className="h-5 w-5 mr-1" /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
