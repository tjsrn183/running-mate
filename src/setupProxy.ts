import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app: any) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://43.202.245.111:80',
            changeOrigin: true,
            ws: true
        })
    );
};
