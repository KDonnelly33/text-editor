const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

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
    plugins: [
      // added html webpack plugin
      new HtmlWebpackPlugin({
        template: '.index.html',
        title: 'Text Editor',
      }),
      // added inject manifest to generate service worker
      new InjectManifest({
        swSrc: path.resolve(__dirname, 'src-sw.js'),
        swDest: 'service-worker.js',
      }),
      // added webpack pwa manifest to generate manifest.json
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Text Editor PWA App',
        short_name: 'Text-Editor',
        description: 'An applicantion that allows you to edit text files online or offline',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        start_url: '/',
        icons: [
          {
            src: path.resolve('assets/icon-512x512.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      
    ],

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
