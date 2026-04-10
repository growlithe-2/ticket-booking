import { useState } from 'react';
import API from './api';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email:'', password:'' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async () => {
    const { data } = await API.post('/auth/login', form);
    login(data.token);
    navigate('/search');
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email"
        onChange={e => setForm({...form, email:e.target.value})} />
      <input type="password" placeholder="Password"
        onChange={e => setForm({...form, password:e.target.value})} />
      <button onClick={submit}>Login</button>
    </div>
  );
}