import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'appointments.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure database file exists with valid initial array
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
}

/**
 * Reads all appointment records from the persistent store
 * @returns {Array<Object>}
 */
export function getAllAppointments() {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading appointments DB:', err);
    return [];
  }
}

/**
 * Writes all appointments atomically to avoid corruption
 * @param {Array<Object>} list 
 */
function saveAppointments(list) {
  const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempFile, JSON.stringify(list, null, 2), 'utf-8');
  fs.renameSync(tempFile, DB_FILE);
}

/**
 * Creates a new appointment request
 * Status defaults to 'PENDING'
 */
export function createAppointment(data) {
  const list = getAllAppointments();
  
  const newAppointment = {
    appointment_id: `APT-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
    patient_name: String(data.patient_name || '').trim(),
    phone: String(data.phone || '').trim(),
    email: String(data.email || '').trim().toLowerCase(),
    age: data.age ? Number(data.age) : null,
    service: String(data.service || 'General Consultation').trim(),
    preferred_date: String(data.preferred_date || '').trim(),
    preferred_time: String(data.preferred_time || '').trim(),
    message: String(data.message || '').trim(),
    status: 'PENDING', // PENDING | CONFIRMED | COMPLETED | CANCELLED
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  list.unshift(newAppointment);
  saveAppointments(list);
  return newAppointment;
}

/**
 * Updates appointment status (e.g. PENDING -> CONFIRMED / CANCELLED / COMPLETED)
 */
export function updateAppointmentStatus(appointment_id, newStatus, notes = '') {
  const allowed = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];
  if (!allowed.includes(newStatus)) {
    throw new Error(`Invalid status: ${newStatus}`);
  }

  const list = getAllAppointments();
  const index = list.findIndex(a => a.appointment_id === appointment_id);
  if (index === -1) {
    return null;
  }

  list[index].status = newStatus;
  list[index].admin_notes = notes || list[index].admin_notes || '';
  list[index].updated_at = new Date().toISOString();

  saveAppointments(list);
  return list[index];
}

/**
 * Finds appointment by ID
 */
export function getAppointmentById(appointment_id) {
  const list = getAllAppointments();
  return list.find(a => a.appointment_id === appointment_id) || null;
}
