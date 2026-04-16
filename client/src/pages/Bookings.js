import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { bookingService } from '../services/api';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await bookingService.getMyBookings();
      setBookings(res.data);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      await bookingService.cancel(bookingId);
      toast.success('Booking cancelled successfully');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">My Bookings</h1>
        <p className="text-xl text-gray-600">Manage your train bookings</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-6">📋</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No bookings yet</h3>
          <p className="text-gray-600 mb-8">Book your first train ticket now!</p>
          <a
            href="/trains"
            className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold transition duration-200"
          >
            Find Trains
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  booking.status === 'confirmed' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {booking.status.toUpperCase()}
                </div>
                
                {booking.status === 'confirmed' && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="px-6 py-2 bg-red-100 text-red-800 rounded-xl hover:bg-red-200 font-semibold transition duration-200"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl font-bold text-indigo-600">
                      {booking.trainId.trainNumber}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{booking.passengerName}</h3>
                    <p className="text-gray-600">{booking.passengerPhone}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 p-6 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-600">From</p>
                    <p className="font-semibold text-gray-900">{booking.trainId.from}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">To</p>
                    <p className="font-semibold text-gray-900">{booking.trainId.to}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(booking.trainId.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Seats</p>
                    <p className="font-semibold text-gray-900">{booking.seats}</p>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">₹{booking.totalFare}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;