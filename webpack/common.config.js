const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: [
        'whatwg-fetch',
        'babel-polyfill',
        path.join(path.dirname(__dirname), 'src', 'scripts', 'index.js'),
    ],
    output: {
        path: path.join(path.dirname(__dirname), 'build'),
        filename: 'js/bundle.js'
    },
    resolve: {
        extensions: [ '.js', '.json', '.css', '.scss' ],
        modules: [
            'node_modules'
        ],
        alias: {
            '@': path.join(path.dirname(__dirname), 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: 'babel-loader',
                options: {
                    // This is a feature of `babel-loader` for webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true,
                    plugins: ['react-hot-loader/babel'],
                    presets: [
                        'stage-0',
                        'react',
                        [
                            'env',
                            {
                                "targets": {
                                "browsers": ["last 2 versions", "ie >= 10"]
                            },
                            }
                        ]
                    ]
                },
            },
            {
                test: /\.scss$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader', // translates CSS into CommonJS
                                options: {
                                    url: false,  // Не пытаться добавить в бандл static-файлы
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins:[
                                        autoprefixer({
                                            flexbox: "no-2009",
                                            browsers: ['> 1%', 'last 3 versions', 'Firefox >= 20', 'iOS >=7', 'IE >= 10']
                                        })
                                    ]
                                }
                            },
                            {
                                loader: 'sass-loader', // compiles Sass to CSS
                            },
                        ],
                        fallback: 'style-loader' // used when css not extracted
                    }
                ))
            },
        ]
    },
    plugins: [
        // prints more readable module names in the browser console on HMR updates
        new ExtractTextPlugin({filename: 'css/style.css', allChunks: true}),

        // Настройка API в зависимости от среды
        new Dotenv({
            path: path.join(path.dirname(__dirname), '.env'),
            // load '.env.example' to verify the '.env' variables are all set
            safe: path.join(path.dirname(__dirname), 'env.example'),
        }),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            React: 'react',
            PropTypes: 'prop-types',
        }),

        new HtmlWebpackPlugin(
            {
                filename: 'index.html',
                template: 'index.html'
            }
        ),

        // Заебался с этими файл-лоударами, просто копирую в билд все статик-файлы
        new CopyWebpackPlugin([
            {
                from: 'static/',
                to: 'static/'
            }
        ]),
    ],
};