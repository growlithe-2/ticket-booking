import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <div className="mx-auto w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
          <span className="text-4xl">🚂</span>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
          Welcome Back, {user.name}!
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Ready to plan your next journey? Find trains, book tickets, and manage your trips easily.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link to="/trains" className="group">
          <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Find Trains</h3>
            <p className="text-gray-600 text-center mb-6">Search available trains and book your tickets instantly</p>
            <div className="flex items-center justify-center text-indigo-600 font-semibold hover:text-indigo-700">
              Book Now → 
            </div>
          </div>
        </Link>

        <Link to="/bookings" className="group">
          <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">My Bookings</h3>
            <p className="text-gray-600 text-center mb-6">View, manage, and cancel your existing bookings</p>
            <div className="flex items-center justify-center text-emerald-600 font-semibold hover:text-emerald-700">
              View Bookings → 
            </div>
          </div>
        </Link>

        <div className="group">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-white">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">👤</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center">Account</h3>
            <p className="text-white/90 text-center mb-6">
              Role: <span className="font-semibold">{user.role.toUpperCase()}</span>
            </p>
            <p className="text-white/90 text-center mb-6">Email: {user.email}</p>
            {user.phone && (
              <p className="text-white/90 text-center">Phone: {user.phone}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;