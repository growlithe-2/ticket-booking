import { useEffect, useState } from 'react';
import API from './api';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const load = async () => {
    const { data } = await API.get('/bookings/my');
    setBookings(data);
  };

  useEffect(() => { load(); }, []);

  const cancel = async (id) => {
    await API.put(`/bookings/cancel/${id}`);
    load();
  };

  return (
    <div>
      <h2>My Bookings</h2>

      {bookings.map(b => (
        <div key={b._id}>
          <p>{b.trainId?.trainNumber}</p>
          <p>{b.status}</p>

          {b.status === 'confirmed' &&
            <button onClick={() => cancel(b._id)}>Cancel</button>}
        </div>
      ))}
    </div>
  );
}