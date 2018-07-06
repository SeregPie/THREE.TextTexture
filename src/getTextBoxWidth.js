import Array_max from '/utils/Array/max';
import Document_createCanvas from '/utils/Document/createCanvas';

export default function(lines, font) {
	if (lines.length) {
		let ctx = Document_createCanvas().getContext('2d');
		ctx.font = font;
		return Array_max(lines.map(text => ctx.measureText(text).width));
	}
	return 0;
}
