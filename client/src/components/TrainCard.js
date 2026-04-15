import { useState } from 'react';
import { toast } from 'react-toastify';
import { bookingService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const TrainCard = ({ train }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleBook = async () => {
    setLoading(true);
    try {
      const bookingData = {
        trainId: train._id,
        seats: 1,
        passengerName: user.name,
        passengerPhone: user.phone || ''
      };
      
      await bookingService.create(bookingData);
      toast.success('Booking confirmed! 🎉');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900">{train.trainNumber}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          train.classType === 'AC' ? 'bg-green-100 text-green-800' :
          train.classType === 'Sleeper' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {train.classType}
        </span>
      </div>
      
      <div className="space-y-2 mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🚉</span>
          <div>
            <p className="font-semibold text-gray-900">{train.from}</p>
            <p className="text-sm text-gray-500">{train.departureTime}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center py-2">
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"></div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🚉</span>
          <div>
            <p className="font-semibold text-gray-900">{train.to}</p>
            <p className="text-sm text-gray-500">{train.arrivalTime}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-indigo-600">₹{train.fare}</p>
          <p className="text-gray-600">Per Seat</p>
        </div>
        <div className="text-center p-3 bg-emerald-50 rounded-lg">
          <p className="text-2xl font-bold text-emerald-600">{train.availableSeats}</p>
          <p className="text-gray-600">Seats Left</p>
        </div>
      </div>
      
      <button
        onClick={handleBook}
        disabled={train.availableSeats === 0 || loading}
        className={`w-full py-3 px-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
          train.availableSeats === 0
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
        }`}
      >
        {loading ? 'Booking...' : train.availableSeats === 0 ? 'No Seats' : 'Book Now'}
      </button>
      
      <p className="text-xs text-gray-500 mt-3 text-center">
        Date: {new Date(train.date).toLocaleDateString()}
      </p>
    </div>
  );
};

export default TrainCard;