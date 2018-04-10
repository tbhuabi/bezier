const path = require('path');
const globalConfig = require('../global.config');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: path.resolve(globalConfig.appPath, 'lib/index.ts')
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        path: globalConfig.buildPath,
        filename: 'index.js',
        libraryTarget: 'umd'
        // umdNamedDefine: true
    },
    module: {
        rules: [{
            test: /\.ts$/,
            enforce: 'pre',
            use: [{
                loader: 'tslint-loader',
                options: {
                    configuration: require('../tslint.json'),
                    emitErrors: false,
                    failOnHint: false,
                    formatter: 'tslint-formatter-eslint-style'
                }
            }]
        }, {
            test: /\.ts$/,
            use: ['awesome-typescript-loader']
        }]
    }
};