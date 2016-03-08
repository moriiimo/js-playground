var autoprefixer = require('autoprefixer');
var precss       = require('precss');
var postcsssize  = require('postcss-size')
//var postcss = require("postcss")
//var reporter = require("postcss-reporter")
//var stylelint = require("stylelint")

module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: { 
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader" }
        ]
    },
    postcss: function () {
        return [autoprefixer, precss, postcsssize];
    }
};
