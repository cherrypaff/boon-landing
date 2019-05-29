const merge = require('webpack-merge');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonConfig = require('./common.config');

module.exports = merge(commonConfig, {
    output: {
        path: path.join(path.dirname(__dirname), 'build'),
        filename: 'js/bundle.[hash].js'
    },
    plugins: [
        new ExtractTextPlugin({filename: 'css/style.[hash].css', allChunks: true}),
        // На данный момент минификация и проч. происходит при помощи параметра "-p" в команде npm run build
        // При желании, сюда можно добавить production-only настройки
    ]
});