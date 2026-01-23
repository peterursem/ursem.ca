const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  entry: {
    cover: './src/cover.js',
    images: './src/images/images.js',
    work: './src/index/work.js'
  },
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    filename: '[name].js',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    //Images Page
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, "/public/images/index.html"),
      template: './src/images/images.html',
      chunks: ['cover', 'images']
    }), 
    new HtmlWebpackPlugin( {
      filename: path.join(__dirname, "/public/index.html"),
      template: './src/index/index.html',
      chunks: ['cover', 'work']
    }),
  ]
}