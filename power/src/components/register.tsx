import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserShield, FaTools, FaUser } from 'react-icons/fa';

interface User {
  fullName: string;
  email: string;
  password: string;
  role: 'admin' | 'technician' | 'customer';
}

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'technician' | 'customer'>('customer');
  const [notification, setNotification] = useState({ message: '', type: '', show: false });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (password !== confirmPassword) {
      setNotification({ message: 'Passwords do not match!', type: 'error', show: true });
      return;
    }
    
    if (password.length < 6) {
      setNotification({ message: 'Password must be at least 6 characters!', type: 'error', show: true });
      return;
    }
    
    // Create user object
    const user: User = {
      fullName,
      email,
      password, // In a real app, this should be hashed
      role
    };
    
    // Get existing users or initialize empty array
    let users: User[] = [];
    const usersData = localStorage.getItem('users');
    if (usersData) {
      users = JSON.parse(usersData);
    }
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      setNotification({ message: 'User with this email already exists!', type: 'error', show: true });
      return;
    }
    
    // Add new user
    users.push(user);
    
    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Show success message
    setNotification({ message: 'Registration successful! Redirecting to login...', type: 'success', show: true });
    
    // Redirect to login page after delay
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const hideNotification = () => {
    setNotification({ ...notification, show: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row min-h-[600px]">
        {/* Form Section */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600 mb-8">Join our platform as an Admin, Technician, or Customer</p>
          
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="fullName">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="john@example.com"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-3">
                Select Role
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-all ${
                    role === 'admin' 
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <FaUserShield className="text-xl mb-2" />
                  <span>Admin</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setRole('technician')}
                  className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-all ${
                    role === 'technician' 
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <FaTools className="text-xl mb-2" />
                  <span>Technician</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setRole('customer')}
                  className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-all ${
                    role === 'customer' 
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <FaUser className="text-xl mb-2" />
                  <span>Customer</span>
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1"
            >
              Register
            </button>
          </form>
          
          <div className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 font-medium hover:underline">
              Sign In
            </Link>
          </div>
        </div>
        
        {/* Info Section */}
        <div className="flex-1 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Welcome to Our Platform</h2>
            <p className="mb-4">Join our community of professionals and customers.</p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                  <FaUserShield />
                </div>
                <div>
                  <h3 className="font-semibold">Admins</h3>
                  <p className="text-sm opacity-80">Manage the platform, users, and system settings.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                  <FaTools />
                </div>
                <div>
                  <h3 className="font-semibold">Technicians</h3>
                  <p className="text-sm opacity-80">Provide technical support and services to customers.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                  <FaUser />
                </div>
                <div>
                  <h3 className="font-semibold">Customers</h3>
                  <p className="text-sm opacity-80">Access services and get support from our technicians.</p>
                </div>
              </div>
            </div>
            <p className="mt-8 text-sm opacity-80">
              Create your account today and start exploring all the features we offer!
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

export default Register;