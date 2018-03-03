import Array_max from 'x/src/Array/max';

import createCanvas from './createCanvas';

export default function(lines, font) {
	if (lines.length) {
		let ctx = createCanvas().getContext('2d');
		ctx.font = font;
		return Array_max(lines, text => ctx.measureText(text).width);
	}
	return 0;
}
