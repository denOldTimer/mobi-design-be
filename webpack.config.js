const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");
const precss = require("precss");
//plugins
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  //mode: "production",
  mode: "development",
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
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
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/"
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [precss(), postcssImport(), autoprefixer()];
              }
            }
          },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "../fonts/",
              publicPath: "../static/fonts"
            }
          }
        ]
      },
      {
        //bootstrap 4
        test: /bootstrap\/dist\/js\/umd\//,
        use: "imports-loader?jQuery=jquery"
      },
      {
        //font-awesome
        test: /font-awesome\.config\.js/,
        use: [{ loader: "style-loader" }, { loader: "font-awesome-loader" }]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      //options similar to same options in WebpackOptions.output
      //both options are optional
      filename: "[name].css",
      chunckFilename: "[id].css"
    })
  ]
};
