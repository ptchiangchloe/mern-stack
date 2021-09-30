const path = require('path');

module.exports = {
    mode: 'development',
    devServer: {
        port: 8000,
        contentBase: 'static',
        proxy: {
            '/api/*': {
                target: 'http://localhost:4000',
            },
        },
        historyApiFallback: true,
    },
    devtool: 'source-map',
    entry: './src/jsx/App.jsx',
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
