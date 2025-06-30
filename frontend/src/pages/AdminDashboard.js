import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const AdminDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/reservations/all')
      .then(res => {
        setReservations(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Fehler beim Laden der Reservationen');
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Wirklich löschen?')) {
      // Optional: setLoading(true);
      api.delete(`/reservations/${id}`)
        .then(() => setReservations(reservations.filter(r => r.id !== id)))
        .catch(() => setError('Fehler beim Löschen'));
    }
  };

  const handleEdit = (id) => {
    alert('Bearbeiten-Funktion kommt noch!');
  };

  const filteredReservations = reservations.filter(r =>
    (r.bookerName || '').toLowerCase().includes(filter.toLowerCase()) ||
    (r.bookerEmail || '').toLowerCase().includes(filter.toLowerCase()) ||
    (r.room || '').toString().includes(filter) ||
    (r.remark || '').toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: 20, background: '#1e1e1e', borderRadius: 16, boxShadow: '0 0 16px #ff00cc33' }}>
      <h2 style={{ color: '#ff00cc', marginBottom: 24 }}>Admin: Alle Reservationen</h2>
      <input
        type="text"
        placeholder="Filtern nach Name, Raum, E-Mail, Bemerkung..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={{ marginBottom: 20, padding: 10, width: 350, borderRadius: 8, border: '1px solid #ff00cc', background: '#121212', color: '#fff' }}
      />
      {loading ? (
        <div style={{ color: '#fff', textAlign: 'center', padding: 40 }}>Lade Reservationen...</div>
      ) : error ? (
        <div style={{ color: 'red', textAlign: 'center', padding: 40 }}>{error}</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#121212', color: '#fff' }}>
            <thead>
              <tr style={{ background: '#ff00cc22' }}>
                <th style={{ border: '1px solid #ff00cc', padding: 10 }}>ID</th>
                <th style={{ border: '1px solid #ff00cc', padding: 10 }}>Raum</th>
                <th style={{ border: '1px solid #ff00cc', padding: 10 }}>Von</th>
                <th style={{ border: '1px solid #ff00cc', padding: 10 }}>Bis</th>
                <th style={{ border: '1px solid #ff00cc', padding: 10 }}>Zeit (von-bis)</th>
                <th style={{ border: '1px solid #ff00cc', padding: 10 }}>Teilnehmer</th>
                <th style={{ border: '1px solid #ff00cc', padding: 10 }}>Name</th>
                <th style={{ border: '1px solid #ff00cc', padding: 10 }}>E-Mail</th>
                <th style={{ border: '1px solid #ff00cc', padding: 10 }}>Bemerkung</th>
                <th style={{ border: '1px solid #ff00cc', padding: 10 }}>Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.length === 0 ? (
                <tr><td colSpan={10} style={{ textAlign: 'center', padding: 20, color: '#fff' }}>Keine Reservationen gefunden.</td></tr>
              ) : (
                filteredReservations.map(r => (
                  <tr key={r.id} style={{ borderBottom: '1px solid #ff00cc' }}>
                    <td style={{ border: '1px solid #ff00cc', padding: 8 }}>{r.id}</td>
                    <td style={{ border: '1px solid #ff00cc', padding: 8 }}>{r.room}</td>
                    <td style={{ border: '1px solid #ff00cc', padding: 8 }}>{r.dateFrom}</td>
                    <td style={{ border: '1px solid #ff00cc', padding: 8 }}>{r.dateTo}</td>
                    <td style={{ border: '1px solid #ff00cc', padding: 8 }}>{r.fromTime} - {r.toTime}</td>
                    <td style={{ border: '1px solid #ff00cc', padding: 8 }}>{r.participants}</td>
                    <td style={{ border: '1px solid #ff00cc', padding: 8 }}>{r.bookerName}</td>
                    <td style={{ border: '1px solid #ff00cc', padding: 8 }}>{r.bookerEmail}</td>
                    <td style={{ border: '1px solid #ff00cc', padding: 8 }}>{r.remark}</td>
                    <td style={{ border: '1px solid #ff00cc', padding: 8 }}>
                      <button onClick={() => handleEdit(r.id)} style={{ marginRight: 8, background: '#ff00cc', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', cursor: 'pointer' }}>Bearbeiten</button>
                      <button onClick={() => handleDelete(r.id)} style={{ background: '#121212', color: '#ff00cc', border: '1px solid #ff00cc', borderRadius: 6, padding: '6px 12px', cursor: 'pointer' }}>Löschen</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 