import * as THREE from 'three';

let Class = class extends THREE.Texture {
	constructor({
		alignment = 'center',
		color = '#fff',
		fontFamily = 'sans-serif',
		fontSize = 16,
		fontStyle = 'normal',
		fontVariant = 'normal',
		fontWeight = 'normal',
		lineGap = 1/2,
		padding = 1,
		strokeColor = '#fff',
		strokeWidth = 0,
		text = '',

		align,
		fillStyle,
		strokeStyle,
	} = {}) {
		if (align !== undefined) {
			warnOnce();
			alignment = align;
		}
		if (fillStyle !== undefined) {
			warnOnce();
			color = fillStyle;
		}
		if (strokeStyle !== undefined) {
			warnOnce();
			strokeColor = strokeStyle;
		}
		super(
			document.createElement('canvas'),
			undefined,
			undefined,
			undefined,
			THREE.LinearFilter,
			THREE.LinearFilter,
		);
		Object.assign(this, {
			_alignment: alignment,
			_color: color,
			_fontFamily: fontFamily,
			_fontSize: fontSize,
			_fontStyle: fontStyle,
			_fontVariant: fontVariant,
			_fontWeight: fontWeight,
			_lineGap: lineGap,
			_padding: padding,
			_strokeColor: strokeColor,
			_strokeWidth: strokeWidth,
			_text: text,
			needsRedraw: true,
		});
	}

	aaaa() {
		let {
			alignment,
			color,
			fontFamily,
			fontSize,
			fontStyle,
			fontVariant,
			fontWeight,
			lineGap,
			padding,
			strokeColor,
			strokeWidth,
			text,
		} = this;
		padding *= fontSize;
		lineGap *= fontSize;
		strokeWidth *= fontSize;
		let lines = text ? text.split('\n') : [];
		let {length: linesCount} = lines;
		let lineOffset = lineGap + fontSize;
		let textWidth = (linesCount
			? (() => {
				let canvas = document.createElement('canvas');
				let ctx = canvas.getContext('2d');
				ctx.font = font;
				return Math.max(...lines.map(text => ctx.measureText(text).width))
			})()
			: 0
		);
		let textHeight = linesCount ? (fontSize + lineOffset * (linesCount - 1)) : 0;
		let textOffset = padding + strokeWidth / 2;
		let width = textWidth + textOffset * 2;
		let height = textHeight + textOffset * 2;
		let left;
		let top = textOffset + fontSize / 2;
		let result = this.blank(width, height);
		({
			width,
			height,
		} = result);
		let {ctx} = result;
		ctx.save();
		Object.assign(ctx, {
			fillStyle: color,
			font: font.toCSS(),
			lineWidth: strokeWidth,
			miterLimit: 1,
			strokeStyle: strokeColor,
			textAlign: (() => {
				switch (alignment) {
					case 'left':
						left = textOffset;
						return 'left';
					case 'right':
						left = width - textOffset;
						return 'right';
				}
				left = width / 2;
				return 'center';
			})(),
			textBaseline:  'middle',
		});
		lines.forEach(text => {
			ctx.fillText(text, left, top);
			if (strokeWidth) {
				ctx.strokeText(text, left, top);
			}
			top += lineOffset;
		});
		ctx.restore();
	}
};

[
	'alignment',
	'color',
	'fontFamily',
	'fontSize',
	'fontStyle',
	'fontVariant',
	'fontWeight',
	'lineGap',
	'padding',
	'strokeStyleColor',
	'strokeWidth',
	'text',
].forEach(publicProperty => {
	let privateProperty = `_${publicProperty}`;
	Object.defineProperty(Class.prototype, publicProperty, {
		get() {
			return this[privateProperty];
		},
		set(value) {
			if (this[privateProperty] !== value) {
				this[privateProperty] = value;
				this.needsRedraw = true;
			}
		},
	});
});

export default Class;
