module.exports = {
  publicPath: './',
  assetsDir: 'static',
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      '/admin': {
        //要访问的跨域的api的域名
        target: 'http://127.0.0.1:7001/admin',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/admin': '',
        },
      },
      '/public': {
        //要访问的跨域的api的域名
        target: 'http://127.0.0.1:7001/public',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/public': '',
        },
      },
    },
  },
};
