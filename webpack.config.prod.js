const webpack = require('webpack')
const path = require('path')
// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MainfestPlugin = require('webpack-manifest-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
// Paths
const SRC    =  path.resolve(__dirname, 'src')
const PUBLIC =  path.resolve(__dirname, 'public')
const BUILD  =  path.resolve(__dirname, 'build')
const PUBLIC_PATH = '/'

module.exports = {
    context: SRC,
    entry: SRC + '/app.js',
    output: {
        path: BUILD,
        publicPath: PUBLIC_PATH,
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: SRC,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                include: SRC,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
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
        // Copy assets to BUILD env
        new CopyWebpackPlugin([
            {
                from: PUBLIC + '/assets',
                to: BUILD + '/assets',
            },
            {
                from: PUBLIC + '/manifest.json',
                to: BUILD,
            }
        ]),
        // Serve optimized Handlebars template
        new HtmlWebpackPlugin({
            template: PUBLIC + '/index.hbs',
            templateParameters: {
                dev : false,
                publicPath : PUBLIC_PATH,
            },
            filename: 'index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        // Production ready pre-caching service-worker
        new SWPrecacheWebpackPlugin({
            cacheId: 'related-painting',
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            minify: true,
            navigateFallback: PUBLIC_PATH + 'index.html',
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
            }),
        // Generate a manifest file which contains a mapping of all asset filenames
        // to their corresponding output file so that tools can pick it up without
        // having to parse `index.html`.
        new MainfestPlugin({
            fileName: 'asset-manifest.json',
            publicPath: PUBLIC_PATH
        })
    ]
}