import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';

import Login from './Login';
import Register from './Register';
import SearchTrains from './SearchTrains';
import MyBookings from './MyBookings';

function ProtectedRoute({ children }) {
  const { auth } = useAuth();
  if (!auth.token) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/search" element={
            <ProtectedRoute><SearchTrains /></ProtectedRoute>
          } />

          <Route path="/my-bookings" element={
            <ProtectedRoute><MyBookings /></ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}