import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const EditModal = ({ open, onClose, reservation, onSave }) => {
  const [form, setForm] = useState(reservation || {});

  useEffect(() => {
    setForm(reservation || {});
  }, [reservation]);

  if (!open) return null;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#000a', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <form onSubmit={handleSubmit} style={{ background: '#1e1e1e', padding: 32, borderRadius: 12, minWidth: 350, boxShadow: '0 0 24px #ff00cc55', color: '#fff' }}>
        <h3 style={{ color: '#ff00cc', marginBottom: 20 }}>Reservation bearbeiten</h3>
        <div style={{ marginBottom: 12 }}>
          <label>Raum:</label><br />
          <input name="room" value={form.room || ''} onChange={handleChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ff00cc', background: '#121212', color: '#fff' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Von (Datum):</label><br />
          <input name="dateFrom" type="date" value={form.dateFrom || ''} onChange={handleChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ff00cc', background: '#121212', color: '#fff' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Bis (Datum):</label><br />
          <input name="dateTo" type="date" value={form.dateTo || ''} onChange={handleChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ff00cc', background: '#121212', color: '#fff' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Zeit von:</label><br />
          <input name="fromTime" type="time" value={form.fromTime || ''} onChange={handleChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ff00cc', background: '#121212', color: '#fff' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Zeit bis:</label><br />
          <input name="toTime" type="time" value={form.toTime || ''} onChange={handleChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ff00cc', background: '#121212', color: '#fff' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Teilnehmer:</label><br />
          <input name="participants" type="number" value={form.participants || ''} onChange={handleChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ff00cc', background: '#121212', color: '#fff' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Name:</label><br />
          <input name="bookerName" value={form.bookerName || ''} onChange={handleChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ff00cc', background: '#121212', color: '#fff' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>E-Mail:</label><br />
          <input name="bookerEmail" value={form.bookerEmail || ''} onChange={handleChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ff00cc', background: '#121212', color: '#fff' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Bemerkung:</label><br />
          <input name="remark" value={form.remark || ''} onChange={handleChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ff00cc', background: '#121212', color: '#fff' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button type="button" onClick={onClose} style={{ background: '#121212', color: '#ff00cc', border: '1px solid #ff00cc', borderRadius: 6, padding: '8px 16px', cursor: 'pointer' }}>Abbrechen</button>
          <button type="submit" style={{ background: '#ff00cc', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', cursor: 'pointer' }}>Speichern</button>
        </div>
      </form>
    </div>
  );
};

const AdminDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [editReservation, setEditReservation] = useState(null);

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
      api.delete(`/reservations/${id}`)
        .then(() => setReservations(reservations.filter(r => r.id !== id)))
        .catch(() => setError('Fehler beim Löschen'));
    }
  };

  const handleEdit = (id) => {
    const res = reservations.find(r => r.id === id);
    setEditReservation(res);
    setEditOpen(true);
  };

  const handleSaveEdit = (updated) => {
    api.patch(`/reservations/${updated.id}`, updated)
      .then(res => {
        setReservations(reservations.map(r => r.id === updated.id ? res.data : r));
        setEditOpen(false);
        setEditReservation(null);
      })
      .catch(() => setError('Fehler beim Speichern'));
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
      <EditModal open={editOpen} onClose={() => setEditOpen(false)} reservation={editReservation} onSave={handleSaveEdit} />
    </div>
  );
};

export default AdminDashboard; 