var path = require('path');
var cooking = require('cooking');
var webpack = require('webpack');

cooking.set({
  entry: {
    app: ['babel-polyfill', './src/main.js']
  },
  dist: './dist',
  template: './index.tpl',

  devServer: {
    hostname: '192.168.1.155',
    port: 6001,
    publicPath: '/',
    proxy: {
      '/api/*': {
          target: 'http://api.chinaeid.cn',
          secure: false,
      }
      //  '/api': 'http://api.chinaeid.cn'
    },
  },

  // production
  clean: true,
  hash: true,
  sourceMap: false,
  minimize: true,
  chunk: true, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
  postcss: [
    require('autoprefixer')
  ],
  publicPath: './',
  assetsPath: 'static',
  urlLoaderLimit: 10000,
  extractCSS: '[name].[contenthash:7].css',
  alias: {
    'src': path.join(__dirname, 'src')
  },
  extends: ['vue2', 'less', 'autoprefixer']
});

// cooking.add('plugins.Provide', new webpack.ProvidePlugin({
//     $: 'jquery',
//     'window.jQuery': 'jquery'
// }));

cooking.add('loader.file', {
    test: /\.swf$/,
    loaders: ['file?name=[path][name].[ext]']
});

module.exports = cooking.resolve();
