const webpack = require('webpack')
const path = require('path')
// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
// Paths
const SRC    =  path.resolve(__dirname, 'src')
const PUBLIC =  path.resolve(__dirname, 'public')
const BUILD   =  path.resolve(__dirname, 'build')
// Dev Server Default Port
const PORT = process.env.PORT || 5000

module.exports = {
    devtool: 'inline-source-map',
    context: SRC,
    entry: SRC + '/index.js',
    output: {
        path: BUILD,
        publicPath: '/',
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: SRC,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                include: SRC,
                use: [ 'css-hot-loader' ].concat(
                    ExtractTextPlugin.extract({
                        // Resolve sass into css
                        use: [
                            { loader: 'css-loader', options: { importLoaders: 1 } },
                            { loader: 'postcss-loader' },
                            { loader: 'sass-loader' }
                        ],
                        fallback: 'style-loader'
                    })
                )
            },
            {
                test: /\.gql$/,
                include: SRC + '/graphql',
                // Parse GraphQL queries into standard GraphQL AST(document objects)
                // https://github.com/apollographql/graphql-tag/blob/master/README.md
                loader: 'graphql-tag/loader'
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: "file-loader",
                options: {
                  name: "assets/fonts/[name].[ext]",
                },
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                loader: require.resolve('url-loader'),
                options: {
                  limit: 10000,
                  name: 'assets/media/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                include: PUBLIC
            }
        ]
    },
    plugins: [
        // Bundle all css into a single css bundle
        new ExtractTextPlugin('app.css'),
        // Copy static assets to build dir
        new CopyWebpackPlugin([
            {
                from: PUBLIC + '/assets',
                to: BUILD + '/assets',
            },
            {
                from: PUBLIC + '/service-worker.dev.js',
                to: BUILD + '/service-worker.js',
            },
            {
                from: PUBLIC + '/manifest.json',
                to: BUILD,
            }
        ]),
        // Serve Handlebars template as HTML
        new HtmlWebpackPlugin({
            template: PUBLIC + '/index.hbs',
            templateParameters: {
                dev : true
            },
            filename: 'index.html'
        }),
        // Required for React to detect proper environment
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        // No more redundant `import React from "react"` ;)
        new webpack.ProvidePlugin({
            'React' : 'react'
        }),
        // Enable hot reload support
        new webpack.HotModuleReplacementPlugin(),
        // Prevent rendering when errors are present ... otherwise will be very annoying :(
        new webpack.NoEmitOnErrorsPlugin(),
        // Display module relative paths helpful for debugging
        new webpack.NamedModulesPlugin(),
        // Optimized CLI display for debugging webpack
        new DashboardPlugin()
    ],
    devServer: {
        contentBase: BUILD,
        compress: true,
        historyApiFallback: true,
        publicPath: '/',
        host: '0.0.0.0',
        port: PORT,
        hot: true,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:5001'
            }
        }
    }
}
