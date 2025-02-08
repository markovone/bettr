import { defineConfig } from '@rspack/cli'


export default defineConfig({
	entry: {
		index: './src/index.js'
	},
	resolve: {
		extensions: ['...', '.ts', '.tsx', '.jsx']
	},
	target: 'node',
	ignoreWarnings: [ /the request of a dependency is an expression/ ],
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
							}
						}
					}
				]
			}	 
		]
	}
})
