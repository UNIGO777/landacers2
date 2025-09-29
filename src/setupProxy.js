const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    'https://api.landacre.in/api',
    createProxyMiddleware({
      target: 'https://api.landacre.in',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug',
      onProxyReq: function(proxyReq, req, res) {
        console.log('Proxying request:', req.method, req.url, '-> https://api.landacre.in' + req.url);
      },
      onError: function(err, req, res) {
        console.error('Proxy error:', err);
      }
    })
  );
};