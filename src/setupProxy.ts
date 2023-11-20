import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app: any) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: '13.209.92.222:80',
            changeOrigin: true,
            ws: true
        })
    );
};
