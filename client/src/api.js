import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const trainService = {
  getAll: () => API.get('/trains'),
  search: (params) => API.get('/trains/search', { params }),
  add: (data) => API.post('/trains', data),
  delete: (id) => API.delete(`/trains/${id}`)
};

export const bookingService = {
  create: (data) => API.post('/bookings', data),
  getMyBookings: () => API.get('/bookings/my'),
  cancel: (id) => API.put(`/bookings/cancel/${id}`)
};