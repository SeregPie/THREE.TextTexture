import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

import pkg from './package.json';

let globals = {
	'three': 'THREE',
};

export default {
	input: 'src/index.js',
	external: Object.keys(globals),
	output: {
		file: pkg.main,
		format: 'umd',
		name: 'THREE.TextTexture',
		globals,
	},
	plugins: [
		nodeResolve(),
		buble(),
		uglify(),
	],
};
