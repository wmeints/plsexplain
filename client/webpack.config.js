const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
      index: {
          import: path.resolve(__dirname, 'src/index.tsx'),
          dependOn: 'shared'
      },
      shared: 'react'
    },
    output: {
        filename: 'app.[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css']
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all'
        }
    },
    module: {
        rules: [
            {
                test: /tsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-react',
                        '@babel/preset-env',
                        '@babel/preset-typescript'
                    ],
                }
            },
            {
                test: /scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('node-sass')
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 3000,
        proxy: {
            '/api': 'http://localhost:8000'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            compress: true
        }),
        new MiniCssExtractPlugin({
            filename: 'app.[name].[chunkhash].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public/images', to: 'images' }
            ]
        })
    ]
}