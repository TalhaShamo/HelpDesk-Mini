import { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { toast } from 'react-hot-toast'; 
import { register, reset } from '../features/auth/authSlice';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  // Initialize hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the authentication state from our global Redux store
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  
  // This hook runs when the component loads or when state values change
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // If registration is successful (or if user is already logged in), redirect to the homepage
    if (isSuccess || user) {
      toast.success('Registration successful!');
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
    if (password !== password2) {
      // Use toast for error messages instead of console.log
      toast.error('Passwords do not match');
    } else {
      // Instead of console.log, we dispatch the register action with the user data
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  return (
    // Main container to center the form
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
        </div>

        {/* Form - This part remains unchanged */}
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          {/* Name Field */}
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="input input-bordered w-full"
              placeholder="John Doe"
              value={name}
              onChange={onChange}
            />
          </div>

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
              required
              className="input input-bordered w-full"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col">
            <label
              htmlFor="password2"
              className="font-semibold text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              id="password2"
              type="password"
              required
              className="input input-bordered w-full"
              placeholder="Confirm Password"
              value={password2}
              onChange={onChange}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
        </form>

        {/* Link to Login */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;