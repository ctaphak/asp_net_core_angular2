(function () {
    "use strict";

    var webpack = require("webpack");
    var ExtractTextPlugin = require("extract-text-webpack-plugin");
    var helpers = require("./helpers");

    module.exports = {
        entry: {
            "polyfills": "./src/polyfills.ts",
            "vendor": "./src/vendor.ts",
            "app": "./src/main.ts"
        },
        resolve: {
            extensions: [".ts", ".js"]
        },
        module: {
            rules: [{
                test: /\.ts$/,
                use: [{
                    loader: "awesome-typescript-loader",
                    options: { configFileName: helpers.root("src", "tsconfig.json") }
                }, "angular2-template-loader"]
            }, {
                test: /\.html$/,
                use: "html-loader"
            }, {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: "file-loader?name=assets/[name].[hash].[ext]"
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }, {
                        loader: "postcss-loader"
                    }]
                })
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }, {
                        loader: "postcss-loader"
                    }]
                })
            }, {
                test: /\.css$/,
                exclude: helpers.root("src", "app"),
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader?sourceMap",
                        "postcss-loader"
                    ]
                }, {
                    test: /\.css$/,
                    include: helpers.root("src", "app"),
                    use: "raw-loader"
                })
            }]
        },
        plugins: [
            // Workaround for angular/angular#11580
          new Webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root("./src"), // location of your src
            {} // a map of your routes
          ),

          new Webpack.optimize.CommonsChunkPlugin({
              name: ["app", "vendor", "polyfills"]
          })
        ]
    };
})();