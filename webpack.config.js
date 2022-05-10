var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        app: "./src/index.js"
    },
    output: {
        path: path.join(__dirname, "/dist"),
        publicPath: '',
        filename: "main.js"
    },
    mode: "development",
    devServer: {
        static: {
          directory: path.join(__dirname, "build"),
        },
        port: 9000,
        devMiddleware: {
          writeToDisk: true,
        },
        hot: false, 
        liveReload: true,
        open: true,
      },

    module: {
        rules: [
          {
            test: /\.html$/i,
            use: [
                {
                    loader: "html-loader",
                    options: {
                      minimize: true,
                    },
                },
            ],
          },
          {
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader"
            ],
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[path][name].[ext]',
            },
          },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "css/style.css"
        }),
        new OptimizeCssAssetsPlugin({}),
    ],
}