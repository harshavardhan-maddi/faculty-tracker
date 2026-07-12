async function run() {
  const loginUrl = 'http://localhost:5000/api/auth/login';
  console.log('Attempting login with TE_HOD...');
  
  let token = '';
  try {
    const res = await fetch(loginUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'TE_HOD', password: 'HOD_TE' })
    });
    
    const text = await res.text();
    console.log(`Login response status: ${res.status}`);
    console.log(`Login response body: ${text.substring(0, 200)}`);
    
    if (res.ok) {
      const data = JSON.parse(text);
      token = data.token;
    } else {
      console.log('Login failed!');
      return;
    }
  } catch (err) {
    console.error('Failed to connect/login to backend:', err);
    return;
  }
  
  const endpoints = [
    '/api/classrooms',
    '/api/reports/dashboard-stats',
    '/api/reports/activity-feed',
    '/api/settings/tracking'
  ];
  
  for (const ep of endpoints) {
    console.log(`\n-----------------------------------`);
    console.log(`Testing endpoint: ${ep}`);
    try {
      const res = await fetch(`http://localhost:5000${ep}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const text = await res.text();
      console.log(`Status: ${res.status}`);
      console.log(`Content-Type: ${res.headers.get('content-type')}`);
      console.log(`Preview: ${text.substring(0, 300)}`);
    } catch (err) {
      console.error(`Failed to fetch ${ep}:`, err);
    }
  }
}

run();
