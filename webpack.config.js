var webpack = require("webpack");

module.exports = {
	entry: {
		main: "./js/main.js"
	},
	output: {
		filename: "fast-console.js",
		path: __dirname + "/dist/"
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: "style-loader!css-loader"},
			{ test: /\.(png|jpg)$/, loader: "url-loader?limit=15000&name=images/[hash:8].[name].[ext]"}
		]
	},
	plugins: [		
		// js压缩
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
	]
};