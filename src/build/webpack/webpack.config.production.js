const webpackConfig = require('./webpack.config.global.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
        template: `${__dirname}/../../index.html`,
        inject: 'body',
        hash: true,
    })
);

module.exports = Object.assign(webpackConfig, {
    mode: 'production',
    devtool: 'source-map',
});
