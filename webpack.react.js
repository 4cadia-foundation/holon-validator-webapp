const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');


module.exports = ( watch = false, zip = false ) => {
    let module = {
        mode: 'development',
        entry: './src/index.js',
        devtool: 'inline-source-map',
        node: {
            net: 'empty',
            tls: 'empty',
            dns: 'empty',
            fs: 'empty',
            path: 'empty',
            net: 'empty',
            child_process: 'empty'
        },
        output: {
            filename: 'main.bundle.js',
            path: path.resolve(__dirname, 'build')
        },
        plugins:[
            new CopyPlugin([
                {from: path.resolve(__dirname, 'public'), to: path.resolve(__dirname, 'build')},
            ])
        ],
        module: {
            rules: [
                {
                    test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)|\.png($|\?)|\.jpg($|\?)/,
                    loader: 'url-loader'
                },
                {
                    test: /\.css$/,
                    loader: 'style-loader'
                },
                {
                    test: /\.css$/,
                    loader: 'css-loader'
                },
                {
                    test: /\.js$/,
                    include: [path.resolve(__dirname, 'src')],
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime']
                        }
                    }]
                }
            ]
        }
    };

    if (watch){
        module.watch = true;
        module.plugins.push(new LiveReloadPlugin());
    }

    if (zip){
        module.plugins.push(new ZipPlugin({path: '.',filename: './app-ipfs.zip'}));
    }

    return module;
};
