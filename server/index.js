import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import appointmentsRouter from './routes/appointments.js';
import adminRouter from './routes/admin.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Parsing Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Global Rate Limiter for general endpoints
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' }
});

// Stricter Rate Limiter for appointment submissions to prevent spam
const appointmentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 15, // max 15 requests per hour per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many booking attempts from this network. Please contact the clinic directly at 088306 87816.'
  }
});

app.use(generalLimiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    clinic: "Dr. Kajal's Dental Clinic",
    timestamp: new Date().toISOString()
  });
});

// Mount API routes
app.use('/api/appointments', appointmentLimiter, appointmentsRouter);
app.use('/api/admin', adminRouter);

// Serve static assets in production or fallback
const clientDist = path.join(__dirname, '..', 'dist');
app.use(express.static(clientDist));

// Serve public directory for direct media if not bundled
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('*', (req, res, next) => {
  // If API route 404, return JSON
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ success: false, message: 'API route not found' });
  }
  // Otherwise serve index.html for client-side routing
  const indexPath = path.join(clientDist, 'index.html');
  if (express.static.mime.lookup(indexPath)) {
    return res.sendFile(indexPath);
  }
  next();
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[SERVER UNHANDLED ERROR]', err);
  res.status(500).json({
    success: false,
    message: 'An internal server error occurred.'
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🦷 Dr. Kajal's Dental Clinic API Server running!`);
  console.log(`📍 Port: http://localhost:${PORT}`);
  console.log(`🏥 Clinic: Ashish Garden, DP Rd, Kothrud, Pune`);
  console.log(`📞 Phone: 088306 87816`);
  console.log(`📧 Owner Email: ${process.env.OWNER_EMAIL || 'doctor@example.com'}`);
  console.log(`🔐 Admin Route: http://localhost:${PORT}/api/admin/appointments`);
  console.log(`====================================================`);
});
