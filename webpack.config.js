const path = require('path');
const webpack = require('webpack');

// const CircularDependencyPlugin = require('circular-dependency-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devServer: {
        port: 3000,
    },
    devtool: 'source-map',
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        './app/main.js',
    ],
    module: {
        rules: [
            // {
            //     test: /\.jsx?$/,
            //     enforce: 'pre',
            //     exclude: /node_modules/,
            //     use: 'flowtype-loader',
            // },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader',
            },
            {
                test: /\.json$/,
                use: 'json-loader',
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!less-loader',
                }),
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader',
                }),
            },
            {
                test: /\.(gif|png|woff|woff2|eot|ttf|svg)$/,
                use: 'url-loader?limit=4096',
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                    {
                        loader: 'markdown-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true,
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.WatchIgnorePlugin([
            path.resolve('./node_modules'),
            path.resolve('./target'),
        ]),
        new ExtractTextPlugin({
            disable: true,
        }),
    ],
    output: {
        path: path.resolve(__dirname, './target'),
        filename: 'bundle.js',
    },
    resolve: {
        modules: [
            path.resolve('./app'),
            path.resolve('./node_modules'),
        ],
    },
};
