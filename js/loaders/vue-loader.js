export default {
	name: 'vue-loader',
	git: 'vuejs/vue-loader',
	slug: 'Vue',
	ctg: 'JS',
	options: {
		sass: false
	},
	scheme: op => {
		return {
			detail: 'parsed .vue template.' + (op.sass ? 'Use Sass/SCSS in styles using <style lang="scss">' : ''),
			depends: ['vue-loader', 'vue-template-compiler', 'css-loader', 'vue']
                .concat(op.sass ? ['sass-loader', 'node-sass', 'vue-style-loader'] : []),

			test: /\.vue$/,
			use: [op.sass ? {
				loader: 'vue-loader',
				options: {
					loaders: {
						scss: [
							'vue-style-loader',
							'css-loader',
							'sass-loader'
						],
						sass: [
							'vue-style-loader',
							'css-loader',
							'sass-loader?indentedSyntax'
						]
					}
				}
			} : 'vue-loader']
		};
	}
};
