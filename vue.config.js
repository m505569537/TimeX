module.exports = {
    devServer: {
        open: true,
       /*  host: 'localhost',
        port: 8081, */
        https: false,
        proxy: {
            // 请求的时候，就不用写前面的http://localhost:4000了，直接写/api/****就行了
            '/api/cities.xml': {
                target: 'http://192.168.42.191:8081',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/api': {
                target: 'http://192.168.42.191:4000',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}