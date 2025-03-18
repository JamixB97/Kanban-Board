import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
      setError(null); 
    } catch (err) {
      console.error('Failed to login', err);
      setError('Invalid username or password');
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/kanban', {
          headers: {
            'Authorization': `Bearer ${Auth.getToken()}`
          }
        });
        if (response.status === 401) {
          Auth.logout();
          navigate('/login');
        }
      } catch (err) {
        console.error('Failed to check auth', err);
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p className='error'>{error}</p>}
        <label>Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        />
        <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />
        <button type='submit'>Submit Form</button>
      </form>
    </div>
  )
};

export default Login;
