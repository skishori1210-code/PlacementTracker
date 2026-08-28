const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        ["/students", "/jobs", "/companies", "/applications", "/auth", "/admin"],
        createProxyMiddleware({
            target: "http://localhost:8080",
            changeOrigin: true
        })
    );
};