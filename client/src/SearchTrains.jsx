import { useState } from 'react';
import API from './api';

export default function SearchTrains() {
  const [form, setForm] = useState({ from:'', to:'', date:'' });
  const [trains, setTrains] = useState([]);
  const [bForm, setBForm] = useState({
    seats:1, passengerName:'', passengerPhone:''
  });

  const search = async () => {
    const { data } = await API.get('/trains/search', { params: form });
    setTrains(data);
  };

  const book = async (trainId) => {
    await API.post('/bookings', {
      trainId,
      ...bForm
    });
    alert('Booked!');
  };

  return (
    <div>
      <h2>Search Trains</h2>

      <input placeholder="From"
        onChange={e => setForm({...form, from:e.target.value})} />
      <input placeholder="To"
        onChange={e => setForm({...form, to:e.target.value})} />
      <input type="date"
        onChange={e => setForm({...form, date:e.target.value})} />

      <button onClick={search}>Search</button>

      {trains.map(t => (
        <div key={t._id}>
          <p>{t.trainNumber} | {t.from} → {t.to}</p>

          <input placeholder="Name"
            onChange={e => setBForm({...bForm, passengerName:e.target.value})} />
          <input placeholder="Phone"
            onChange={e => setBForm({...bForm, passengerPhone:e.target.value})} />

          <button onClick={() => book(t._id)}>Book</button>
        </div>
      ))}
    </div>
  );
}