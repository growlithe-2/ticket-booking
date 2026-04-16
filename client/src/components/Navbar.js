import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">🚂 RailBook</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user.role === 'admin' && (
              <Link to="/admin" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
                Admin Panel
              </Link>
            )}
            <Link to="/trains" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
              Trains
            </Link>
            <Link to="/bookings" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
              My Bookings
            </Link>
            
            <div className="flex items-center space-x-2">
              <BellIcon className="h-6 w-6 text-gray-500" />
              <UserCircleIcon className="h-8 w-8 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
            </div>
            
            <button
              onClick={handleLogout}
              className="ml-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-red-100 hover:bg-red-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;