var path = require('path');
var webpack = require('webpack');

module.exports = {
    // エントリーポイント
    entry: './src/ts/main.tsx',
    output: {
        filename: './bundle.js'
    },
    devtool: "source-map",
    // 依存関係
    resolve: {
        root:[path.join(__dirname, 'node_modules')],
        modulesDirectories: ['node_modules'],
        extensions:['', '.tsx', '.webpack.js', 'web.js', '.js', '.ts']
    },
    // TypeScriptを読み込むためのloader
    module: {
        loaders: [
            { test: /\.ts(x?)$/, loader: 'ts-loader' }
        ],
        preLoaders: [
           // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
           { test: /\.js$/, loader: "source-map-loader" }
       ]
    },
    externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
};
