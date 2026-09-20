import express from 'express';
import { createAppointment } from '../db.js';
import { sendDoctorNotificationEmail, sendPatientConfirmationEmail } from '../emailService.js';

const router = express.Router();

/**
 * Validates Indian Phone Number
 * Accepts: 10 digits starting with 6-9, optionally prefixed with +91 or 0
 */
function isValidIndianPhone(phone) {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // +919876543210 or 09876543210 or 9876543210
  return /^(\+91|0)?[6-9]\d{9}$/.test(cleaned);
}

/**
 * Normalizes phone number to standard 10-digit or +91 display
 */
function normalizePhone(phone) {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  if (cleaned.startsWith('+91')) {
    return cleaned.slice(3);
  }
  if (cleaned.startsWith('0')) {
    return cleaned.slice(1);
  }
  return cleaned;
}

/**
 * Validates Email Format
 */
function isValidEmail(email) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * POST /api/appointments
 * Handles patient booking request submission
 */
router.post('/', async (req, res) => {
  try {
    const {
      patient_name,
      phone,
      email,
      age,
      service,
      preferred_date,
      preferred_time,
      message,
      website_hp // Honeypot field for bot protection
    } = req.body;

    // Honeypot spam trap: if bot filled this invisible field, return fake success
    if (website_hp) {
      console.warn('[SPAM SHIELD] Bot submission caught by honeypot.');
      return res.status(200).json({
        success: true,
        message: "Appointment request received!",
        details: "Thank you for choosing Dr. Kajal's Dental Clinic. Your appointment request has been received. The clinic will contact you to confirm your appointment."
      });
    }

    // Input Validations
    const errors = {};

    if (!patient_name || patient_name.trim().length < 2) {
      errors.patient_name = 'Please provide your full name (minimum 2 characters).';
    }

    if (!phone || !isValidIndianPhone(phone)) {
      errors.phone = 'Please provide a valid 10-digit Indian mobile number (e.g., 9876543210).';
    }

    if (!email || !isValidEmail(email)) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!service || service.trim().length < 2) {
      errors.service = 'Please select a dental service or consultation.';
    }

    if (!preferred_date) {
      errors.preferred_date = 'Please select your preferred appointment date.';
    } else {
      // Check that selected date is not in the past
      const selected = new Date(preferred_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isNaN(selected.getTime()) || selected < today) {
        errors.preferred_date = 'Appointment date cannot be in the past.';
      }
    }

    if (!preferred_time || preferred_time.trim().length < 2) {
      errors.preferred_time = 'Please select a preferred time slot.';
    }

    if (age !== undefined && age !== null && age !== '') {
      const numAge = Number(age);
      if (isNaN(numAge) || numAge < 1 || numAge > 120) {
        errors.age = 'Please enter a valid age between 1 and 120.';
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please correct the highlighted fields.',
        errors
      });
    }

    // Prepare data
    const appointmentData = {
      patient_name: patient_name.trim(),
      phone: `+91 ${normalizePhone(phone)}`,
      email: email.trim().toLowerCase(),
      age: age ? Number(age) : null,
      service: service.trim(),
      preferred_date: preferred_date.trim(),
      preferred_time: preferred_time.trim(),
      message: message ? message.trim().slice(0, 1000) : ''
    };

    // Save into database
    const savedAppointment = createAppointment(appointmentData);

    // Asynchronously trigger notifications (do not block client response if email provider takes a moment)
    Promise.all([
      sendDoctorNotificationEmail(savedAppointment),
      sendPatientConfirmationEmail(savedAppointment)
    ]).catch(err => {
      console.error('[NOTIFICATIONS ERROR]', err);
    });

    return res.status(201).json({
      success: true,
      message: "Appointment request received!",
      details: "Thank you for choosing Dr. Kajal's Dental Clinic. Your appointment request has been received. The clinic will contact you to confirm your appointment.",
      appointment: {
        appointment_id: savedAppointment.appointment_id,
        patient_name: savedAppointment.patient_name,
        service: savedAppointment.service,
        preferred_date: savedAppointment.preferred_date,
        preferred_time: savedAppointment.preferred_time,
        status: savedAppointment.status
      }
    });

  } catch (err) {
    console.error('Error handling appointment booking:', err);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again or call the clinic at 088306 87816.'
    });
  }
});

export default router;
