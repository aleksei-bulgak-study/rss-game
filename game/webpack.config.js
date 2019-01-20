const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.[hash].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.jpg$|\.png$/,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new CopyWebpackPlugin([
      {
        from: './src/components/monster/images',
        to: '../dist/images/monster',
      },
      {
        from: './src/components/person/images',
        to: '../dist/images/person',
      },
      {
        from: './src/components/fireball/images',
        to: '../dist/images/fireball',
      },
      {
        from: './src/components/magic/images',
        to: '../dist/images/magic',
      },
      {
        from: './src/components/fireball/audio',
        to: '../dist/audio',
      },
      {
        from: './src/components/magic/audio',
        to: '../dist/audio',
      },
    ]),
    new HtmlWebpackPlugin({
      title: 'Facepalm game',
      filename: 'index.html',
      cache: true,
      meta: {
        viewport: 'width=device-width, initial-scale=1',
        'Content-Security-Policy': { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        'Cache-control': { 'http-equiv': 'Cache-control', content: 'public' },
      },
    }),
  ],

  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
