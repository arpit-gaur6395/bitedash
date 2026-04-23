const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});

// Root route for health check
app.get('/', (req, res) => {
  res.json({
    status: 'running',
    message: 'Swiggy API Proxy Server is running',
    usage: 'Use /api/... to proxy requests to Swiggy'
  });
});

// Proxy requests to Swiggy API
app.use('/api', createProxyMiddleware({
  target: 'https://www.swiggy.com/dapi',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`🔗 Proxying to: ${proxyReq.path}`);
    // Add required headers for Swiggy API
    proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    proxyReq.setHeader('Accept', 'application/json');
    proxyReq.setHeader('Referer', 'https://www.swiggy.com/');
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log(`✅ Response status: ${proxyRes.statusCode}`);
  },
  onError: (err, req, res) => {
    console.error('❌ Proxy error:', err.message);
    res.status(500).json({ error: 'Proxy error', message: err.message });
  }
}));

app.listen(PORT, () => {
  console.log(`🚀 Swiggy API Proxy Server running on http://localhost:${PORT}`);
  console.log(`📡 Proxying requests to: https://www.swiggy.com/dapi`);
  console.log(`🔗 Your app should use: http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/`);
});
