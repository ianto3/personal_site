const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    mode: "production",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[hash].js',
        assetModuleFilename: 'images/[hash][ext]'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            },
            {
                test: /\.(png|svg)$/i,
                type: 'asset/resource'
            },
            {
                // This image is used in meta tags for social media and need URL address.
                // The URL is hard coded in the index.html for now so i need the filename to be unchanged instead of hashed.
                test: /site_image_preview.png$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                }
            },
            {
                test: /\.pdf$/,
                type: "asset/resource",
                generator: {
                    filename: 'resources/[name][ext]'
                }
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    sources: {
                        list: [
                            "...",
                            {
                                // Grabs href file from 'a' tag as resource
                                // In this case pdf file of resume
                                tag: "a",
                                attribute: "href",
                                type: "src"
                            }
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[hash].css",
            chunkFilename: "[name].css"
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "src/index.html"
        })
    ]
};