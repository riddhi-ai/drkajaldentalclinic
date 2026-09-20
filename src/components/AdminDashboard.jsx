import React, { useState, useEffect } from 'react';
import { 
  Lock, KeyRound, LogOut, CheckCircle, Clock, XCircle, CheckSquare, 
  Phone, Mail, MessageSquare, Search, RefreshCw, AlertCircle, ArrowLeft,
  Calendar, User
} from 'lucide-react';
import { clinicConfig } from '../config/clinicConfig';

export default function AdminDashboard({ onBackToSite }) {
  const [token, setToken] = useState(() => localStorage.getItem('kajal_dental_admin_token') || '');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Appointments state
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionSuccessMessage, setActionSuccessMessage] = useState('');
  const [actionErrorMessage, setActionErrorMessage] = useState('');

  // Fetch appointments if authenticated
  const fetchAppointments = async () => {
    if (!token) return;
    setIsLoading(true);
    setActionErrorMessage('');

    try {
      let url = `/api/admin/appointments?status=${statusFilter}`;
      if (searchQuery.trim()) {
        url += `&search=${encodeURIComponent(searchQuery.trim())}`;
      }

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 401) {
        // Session invalid
        handleLogout();
        return;
      }

      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments);
        if (data.stats) {
          setStats(data.stats);
        }
      } else {
        setActionErrorMessage(data.message || 'Failed to fetch appointments');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setActionErrorMessage('Network error connecting to clinic server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAppointments();
    }
  }, [token, statusFilter]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('kajal_dental_admin_token', data.token);
        setToken(data.token);
        setPassword('');
      } else {
        setLoginError(data.message || 'Invalid password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginError('Could not connect to authentication server');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    if (token) {
      fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => {});
    }
    localStorage.removeItem('kajal_dental_admin_token');
    setToken('');
    setAppointments([]);
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    setActionSuccessMessage('');
    setActionErrorMessage('');

    try {
      const res = await fetch(`/api/admin/appointments/${appointmentId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setActionSuccessMessage(`Updated appointment to ${newStatus}`);
        // Refresh list
        fetchAppointments();
        setTimeout(() => setActionSuccessMessage(''), 4000);
      } else {
        setActionErrorMessage(data.message || 'Failed to update status');
      }
    } catch (err) {
      console.error('Update status error:', err);
      setActionErrorMessage('Error communicating with server');
    }
  };

  // Helper styling for status badges
  const getStatusBadge = (st) => {
    switch (st) {
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3" /> PENDING
          </span>
        );
      case 'CONFIRMED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
            <CheckCircle className="w-3 h-3" /> CONFIRMED
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <CheckSquare className="w-3 h-3" /> COMPLETED
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
            <XCircle className="w-3 h-3" /> CANCELLED
          </span>
        );
      default:
        return <span className="text-xs">{st}</span>;
    }
  };

  // IF NOT AUTHENTICATED -> SHOW LOGIN SCREEN
  if (!token) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-soft border border-slate-200">
          
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-3 border border-teal-100 shadow-2xs">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Doctor & Staff Portal
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Dr. Kajal's Dental Clinic • Kothrud, Pune
            </p>
          </div>

          {loginError && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter clinic admin password"
                  className="w-full pl-4 pr-10 py-3 rounded-xl text-sm border border-slate-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all"
                  required
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">
                Default password configured in .env: <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">admin</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-soft transition-all"
            >
              {isLoggingIn ? 'Verifying...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <button
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-teal-700 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Clinic Website</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // IF AUTHENTICATED -> SHOW FULL ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-16">
      
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToSite}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                <span>🦷 Dr. Kajal's Dental Clinic</span>
                <span className="text-xs bg-teal-100 text-teal-800 font-semibold px-2 py-0.5 rounded">
                  Admin Desk
                </span>
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                Manage appointment requests & patient follow-ups
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAppointments}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-teal-700 hover:bg-teal-50 transition-colors"
              title="Refresh Appointments"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Status Notification Alerts */}
        {actionSuccessMessage && (
          <div className="mb-6 p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-sm flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-teal-600" />
            <span>{actionSuccessMessage}</span>
          </div>
        )}

        {actionErrorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600" />
            <span>{actionErrorMessage}</span>
          </div>
        )}

        {/* Metrics Counter Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          
          <div 
            onClick={() => setStatusFilter('ALL')}
            className={`p-4 rounded-2xl cursor-pointer border transition-all ${
              statusFilter === 'ALL' ? 'bg-white border-teal-500 shadow-soft' : 'bg-white/80 border-slate-200 hover:bg-white'
            }`}
          >
            <span className="text-xs font-bold text-slate-500 uppercase">Total Requests</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{stats.total}</div>
          </div>

          <div 
            onClick={() => setStatusFilter('PENDING')}
            className={`p-4 rounded-2xl cursor-pointer border transition-all ${
              statusFilter === 'PENDING' ? 'bg-amber-50/70 border-amber-400 shadow-soft' : 'bg-white/80 border-slate-200 hover:bg-white'
            }`}
          >
            <span className="text-xs font-bold text-amber-700 uppercase">Pending Review</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-900 mt-1">{stats.pending}</div>
          </div>

          <div 
            onClick={() => setStatusFilter('CONFIRMED')}
            className={`p-4 rounded-2xl cursor-pointer border transition-all ${
              statusFilter === 'CONFIRMED' ? 'bg-teal-50/70 border-teal-500 shadow-soft' : 'bg-white/80 border-slate-200 hover:bg-white'
            }`}
          >
            <span className="text-xs font-bold text-teal-700 uppercase">Confirmed</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-900 mt-1">{stats.confirmed}</div>
          </div>

          <div 
            onClick={() => setStatusFilter('COMPLETED')}
            className={`p-4 rounded-2xl cursor-pointer border transition-all ${
              statusFilter === 'COMPLETED' ? 'bg-blue-50/70 border-blue-400 shadow-soft' : 'bg-white/80 border-slate-200 hover:bg-white'
            }`}
          >
            <span className="text-xs font-bold text-blue-700 uppercase">Completed</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 mt-1">{stats.completed}</div>
          </div>

        </div>

        {/* Search & Filters Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by patient, phone, service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchAppointments()}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  statusFilter === st
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

        </div>

        {/* Appointments List */}
        {isLoading ? (
          <div className="bg-white rounded-2xl p-12 text-center text-slate-500 shadow-2xs border border-slate-200">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-teal-600 mb-3" />
            <p className="text-sm">Loading appointment requests...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-slate-500 shadow-2xs border border-slate-200">
            <p className="text-base font-semibold text-slate-700">No appointment requests found</p>
            <p className="text-xs text-slate-400 mt-1">Try changing the status filter or search terms.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((apt) => (
              <div 
                key={apt.appointment_id}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-2xs border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  
                  {/* Patient Info */}
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-slate-900">
                        {apt.patient_name}
                      </h3>
                      {getStatusBadge(apt.status)}
                      <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                        {apt.appointment_id}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                      <span>Age: {apt.age ? apt.age : 'Not given'}</span>
                      <span>•</span>
                      <span>Requested: {new Date(apt.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</span>
                    </div>
                  </div>

                  {/* Quick Direct Patient Contact Actions */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${apt.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold transition-colors"
                      title="Call Patient"
                    >
                      <Phone className="w-3.5 h-3.5 text-teal-600" />
                      <span>{apt.phone}</span>
                    </a>

                    <a
                      href={`https://wa.me/${apt.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(apt.patient_name)},%20I%20am%20contacting%20you%20from%20Dr.%20Kajal%27s%20Dental%20Clinic%20regarding%20your%20appointment%20request%20for%20${encodeURIComponent(apt.service)}...`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors"
                      title="WhatsApp Patient"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`mailto:${apt.email}`}
                      className="inline-flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition-colors"
                      title="Email Patient"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>

                {/* Appointment Schedule & Message Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs sm:text-sm">
                  
                  <div>
                    <span className="text-slate-400 font-medium block text-xs">Treatment Service:</span>
                    <strong className="text-teal-900 font-semibold">{apt.service}</strong>
                  </div>

                  <div>
                    <span className="text-slate-400 font-medium block text-xs">Preferred Date & Slot:</span>
                    <span className="font-semibold text-slate-800">{apt.preferred_date}</span>
                    <span className="text-slate-500 block text-xs">{apt.preferred_time}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-medium block text-xs">Patient Notes / Message:</span>
                    <p className="text-slate-600 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                      {apt.message || 'No additional note provided.'}
                    </p>
                  </div>

                </div>

                {/* Status Transition Control Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-slate-400">
                    Change Status:
                  </span>

                  <div className="flex flex-wrap items-center gap-2">
                    {apt.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(apt.appointment_id, 'CONFIRMED')}
                          className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-2xs transition-all flex items-center gap-1"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Confirm Appointment</span>
                        </button>

                        <button
                          onClick={() => handleStatusChange(apt.appointment_id, 'CANCELLED')}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 font-semibold text-xs transition-all"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {apt.status === 'CONFIRMED' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(apt.appointment_id, 'COMPLETED')}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition-all flex items-center gap-1"
                        >
                          <CheckSquare className="w-3.5 h-3.5" />
                          <span>Mark as Completed</span>
                        </button>

                        <button
                          onClick={() => handleStatusChange(apt.appointment_id, 'CANCELLED')}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 font-semibold text-xs transition-all"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {(apt.status === 'COMPLETED' || apt.status === 'CANCELLED') && (
                      <button
                        onClick={() => handleStatusChange(apt.appointment_id, 'PENDING')}
                        className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium"
                      >
                        Reopen as Pending
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </main>

    </div>
  );
}
