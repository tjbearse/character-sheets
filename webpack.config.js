const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './webapp/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		chunkFilename: '[id].js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{ 
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: "[name]__[local]___[hash:base64:5]",
							},														
							sourceMap: true
						}
					},
					{ 
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									[ 'autoprefixer', {}, ],
								],
							},
						}
					}
				]
			},
			{
				test: /\.(scss)$/,
				use: [
					{
						// Adds CSS to the DOM by injecting a `<style>` tag
						loader: 'style-loader'
					},
					{
						// Interprets `@import` and `url()` like `import/require()` and will resolve them
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader', // Run post css actions
						options: {
							postcssOptions: {
								plugins: [
									['precss', {}, ],
									['autoprefixer', {}, ],
								]
							}
						},
					},
					{
						// Loads a SASS/SCSS file and compiles it to CSS
						loader: 'sass-loader'
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					// &name=img/[name].[ext]
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + '/webapp/index.html',
			filename: 'index.html',
			inject: 'body'
		})
	],
	devServer: {
        historyApiFallback: {
            index: '/index.html'
        },
		proxy: {
			'/api': 'http://localhost:5000',
		},
    },
};
