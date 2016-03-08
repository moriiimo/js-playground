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
        return [require('autoprefixer'), require('precss')];
    }
};
