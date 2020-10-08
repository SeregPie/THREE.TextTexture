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
	} = {}) {
		super(
			document.createElement('canvas'),
			undefined,
			undefined,
			undefined,
			THREE.LinearFilter,
			THREE.LinearFilter,
		);
		let cccc = null;
		Object.entries({
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
		}).forEach(([key, value]) => {
			Object.defineProperty(this, key, {
				get() {
					return value;
				},
				set(newValue) {
					if (value !== newValue) {
						value = newValue;
						cccc = null;
					}
				},
			});
		});
		let aaaa = (() => {
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
			let redraw = function() {
				if (needsRedraw) {
					let {image: canvas} = this;
					let ctx = canvas.getContext('2d');
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					canvas.width = Math.floor(width * pixelRatio);
					canvas.height = Math.floor(height * pixelRatio);
					ctx.save();
					ctx.scale(pixelRatio, pixelRatio);
					let left;
					let top = textOffset + fontSize / 2;
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
					needsRedraw = false;
				}
			};
			cccc = {
				width,
				height,
				redraw,
			};
		});
		[
			'width',
			'height',
			'redraw',
		].forEach(key => {
			Object.defineProperty(this, key, {
				get() {
					if (cccc === null) {
						aaaa();
					}
					return cccc[key];
				},
			});
		});
	}
};

Class.isTextTexture = true;

export default Class;
