import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

let globals = {
	'three': 'THREE',
};

export default {
	input: 'src/THREE.TextTexture.js',
	external: Object.keys(globals),
	output: {
		file: 'THREE.TextTexture.js',
		format: 'umd',
		globals,
	},
	plugins: [
		buble(),
		uglify(),
	],
};