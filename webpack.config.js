const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'index.html',
      filename: 'index.html'
    })
  ],
  context: path.resolve(__dirname, './src'),
  entry: {
    main: './index.ts',
  },
  output: {
    filename: 'assets/[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { 
        enforce: 'pre',
        test: /\.js$/, 
        loader: "source-map-loader" 
      },
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { 
        test: /\.tsx?$/, 
        loader: "awesome-typescript-loader" 
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
  }
};