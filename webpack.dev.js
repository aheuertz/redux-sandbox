var path = require('path');
var webpack = require('webpack');
const merge = require('webpack-merge');
const common = require ('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        hot: true,
        open: true,
        port: 8085
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});