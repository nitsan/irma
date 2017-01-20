let path = require('path');
let fs = require('fs');

module.exports = {
    entry: './public/app/app.es6',
    debug: true,
    output: {
        publicPath: '/dist/',
        filename: 'bundle.js',
        path: './public/dist'
    },
    module: {
        loaders: [
            // {
            //     test: /\.js$/,
            //     enforce: "pre",
            //     exclude: /node_modules/,
            //     use: 'eslint-loader'
            // },
            {
                test: /\.es6$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.css$/,
                // exclude: /node_modules/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=10000'
            },
            {
                test: /\.(otf|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader'
            }
        ],
        postLoaders: [{
            test: /\.(js|es6)$/,
            // test: /\.es6$/,
            exclude: /node_modules/,
            loader: 'ng-annotate'
        }]
    },
    node: {
        fs: 'empty' //Stub node's fs for client libraries (specifically, angular-router requires that)
    },
    devtool: process.env.NODE_ENV === 'dev' ? 'cheap-eval-source-map': '',
    resolve: {
        root: [path.resolve('./public')],
        extensions: ['', '.js', '.es6', '.ts']
    }
};