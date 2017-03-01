const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
};

const commonConfig = {
    entry: {
        app: PATHS.app,
    },
    output: {
        path: PATHS.build,
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack Demo!',
        }),
    ],
};

function productionConfig() {
    return commonConfig;
}

function developmentConfig() {
    const config = {
        devServer: {
            historyApiFallback: true,
            hotOnly: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT,

            overlay: {
                errors: true,
                warnings: true,
            },
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
        ],
    };

    return Object.assign(
        {},
        commonConfig,
        config,
        {
            plugins: commonConfig.plugins.concat(config.plugins),
        }
    );
}

module.exports = function(env) {
    if (env === 'production') {
        return productionConfig();
    }

    return developmentConfig();
};
