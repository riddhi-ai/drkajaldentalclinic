// test_api.mjs - Automated API & Integration Verifier

async function runTests() {
  console.log('--- Starting Dr. Kajal Dental Clinic MVP Verification Tests ---');

  // 1. Health check
  const healthRes = await fetch('http://localhost:5000/api/health');
  const healthData = await healthRes.json();
  console.log('1. Health Check:', healthRes.status === 200 && healthData.status === 'ok' ? 'PASS ✅' : 'FAIL ❌', healthData);

  // 2. Validation test (Bad phone, past date)
  const invalidRes = await fetch('http://localhost:5000/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      patient_name: 'T',
      phone: '12345',
      email: 'notanemail',
      preferred_date: '2020-01-01',
      preferred_time: ''
    })
  });
  const invalidData = await invalidRes.json();
  console.log('2. Input Validation (Expected 400 Bad Request):', invalidRes.status === 400 ? 'PASS ✅' : 'FAIL ❌', invalidData.errors);

  // 3. Valid booking submission
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 3);
  const futureDateStr = futureDate.toISOString().split('T')[0];

  const validPayload = {
    patient_name: 'Pooja Deshmukh',
    phone: '9822012345',
    email: 'pooja.deshmukh@example.com',
    age: 29,
    service: 'Root Canal Treatment (RCT)',
    preferred_date: futureDateStr,
    preferred_time: '06:00 PM - 06:30 PM',
    message: 'Experiencing mild sensitivity on lower molar for past 3 days.'
  };

  const bookingRes = await fetch('http://localhost:5000/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validPayload)
  });
  const bookingData = await bookingRes.json();
  console.log('3. Valid Appointment Request (Expected 201 Created):', bookingRes.status === 201 ? 'PASS ✅' : 'FAIL ❌');
  console.log('   Message:', bookingData.message);
  console.log('   Details:', bookingData.details);
  console.log('   Appointment ID:', bookingData.appointment?.appointment_id);

  const createdId = bookingData.appointment?.appointment_id;

  // 4. Admin Login - Incorrect password
  const failLogin = await fetch('http://localhost:5000/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: 'wrongpassword' })
  });
  console.log('4. Admin Auth Rejection (Expected 401):', failLogin.status === 401 ? 'PASS ✅' : 'FAIL ❌');

  // 5. Admin Login - Correct password
  const successLogin = await fetch('http://localhost:5000/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: 'admin' })
  });
  const loginData = await successLogin.json();
  console.log('5. Admin Auth Success (Expected 200):', successLogin.status === 200 && !!loginData.token ? 'PASS ✅' : 'FAIL ❌');

  const adminToken = loginData.token;

  // 6. Fetch Admin Appointments
  const adminListRes = await fetch('http://localhost:5000/api/admin/appointments', {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  const adminListData = await adminListRes.json();
  const match = adminListData.appointments?.find(a => a.appointment_id === createdId);
  console.log('6. Retrieve Saved Appointment in Admin Portal:', match ? 'PASS ✅' : 'FAIL ❌');
  console.log('   Found Record:', match?.patient_name, '| Status:', match?.status);

  // 7. Update Status: PENDING -> CONFIRMED
  const updateRes = await fetch(`http://localhost:5000/api/admin/appointments/${createdId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`
    },
    body: JSON.stringify({ status: 'CONFIRMED' })
  });
  const updateData = await updateRes.json();
  console.log('7. Status Transition (PENDING -> CONFIRMED):', updateRes.status === 200 && updateData.appointment?.status === 'CONFIRMED' ? 'PASS ✅' : 'FAIL ❌');

  console.log('--- Verification Completed ---');
}

runTests().catch(console.error);
