import { defineConfig } from '@rspack/cli'
import { rspack, CopyRspackPlugin, CssExtractRspackPlugin } from '@rspack/core'

// https://www.sitepoint.com/sass-mixin-media-merging/

const targets = ['chrome >= 87', 'edge >= 88', 'firefox >= 78', 'safari >= 14']

export default defineConfig({
	entry: {
		index: './react/index.js',
	},
	// devServer: {
	// 	historyApiFallback: true, // for react-router
	// }, 
	resolve: {
		extensions: ['...', 'js', '.ts', '.tsx', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.(jsx?|tsx?)$/,
				use: [
					{
						loader: 'builtin:swc-loader',
						options: {
							jsc: {
								parser: {
									syntax: 'typescript',
									tsx: true
								},
								transform: {
									react: {
										runtime: 'automatic',
									}
								}
							},
							env: { targets }
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					CssExtractRspackPlugin.loader,
				  	'css-loader',
				 	'sass-loader',
				],
			},
		]
	},
	plugins: [
		new CopyRspackPlugin({
			patterns: [{ from: 'assets' }],
		}),
		new CssExtractRspackPlugin({})
	  ],
	performance: {
		maxAssetSize: 300_000,
		maxEntrypointSize: 300_000
	},
	optimization: {
		minimizer: [
			new rspack.SwcJsMinimizerRspackPlugin(),
			new rspack.LightningCssMinimizerRspackPlugin({
				minimizerOptions: { targets }
			})
		]
	},
})
