const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const webpackConfig = {
    entry: {
        bundle: ['babel-polyfill', `${__dirname}/../../index.tsx`],
    },
    output: {
        path: path.resolve(__dirname, './../../../dist'),
        filename: 'js/[name].js',
        publicPath: '/omsorgspenger/kalkulator-antall-omsorgsdager/dist/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.m?jsx?$/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(ts|tsx)$/,
                include: [path.resolve(__dirname, './../..')],
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            experimentalFileCaching: false,
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                math: 'always',
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CaseSensitivePathsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css?[fullhash]-[chunkhash]-[name]',
            linkType: 'text/css',
        }),
    ],
};

module.exports = webpackConfig;
