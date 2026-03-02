const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_backendUrl,
      changeOrigin: true,
      secure: false,
      logLevel: 'debug',
      onProxyReq: function(proxyReq, req, res) {
        console.log('Proxying request:', req.method, req.url, '->', process.env.REACT_APP_backendUrl + req.url);
      },
      onError: function(err, req, res) {
        console.error('Proxy error:', err);
      }
    })
  );
};
