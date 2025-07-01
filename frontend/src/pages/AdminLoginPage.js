import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/admin/login', { username, password });
      login({ username }, true);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Falscher Admin-Login!');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #121212 60%, #1976d2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#1e1e1e', borderRadius: 18, boxShadow: '0 0 32px #ff00cc55', padding: 40, width: 370, maxWidth: '90vw', border: '1.5px solid #ff00cc' }}>
        <h2 style={{ color: '#1976d2', textAlign: 'center', marginBottom: 32, letterSpacing: 1 }}>Admin Login</h2>
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
                border: '1.5px solid #1976d2',
                background: '#121212',
                color: '#fff',
                fontSize: 16,
                outline: 'none',
                marginTop: 6,
                marginBottom: 2,
                transition: 'border 0.2s',
              }}
              onFocus={e => e.target.style.border = '2px solid #1976d2'}
              onBlur={e => e.target.style.border = '1.5px solid #1976d2'}
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
                border: '1.5px solid #1976d2',
                background: '#121212',
                color: '#fff',
                fontSize: 16,
                outline: 'none',
                marginTop: 6,
                marginBottom: 2,
                transition: 'border 0.2s',
              }}
              onFocus={e => e.target.style.border = '2px solid #1976d2'}
              onBlur={e => e.target.style.border = '1.5px solid #1976d2'}
            />
          </div>
          {error && <div style={{ color: '#ff3366', marginBottom: 18, textAlign: 'center', fontWeight: 500 }}>{error}</div>}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px 0',
              background: 'linear-gradient(90deg, #1976d2 60%, #115293 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 1,
              boxShadow: '0 2px 12px #ff00cc44',
              cursor: 'pointer',
              marginTop: 10,
              transition: 'background 0.2s',
            }}
            onMouseOver={e => e.target.style.background = 'linear-gradient(90deg, #115293 60%, #1976d2 100%)'}
            onMouseOut={e => e.target.style.background = 'linear-gradient(90deg, #1976d2 60%, #115293 100%)'}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage; 