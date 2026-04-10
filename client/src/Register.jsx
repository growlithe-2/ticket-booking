import { useState } from 'react';
import API from './api';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    name:'', email:'', password:'', phone:''
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async () => {
    const { data } = await API.post('/auth/register', form);
    login(data.token);
    navigate('/search');
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name"
        onChange={e => setForm({...form, name:e.target.value})} />
      <input placeholder="Email"
        onChange={e => setForm({...form, email:e.target.value})} />
      <input placeholder="Phone"
        onChange={e => setForm({...form, phone:e.target.value})} />
      <input type="password" placeholder="Password"
        onChange={e => setForm({...form, password:e.target.value})} />
      <button onClick={submit}>Register</button>
    </div>
  );
}