const webpack = require('webpack')
const reactRefreshWebpackPlugin = require('react-refresh-webpack-plugin')
const ReactRefreshWebpackPlugin = require('react-refresh-webpack-plugin');
module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        hot:true,
        open:true,
        port: 56436
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.name':JSON.stringify('Dev')
        })
    ]
}
