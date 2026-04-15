import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import TrainCard from '../components/TrainCard';
import { trainService } from '../services/api';

const Trains = () => {
  const [trains, setTrains] = useState([]);
  const [search, setSearch] = useState({ from: '', to: '', date: '' });
  const [loading, setLoading] = useState(false);
  const [allTrains, setAllTrains] = useState([]);

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async (searchParams = {}) => {
    setLoading(true);
    try {
      const res = searchParams.from || searchParams.to || searchParams.date
        ? await trainService.search(searchParams)
        : await trainService.getAll();
      
      setTrains(res.data);
      if (!searchParams.from && !searchParams.to && !searchParams.date) {
        setAllTrains(res.data);
      }
    } catch (error) {
      toast.error('Failed to fetch trains');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTrains(search);
  };

  const resetSearch = () => {
    setSearch({ from: '', to: '', date: '' });
    setTrains(allTrains);
  };

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Train</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Search and book trains across India with real-time availability
        </p>
      </div>

      {/* Search Form */}
      <div className="max-w-4xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <input
                type="text"
                placeholder="e.g. Mumbai"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={search.from}
                onChange={(e) => setSearch({ ...search, from: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <input
                type="text"
                placeholder="e.g. Delhi"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={search.to}
                onChange={(e) => setSearch({ ...search, to: e.target.value })}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={search.date}
                  onChange={(e) => setSearch({ ...search, date: e.target.value })}
                />
              </div>
              
              <div className="flex items-end space-x-3 pt-8 sm:pt-0">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold transition duration-200 disabled:opacity-50"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
                
                <button
                  type="button"
                  onClick={resetSearch}
                  className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-semibold transition duration-200"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Trains Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : trains.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <div className="text-6xl mb-4">🚂</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No trains found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
            <button
              onClick={resetSearch}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition duration-200"
            >
              Show All Trains
            </button>
          </div>
        ) : (
          trains.map((train) => (
            <TrainCard key={train._id} train={train} />
          ))
        )}
      </div>
    </div>
  );
};

export default Trains;