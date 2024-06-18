// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://backend-server-url', // Replace with your backend server URL
      changeOrigin: true,
    })
  );
};
