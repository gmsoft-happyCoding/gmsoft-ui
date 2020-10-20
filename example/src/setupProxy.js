const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/stddata',
    proxy({
      hostRewrite: 'https://www.cqzcjtest.com',
      target: 'https://www.cqzcjtest.com',
      changeOrigin: true,
      secure: false,
    })
  );
};
