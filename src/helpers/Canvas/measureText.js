const ctx = document.createElement('canvas').getContext('2d');

export default function(font, text) {
	ctx.font = font;
	return ctx.measureText(text);
}