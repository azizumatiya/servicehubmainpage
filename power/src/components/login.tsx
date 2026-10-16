import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

interface User {
  fullName: string;
  email: string;
  password: string;
  role: 'admin' | 'technician' | 'customer';
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '', show: false });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      redirectToDashboard(user.role);
    }
    
    // Check for remembered user
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      const user = JSON.parse(rememberedUser);
      setEmail(user.email);
      setRemember(true);
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get users from localStorage
    const usersData = localStorage.getItem('users');
    if (!usersData) {
      setNotification({ message: 'No users found. Please register first.', type: 'error', show: true });
      return;
    }
    
    const users: User[] = JSON.parse(usersData);
    
    // Find user with matching email and password
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Save current user to localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // If remember me is checked, save user session
      if (remember) {
        localStorage.setItem('rememberedUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('rememberedUser');
      }
      
      // Show success message
      setNotification({ message: 'Login successful! Redirecting...', type: 'success', show: true });
      
      // Redirect to appropriate dashboard after delay
      setTimeout(() => {
        redirectToDashboard(user.role);
      }, 1500);
    } else {
      setNotification({ message: 'Invalid email or password!', type: 'error', show: true });
    }
  };

  const hideNotification = () => {
    setNotification({ ...notification, show: false });
  };

  const redirectToDashboard = (role: string) => {
    switch(role) {
      case 'admin':
        navigate('/admin-dashboard');
        break;
      case 'technician':
        navigate('/technician-dashboard');
        break;
      case 'customer':
        navigate('/customer-dashboard');
        break;
      default:
        navigate('/customer-dashboard');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row min-h-[600px]">
        {/* Form Section */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h1>
          <p className="text-gray-600 mb-8">Enter your credentials to access your account</p>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1"
            >
              Login
            </button>
          </form>
          
          <div className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 font-medium hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
        
        {/* Info Section */}
        <div className="flex-1 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
            <p className="mb-4">Sign in to access your personalized dashboard based on your role.</p>
            <div className="space-y-4">
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Admin Dashboard</h3>
                <p className="text-sm opacity-80">Manage users, view analytics, and configure system settings.</p>
              </div>
              
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Technician Dashboard</h3>
                <p className="text-sm opacity-80">View assigned tasks, manage tickets, and update job status.</p>
              </div>
              
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Customer Dashboard</h3>
                <p className="text-sm opacity-80">Create support tickets, track progress, and communicate with technicians.</p>
              </div>
            </div>
            <p className="mt-8 text-sm opacity-80">
              Secure and fast access to all your tools and information.
            </p>
          </div>
        </div>
      </div>
      
      {/* Notification */}
      {notification.show && (
        <div 
          className={`fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg text-white font-medium z-50 animate-fadeIn ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          <div className="flex items-center">
            <span>{notification.message}</span>
            <button 
              onClick={hideNotification}
              className="ml-4 text-white hover:text-gray-200 focus:outline-none"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;