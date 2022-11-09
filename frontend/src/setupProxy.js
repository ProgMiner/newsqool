const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://52.215.151.195',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
            },
        })
    );
};
