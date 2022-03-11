const path = require("path");                                     /* node path */
const glob = require("glob");                                 
const HtmlWebpackPlugin = require("html-webpack-plugin");         /* for loading / create html */
const MinicssExtractPlugin = require("mini-css-extract-plugin")   /* extracting css from js*/
const PurgecssPlugin = require('purgecss-webpack-plugin')         /* for cleaning unused style */

const ROOT_PATH = {
  src: path.resolve(__dirname, `src`)
}

module.exports = {
  mode: "development",
  entry: "./src/index.js",

  output:   {
    filename: "[name][contenthash].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },

  resolve: {
    // for shorten imports
    alias: {
      // default root 
      "@components": `${ROOT_PATH.src}/res/components`,
      
      // for styling
      "@reiend/quirk": `@reiend/quirk/index.scss`,

      // assets
      "@images": `${ROOT_PATH.src}/res/assets/images`,

      // resolve naming conflicts using its file extention
      extensions: ['.jsx', '.js', '.json', "..."], /* ... use default extention */
    }
  },

  module: {
    rules: [
      // load css
      {
        // sass or scss
        test: /\.s[ac]ss$/i, 
        use: 
          [
            MinicssExtractPlugin.loader, 
            "css-loader",
            "sass-loader",
          ]
      }, 
      {
        // transpiler
        test: /\.m?(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            "targets": { "esmodules": true }
          },
        },
      },
      //  pulling assets
      {
        test: /\.(png|svg|jpg|jpeg|gif|jfif)$/i,
        type: "asset/resource",
      },

      // pulling fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ]
  },

  plugins: [
    // create root html
    new HtmlWebpackPlugin({
      title: "Slack app",
      filename: "index.html",
    }),
    // css extractor from js
    new MinicssExtractPlugin({
      filename: "[name].bundle.css",
    }),
    // unused style clean up
    new PurgecssPlugin({
      paths: glob.sync(`${ROOT_PATH.src}/**/*`, {nodir: true}),
    })
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    open: true,
    hot: true,
    compress: true,
    port: 9000,
  }
}

