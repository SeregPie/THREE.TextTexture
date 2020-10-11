import AbstractDynamicTexture from './AbstractDynamicTexture';
import toCSSFont from './toCSSFont';

let Class = class extends AbstractDynamicTexture {
	constructor({
		alignment = 'center',
		color = '#fff',
		fontFamily = 'sans-serif',
		fontSize = 16,
		fontStyle = 'normal',
		fontVariant = 'normal',
		fontWeight = 'normal',
		lineGap = 1/4,
		padding = 1/2,
		strokeColor = '#fff',
		strokeWidth = 0,
		text = '',
	} = {}) {
		super();
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
		}).forEach(([key, currentValue]) => {
			Object.defineProperty(this, key, {
				get() {
					return currentValue;
				},
				set(value) {
					if (currentValue !== value) {
						currentValue = value;
						this.needsRedraw = true;
					}
				},
			});
		});
	}

	get lines() {
		return text ? text.split('\n') : [];
	}

	get font() {
		return toCSSFont(
			this.fontFamily,
			this.fontSize,
			this.fontStyle,
			this.fontVariant,
			this.fontWeight,
		);
	}

	checkFontFace() {
		try {
			return document.fonts.check(this.font);
		} catch {
			// pass
		}
		return true;
	}

	async loadFontFace() {
		try {
			return await document.fonts.load(this.font);
		} catch {
			// pass
		}
	}

	createDrawable() {
		let {
			alignment,
			color,
			font,
			fontSize,
			lineGap,
			lines,
			padding,
			strokeColor,
			strokeWidth,
		} = this;
		padding *= fontSize;
		lineGap *= fontSize;
		strokeWidth *= fontSize;
		let linesCount = lines.length;
		let lineOffset = fontSize + lineGap;
		let contentWidth = (linesCount
			? (() => {
				let canvas = document.createElement('canvas');
				let ctx = canvas.getContext('2d');
				ctx.font = font;
				return Math.max(...lines.map(text => ctx.measureText(text).width));
			})()
			: 0
		);
		let contentHeight = (linesCount
			? (fontSize + lineOffset * (linesCount - 1))
			: 0
		);
		let contentOffset = padding + strokeWidth / 2;
		let width = contentWidth + contentOffset * 2;
		let height = contentHeight + contentOffset * 2;
		return {
			width,
			height,
			draw(ctx) {
				let left;
				let top = contentOffset + fontSize / 2;
				Object.assign(ctx, {
					fillStyle: color,
					font: font,
					lineWidth: strokeWidth,
					miterLimit: 1,
					strokeStyle: strokeColor,
					textAlign: (() => {
						switch (alignment) {
							case 'left':
								left = contentOffset;
								return 'left';
							case 'right':
								left = width - contentOffset;
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
			},
		};
	}
};

Class.prototype.isTextTexture = true;

export default Class;
