const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // TODO: Add and configure workbox plugins for a service worker and manifest file.
    plugins: [
      // added html webpack plugin
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Text Editor',
      }),
      // added inject manifest to generate service worker
      new InjectManifest({
        swSrc: path.resolve(__dirname, 'src-sw.js'),
        swDest: 'service-worker.js',
      }),
      // added webpack pwa manifest to generate manifest.json
      new WebpackPwaManifest({
        name: 'Text Editor PWA App',
        short_name: 'Text-Editor',
        description: 'An applicantion that allows you to edit text files online or offline',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        start_url: '/',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      
    ],
    
    // TODO: Add CSS loaders and babel to webpack.
    module: {
      // added rules for css and babel
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {presets: ['@babel/preset-env'] ,},
          },
        },
      ],
    },
  };
};
