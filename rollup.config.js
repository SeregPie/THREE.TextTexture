import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';

export default {
	input: 'src/THREE.TextTexture.js',
	external: ['three'],
	output: {
		file: 'THREE.TextTexture.js',
		format: 'umd',
		name: 'THREE.TextTexture',
		globals: {
			'three': 'THREE',
		},
	},
	plugins: [
		babel({
			presets: [
				['env', {
					//debug: true,
					targets: {
						browsers: 'last 2 versions',
					},
					modules: false,
				}],
			],
		}),
		minify({comments: false}),
	],
};