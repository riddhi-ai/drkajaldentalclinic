import express from 'express';
import crypto from 'crypto';
import { getAllAppointments, updateAppointmentStatus, getAppointmentById } from '../db.js';

const router = express.Router();

// Active admin sessions in memory
const activeSessions = new Set();

/**
 * Helper to generate simple random secure token
 */
function generateSessionToken() {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Authentication middleware for admin routes
 */
export function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];
  if (!activeSessions.has(token)) {
    return res.status(401).json({ success: false, message: 'Session expired or invalid. Please sign in again.' });
  }

  next();
}

/**
 * POST /api/admin/login
 * Verifies admin password
 */
router.post('/login', (req, res) => {
  const { password } = req.body;
  const expectedPassword = process.env.ADMIN_PASSWORD || 'admin';

  if (!password || password !== expectedPassword) {
    return res.status(401).json({
      success: false,
      message: 'Invalid clinic password. Please check your credentials.'
    });
  }

  const token = generateSessionToken();
  activeSessions.add(token);

  return res.json({
    success: true,
    message: 'Welcome Dr. Kajal',
    token
  });
});

/**
 * POST /api/admin/logout
 */
router.post('/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    activeSessions.delete(token);
  }
  return res.json({ success: true, message: 'Logged out successfully' });
});

/**
 * GET /api/admin/appointments
 * Lists all appointments with optional query filtering
 */
router.get('/appointments', requireAdminAuth, (req, res) => {
  try {
    const { status, search } = req.query;
    let list = getAllAppointments();

    if (status && status !== 'ALL') {
      list = list.filter(a => a.status === status);
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(a =>
        a.patient_name.toLowerCase().includes(q) ||
        a.phone.includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.service.toLowerCase().includes(q) ||
        a.appointment_id.toLowerCase().includes(q)
      );
    }

    const stats = {
      total: list.length,
      pending: list.filter(a => a.status === 'PENDING').length,
      confirmed: list.filter(a => a.status === 'CONFIRMED').length,
      completed: list.filter(a => a.status === 'COMPLETED').length,
      cancelled: list.filter(a => a.status === 'CANCELLED').length,
    };

    return res.json({
      success: true,
      stats,
      appointments: list
    });
  } catch (err) {
    console.error('Error fetching admin appointments:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve appointments' });
  }
});

/**
 * PATCH /api/admin/appointments/:id/status
 * Updates appointment status
 */
router.patch('/appointments/:id/status', requireAdminAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const allowed = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: `Status must be one of: ${allowed.join(', ')}` });
    }

    const updated = updateAppointmentStatus(id, status, notes);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    return res.json({
      success: true,
      message: `Appointment status updated to ${status}`,
      appointment: updated
    });
  } catch (err) {
    console.error('Error updating appointment status:', err);
    return res.status(500).json({ success: false, message: 'Failed to update appointment' });
  }
});

export default router;
