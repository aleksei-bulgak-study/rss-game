const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
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
    new CopyWebpackPlugin([
      {
        from: './src/index.html',
        to: '../dist/index.html',
      },
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
  ],

  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};