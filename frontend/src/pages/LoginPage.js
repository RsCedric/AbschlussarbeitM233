import React, { useState, useContext } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/users/login', { username, password });
      login({ 
        username: response.data.username, 
        email: response.data.email,
        id: response.data.id 
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#18181b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#23232a', borderRadius: 14, boxShadow: '0 2px 12px #00000022', padding: 40, width: 370, maxWidth: '90vw', border: '2px solid #ff00cc' }}>
        <h2 style={{ color: '#ff00cc', textAlign: 'center', marginBottom: 32, letterSpacing: 1, fontWeight: 700 }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 22 }}>
            <label style={{ color: '#fff', fontWeight: 500 }}>Username:</label><br />
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 8,
                border: '2px solid #ff00cc',
                background: '#18181b',
                color: '#fff',
                fontSize: 16,
                outline: 'none',
                marginTop: 6,
                marginBottom: 2,
                transition: 'border 0.2s',
              }}
              onFocus={e => e.target.style.border = '2.5px solid #ff00cc'}
              onBlur={e => e.target.style.border = '2px solid #ff00cc'}
            />
          </div>
          <div style={{ marginBottom: 22 }}>
            <label style={{ color: '#fff', fontWeight: 500 }}>Passwort:</label><br />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 8,
                border: '2px solid #ff00cc',
                background: '#18181b',
                color: '#fff',
                fontSize: 16,
                outline: 'none',
                marginTop: 6,
                marginBottom: 2,
                transition: 'border 0.2s',
              }}
              onFocus={e => e.target.style.border = '2.5px solid #ff00cc'}
              onBlur={e => e.target.style.border = '2px solid #ff00cc'}
            />
          </div>
          {error && <div style={{ color: '#ff3366', marginBottom: 18, textAlign: 'center', fontWeight: 500 }}>{error}</div>}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px 0',
              background: '#ff00cc',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 1,
              boxShadow: 'none',
              cursor: 'pointer',
              marginTop: 10,
              transition: 'background 0.2s',
            }}
            onMouseOver={e => e.target.style.background = '#b2008f'}
            onMouseOut={e => e.target.style.background = '#ff00cc'}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 