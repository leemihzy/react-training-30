const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const RefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  entry: './src/js/index.js', //js 진입점
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  devtool: 'source-map', //build 파일과 연동
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
    open: true,
    watchFiles: 'index.html',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'virtual keyboard',
      template: './index.html', //해당 파일이 lodash 문법을 사용하게 해줌
      inject: 'body',
      // favicon: './favicon.ico',
    }),
    // css inject
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new RefreshPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
};
