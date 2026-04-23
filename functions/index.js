const functions = require('firebase-functions');
const https = require('https');

// Proxy function for Swiggy API requests
exports.apiProxy = functions.https.onRequest((req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  const swiggyUrl = `https://www.swiggy.com/dapi${req.url}`;

  const options = {
    hostname: 'www.swiggy.com',
    path: req.url,
    method: req.method,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'application/json',
      'Referer': 'https://www.swiggy.com/',
      'Content-Type': 'application/json'
    }
  };

  const proxyReq = https.request(options, (proxyRes) => {
    res.status(proxyRes.statusCode);
    
    proxyRes.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'set-cookie') {
        res.set(key, value);
      }
    });

    proxyRes.pipe(res);
  });

  proxyReq.on('error', (error) => {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy error', message: error.message });
  });

  if (req.method !== 'GET') {
    req.pipe(proxyReq);
  } else {
    proxyReq.end();
  }
});
