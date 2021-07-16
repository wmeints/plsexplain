const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCopyPlugin = require('copy-webpack-plugin');
const sass = require('node-sass');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  const config = {
    mode: isDevelopment ? 'development' : 'production',
    entry: [
      path.resolve(__dirname, 'src/index.tsx'),
      path.resolve(__dirname, 'src/index.scss'),
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.[contenthash].js',
      clean: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    devServer: {
      historyApiFallback: true,
      compress: true,
      port: 3000,
      proxy: {
        '/api': 'http://localhost:8000',
      },
    },
    devtool: isDevelopment ? 'eval-source-map' : false,
    module: {
      rules: [
        {
          test: /.js$/,
          use: 'ify-loader',
        },
        {
          test: /.scss$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: sass,
              },
            },
          ],
        },
        {
          test: /.tsx?$/,
          use: 'babel-loader',
        },
        {
          test: /.json$/,
          use: 'json-loader',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        publicPath: '/',
      }),
      new MiniCssExtractPlugin({
        filename: 'bundle.[contenthash].css',
      }),
      new WebpackCopyPlugin({
        patterns: [
          { from: 'public/images', to: 'images' },
          { from: 'public/webfonts', to: 'webfonts' },
          { from: 'public/scripts', to: 'scripts' }
        ],
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  };

  return config;
};
