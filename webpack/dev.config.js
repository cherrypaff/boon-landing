const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const commonConfig = require('./common.config');

module.exports = merge(commonConfig, {
    devtool: 'source-map',
    devServer: {
        hot: true,
        progress: true,
        contentBase: path.join(path.dirname(__dirname), 'build'),
        inline: true,
        host: '0.0.0.0',
        port: 8080
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});
