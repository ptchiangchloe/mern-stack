const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devServer: {
        port: 8000,
        static: './dist',
        historyApiFallback: true,
        proxy: [
            {
              context: ['/api'],
              target: 'http://localhost:4000',
            }
        ]
    },
    // Track down errors and warnings to their original location.
    devtool: 'inline-source-map',
    entry: './src/jsx/App.jsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'app.bundle.js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: 'static/index.html'
          }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx$/, // use regex
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-class-properties'],
                    // all transforms and file types other than pure JavaScript require loaders
                    // in webpack. babel-loader 8^ should be match other babel modules 7^
                },
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Create `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    // The config below is for reducing duplicated modules being requested over and over again
    // during development and testing times.
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom|whatwg-fetch|react-router)[\\/]/,
                    filename: 'vendor.bundle.js',
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    },
    resolve: {
        extensions: ['.tsx', '.ts','.js', '.jsx'],
    },
};
