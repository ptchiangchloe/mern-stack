const path = require('path');

module.exports = {
    devServer: {
        port: 8000,
        contentBase: 'static',
        proxy: {
            '/api/*': {
                target: 'http://localhost:3000',
            },
        },
        historyApiFallback: true,
    },
    devtool: 'source-map',
    entry: './src/App.tsx',
    output: {
        path: path.join(__dirname, '/static'),
        filename: 'app.bundle.js',
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.jsx$/, // use regex
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-react', '@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-class-properties'],
                    // all transforms and file types other than pure JavaScript require loaders
                    // in webpack. babel-loader 8^ should be match other babel modules 7^
                },
            },
            {
                test: /\.tsx?$/,
                use:  'ts-loader',
                exclude: /node_modules/,
            },
            {
                enforce: "pre",
                test:/\.js$/,
                loader: "source-map-loader"
            }
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
