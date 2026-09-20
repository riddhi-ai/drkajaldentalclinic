import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOG_FILE = path.join(__dirname, '..', 'data', 'outbox_emails.log');

/**
 * Creates SMTP transporter if configured in environment
 */
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });
  }
  return null;
}

/**
 * Logs email to persistent file for local review and testing
 */
function logEmailLocally(to, subject, textContent, htmlContent) {
  const entry = `
================================================================================
DATE: ${new Date().toISOString()}
TO: ${to}
SUBJECT: ${subject}
--------------------------------------------------------------------------------
${textContent}
================================================================================
\n`;
  try {
    fs.appendFileSync(LOG_FILE, entry, 'utf-8');
  } catch (err) {
    console.error('Failed to log email to outbox:', err);
  }
}

/**
 * Sends notification email to the Clinic Owner / Doctor
 */
export async function sendDoctorNotificationEmail(appointment) {
  const ownerEmail = process.env.OWNER_EMAIL || 'doctor@example.com';
  const subject = "New Appointment Request – Dr. Kajal's Dental Clinic";

  const textBody = `
NEW APPOINTMENT REQUEST

Patient Details:
Name: ${appointment.patient_name}
Phone: ${appointment.phone}
Email: ${appointment.email}
Age: ${appointment.age ? appointment.age : 'Not specified'}

Appointment Details:
Service: ${appointment.service}
Preferred Date: ${appointment.preferred_date}
Preferred Time: ${appointment.preferred_time}

Patient Message:
${appointment.message || 'No additional message provided'}

Submitted At:
${new Date(appointment.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)

--------------------------------------------------
Please contact the patient to confirm the appointment.
--------------------------------------------------
Appointment Reference ID: ${appointment.appointment_id}
`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background: #f8fafc; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #0d9488 0%, #0369a1 100%); color: #ffffff; padding: 24px; text-align: center; }
    .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
    .header p { margin: 0; font-size: 14px; opacity: 0.9; }
    .badge { display: inline-block; background: #fef08a; color: #854d0e; font-weight: 600; font-size: 12px; padding: 4px 10px; border-radius: 20px; margin-top: 8px; text-transform: uppercase; }
    .content { padding: 24px; }
    .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #0f766e; border-bottom: 2px solid #ccfbf1; padding-bottom: 4px; margin-top: 16px; margin-bottom: 12px; }
    .detail-grid { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    .detail-grid td { padding: 8px 4px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .label { color: #64748b; font-weight: 600; width: 38%; }
    .value { color: #0f172a; font-weight: 500; }
    .highlight-card { background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 8px; padding: 14px; margin: 16px 0; }
    .action-notice { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: 4px; color: #92400e; font-weight: 600; font-size: 14px; margin-top: 20px; }
    .btn { display: inline-block; background: #0d9488; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: 600; font-size: 13px; margin-right: 8px; margin-top: 8px; }
    .btn-wa { background: #16a34a; }
    .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Dr. Kajal's Dental Clinic</h1>
      <p>Ashish Garden, DP Rd, Kothrud, Pune</p>
      <span class="badge">New Appointment Request</span>
    </div>
    <div class="content">
      <div class="section-title">Patient Details</div>
      <table class="detail-grid">
        <tr><td class="label">Patient Name:</td><td class="value"><strong>${appointment.patient_name}</strong></td></tr>
        <tr><td class="label">Phone Number:</td><td class="value"><a href="tel:${appointment.phone}" style="color:#0d9488; text-decoration:none; font-weight:700;">${appointment.phone}</a></td></tr>
        <tr><td class="label">Email Address:</td><td class="value">${appointment.email}</td></tr>
        <tr><td class="label">Age:</td><td class="value">${appointment.age ? appointment.age : 'Not specified'}</td></tr>
      </table>

      <div class="section-title">Requested Appointment Details</div>
      <div class="highlight-card">
        <table class="detail-grid" style="margin-bottom:0;">
          <tr><td class="label">Treatment Service:</td><td class="value" style="color:#0f766e; font-weight:700;">${appointment.service}</td></tr>
          <tr><td class="label">Preferred Date:</td><td class="value">${appointment.preferred_date}</td></tr>
          <tr><td class="label">Preferred Time Slot:</td><td class="value">${appointment.preferred_time}</td></tr>
        </table>
      </div>

      <div class="section-title">Patient Note / Reason for Visit</div>
      <p style="font-size: 14px; color: #334155; background: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
        ${appointment.message || 'No additional message provided.'}
      </p>

      <div class="action-notice">
        ⚠️ Action Required: Please contact the patient to confirm the appointment.
      </div>

      <div style="margin-top: 18px; text-align: center;">
        <a href="tel:${appointment.phone}" class="btn">📞 Call Patient</a>
        <a href="https://wa.me/${appointment.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(appointment.patient_name)},%20regarding%20your%20appointment%20request%20at%20Dr.%20Kajal%27s%20Dental%20Clinic..." class="btn btn-wa" target="_blank">💬 WhatsApp Patient</a>
      </div>
    </div>
    <div class="footer">
      Appointment Request ID: ${appointment.appointment_id} • Submitted at ${new Date(appointment.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)
    </div>
  </div>
</body>
</html>
`;

  // Always log locally for verifiable record
  logEmailLocally(ownerEmail, subject, textBody, htmlBody);
  console.log(`[EMAIL DISPATCH] Doctor notification prepared for ${ownerEmail} (Ref: ${appointment.appointment_id})`);

  const transporter = createTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Dr. Kajal's Dental Clinic" <${process.env.SMTP_USER || ownerEmail}>`,
        to: ownerEmail,
        replyTo: appointment.email,
        subject,
        text: textBody,
        html: htmlBody
      });
      console.log(`[EMAIL SUCCESS] Live email sent to doctor at ${ownerEmail}`);
      return { sent: true, mode: 'smtp' };
    } catch (err) {
      console.error('[EMAIL ERROR] Failed to deliver live doctor email:', err.message);
      return { sent: false, mode: 'smtp_failed', error: err.message };
    }
  }

  return { sent: true, mode: 'logged_locally', recipient: ownerEmail };
}

/**
 * Sends confirmation email to the Patient clearly specifying it is an REQUEST awaiting confirmation
 */
export async function sendPatientConfirmationEmail(appointment) {
  if (!appointment.email) return;

  const subject = "Appointment Request Received – Dr. Kajal's Dental Clinic";

  const textBody = `Hello ${appointment.patient_name},

Thank you for contacting Dr. Kajal's Dental Clinic.

We have received your appointment request for:

Service: ${appointment.service}
Preferred Date: ${appointment.preferred_date}
Preferred Time: ${appointment.preferred_time}

The clinic will contact you to confirm your appointment.

Regards,
Dr. Kajal's Dental Clinic
Ashish Garden, DP Rd, Sagar Colony, Guruganesh Nagar, Kothrud, Pune, Maharashtra 411038
Phone: 088306 87816
`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background: #f8fafc; margin: 0; padding: 20px; }
    .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #0d9488; color: #ffffff; padding: 24px; text-align: center; }
    .header h1 { margin: 0 0 6px 0; font-size: 20px; }
    .content { padding: 24px; }
    .highlight-card { background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 8px; padding: 16px; margin: 16px 0; }
    .notice { background: #e0f2fe; border-left: 4px solid #0284c7; padding: 12px 16px; border-radius: 4px; color: #0369a1; font-weight: 500; font-size: 14px; margin: 20px 0; }
    .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Dr. Kajal's Dental Clinic</h1>
      <p style="margin:0; font-size:13px;">Kothrud, Pune • 088306 87816</p>
    </div>
    <div class="content">
      <p>Hello <strong>${appointment.patient_name}</strong>,</p>
      <p>Thank you for contacting <strong>Dr. Kajal's Dental Clinic</strong>.</p>
      
      <p>We have received your appointment request for:</p>
      <div class="highlight-card">
        <p style="margin: 4px 0;"><strong>Service:</strong> ${appointment.service}</p>
        <p style="margin: 4px 0;"><strong>Preferred Date:</strong> ${appointment.preferred_date}</p>
        <p style="margin: 4px 0;"><strong>Preferred Time:</strong> ${appointment.preferred_time}</p>
        <p style="margin: 4px 0; font-size: 12px; color: #64748b;"><strong>Request ID:</strong> ${appointment.appointment_id}</p>
      </div>

      <div class="notice">
        ℹ️ <strong>Please note:</strong> This is an initial appointment request. The clinic team will contact you directly on <strong>${appointment.phone}</strong> to confirm your appointment timing.
      </div>

      <p style="font-size: 14px; color: #475569;">
        If you have an urgent inquiry, feel free to call us directly at <a href="tel:+918830687816" style="color:#0d9488; font-weight:600; text-decoration:none;">088306 87816</a>.
      </p>

      <p style="margin-top: 24px; font-size: 14px;">
        Warm regards,<br />
        <strong>Dr. Kajal's Dental Clinic</strong><br />
        Ashish Garden, DP Rd, Sagar Colony, Guruganesh Nagar, Kothrud, Pune, Maharashtra 411038<br />
        📞 088306 87816
      </p>
    </div>
    <div class="footer">
      Dr. Kajal's Dental Clinic • Quality dental care in a comfortable and welcoming environment.
    </div>
  </div>
</body>
</html>
`;

  logEmailLocally(appointment.email, subject, textBody, htmlBody);
  console.log(`[EMAIL DISPATCH] Patient confirmation prepared for ${appointment.email}`);

  const transporter = createTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Dr. Kajal's Dental Clinic" <${process.env.SMTP_USER || 'appointments@drkajaldental.com'}>`,
        to: appointment.email,
        subject,
        text: textBody,
        html: htmlBody
      });
      console.log(`[EMAIL SUCCESS] Confirmation email delivered to ${appointment.email}`);
      return { sent: true, mode: 'smtp' };
    } catch (err) {
      console.error('[EMAIL ERROR] Failed to send patient email:', err.message);
      return { sent: false, mode: 'smtp_failed', error: err.message };
    }
  }

  return { sent: true, mode: 'logged_locally', recipient: appointment.email };
}
