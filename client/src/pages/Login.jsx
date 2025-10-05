import { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { toast } from 'react-hot-toast'; 
import { login, reset } from '../features/auth/authSlice';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  
  // Initialize hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get the authentication state from our global Redux store
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  
  // This hook runs when the component loads or when state values change
  useEffect(() => {
    // If there's an error from the API, show a toast notification
    if (isError) {
      toast.error(message);
    }
    
    // If login is successful (or if user is already logged in), redirect to the homepage
    if (isSuccess || user) {
      toast.success('Login successful!');
      navigate('/');
    }
    
    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Instead of console.log, we dispatch the login action with the user data
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return (
    // Main container to center the form
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {/* Form - This part remains unchanged */}
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold text-gray-700 mb-2">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              className="input input-bordered w-full"
              placeholder="you@example.com"
              value={email}
              onChange={onChange}
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              className="input input-bordered w-full"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Link to Register */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;