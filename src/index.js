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
			_align: align,
			_fillStyle: fillStyle,
			_fontFamily: fontFamily,
			_fontSize: fontSize,
			_fontStyle: fontStyle,
			_fontVariant: fontVariant,
			_fontWeight: fontWeight,
			_lineGap: lineGap,
			_padding: padding,
			_strokeStyle: strokeStyle,
			_strokeWidth: strokeWidth,
			_text: text,
			needsRedraw: true,
		});
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
						this._width = undefined;
						this._height = undefined;
						this.needsRedraw = true;
					}
				},
			});
		});
		Object.defineProperty(this, 'width', {
			get() {
				if (width === undefined) {
					aaaa();
				}
				return width;
			},
		});
		Object.defineProperty(this, 'height', {
			get() {
				if (height === undefined) {
					aaaa();
				}
				return height;
			},
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
		let redraw = function() {
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
		};
		Object.assign(this, {
			_width: width,
			_height: height,
			_redraw: redraw,
		});
	}

	get align() {
		warnOnce();
		return this.alignment;
	}

	set align(value) {
		warnOnce();
		this.alignment = value;
	}

	get fillStyle() {
		warnOnce();
		return this.color;
	}

	set fillStyle(value) {
		warnOnce();
		this.color = value;
	}

	get strokeStyle() {
		warnOnce();
		return this.strokeColor;
	}

	set strokeStyle(value) {
		warnOnce();
		this.strokeColor = value;
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
				this._width = undefined;
				this._height = undefined;
				this.needsRedraw = true;
			}
		},
	});
});

[
	'height',
	'redraw',
	'width',
].forEach(publicProperty => {
	let privateProperty = `_${publicProperty}`;
	Object.defineProperty(Class.prototype, publicProperty, {
		get() {
			if (this[privateProperty] === undefined) {
				this.aaaa();
			}
			return this[privateProperty];
		},
	});
});

Class.isTextTexture = true;

export default Class;
