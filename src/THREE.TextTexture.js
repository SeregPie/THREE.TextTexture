import THREE from 'three';

import Canvas_measureText from './helpers/Canvas/measureText';
import Array_max from './helpers/Array/max';

export default class extends THREE.Texture {
	constructor({
		autoRedraw = true,
		text = '',
		fontStyle = 'normal',
		fontVariant = 'normal',
		fontWeight = 'normal',
		fontSize = 16,
		fontFamily = 'sans-serif',
		textAlign = 'center',
		lineHeight = 1,
		padding = 1/4,
		magFilter = THREE.LinearFilter,
		minFilter = THREE.LinearFilter,
		mapping, wrapS, wrapT, format, type, anisotropy,
	} = {}) {
		super(document.createElement('canvas'), mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
		this.autoRedraw = autoRedraw;
		this._text = text;
		this._fontStyle = fontStyle;
		this._fontVariant = fontVariant;
		this._fontWeight = fontWeight;
		this._fontSize = fontSize;
		this._fontFamily = fontFamily;
		this._textAlign = textAlign;
		this._lineHeight = lineHeight;
		this._padding = padding;
		/*
		this._lines = undefined;
		this._font = undefined;
		this._textBoxWidth = undefined;
		*/
		this.redraw();
	}

	redraw() {
		let ctx = this.image.getContext('2d');
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		if (this.textBoxWidthInPixels && this.textBoxHeightInPixels) {
			ctx.canvas.width = this.paddingBoxWidthInPixels;
			ctx.canvas.height = this.paddingBoxHeightInPixels;
			ctx.font = this.font;
			ctx.textBaseline = 'middle';
			ctx.fillStyle = 'white';
			let left;
			switch (this.textAlign) {
				case 'left':
					ctx.textAlign = 'left';
					left = this.paddingInPixels;
					break;
				case 'right':
					ctx.textAlign = 'right';
					left = this.paddingInPixels + this.textBoxWidthInPixels;
					break;
				case 'center':
					ctx.textAlign = 'center';
					left = this.paddingInPixels + this.textBoxWidthInPixels / 2;
					break;
			}
			let top = this.paddingInPixels + this.fontSize / 2;
			this.lines.forEach(line => {
				ctx.fillText(line, left, top);
				top += this.lineHeightInPixels;
			});
		} else {
			ctx.canvas.width = ctx.canvas.height = 1;
		}
		this.needsUpdate = true;
	}

	_redrawIfAuto() {
		if (this.autoRedraw) {
			this.redraw();
		}
	}

	get text() {
		return this._text;
	}

	set text(value) {
		if (this._text !== value) {
			this._text = value;
			this._lines = undefined;
			this._textBoxWidth = undefined;
			this._redrawIfAuto();
		}
	}

	_computeLines() {
		if (this.text) {
			return this.text.split('\n');
		}
		return [];
	}

	get lines() {
		if (this._lines === undefined) {
			this._lines = this._computeLines();
		}
		return this._lines;
	}

	get linesCount() {
		return this.lines.length;
	}

	get fontStyle() {
		return this._fontStyle;
	}

	set fontStyle(value) {
		if (this._fontStyle !== value) {
			this._fontStyle = value;
			this._font = undefined;
			this._textBoxWidth = undefined;
			this._redrawIfAuto();
		}
	}

	get fontVariant() {
		return this._fontVariant;
	}

	set fontVariant(value) {
		if (this._fontVariant !== value) {
			this._fontVariant = value;
			this._font = undefined;
			this._textBoxWidth = undefined;
			this._redrawIfAuto();
		}
	}

	get fontWeight() {
		return this._fontWeight;
	}

	set fontWeight(value) {
		if (this._fontWeight !== value) {
			this._fontWeight = value;
			this._font = undefined;
			this._textBoxWidth = undefined;
			this._redrawIfAuto();
		}
	}

	get fontSize() {
		return this._fontSize;
	}

	set fontSize(value) {
		if (this._fontSize !== value) {
			this._fontSize = value;
			this._font = undefined;
			this._textBoxWidth = undefined;
			this._redrawIfAuto();
		}
	}

	get fontFamily() {
		return this._fontFamily;
	}

	set fontFamily(value) {
		if (this._fontFamily !== value) {
			this._fontFamily = value;
			this._font = undefined;
			this._textBoxWidth = undefined;
			this._redrawIfAuto();
		}
	}

	_computeFont() {
		return [
			this.fontStyle,
			this.fontVariant,
			this.fontWeight,
			`${this.fontSize}px`,
			this.fontFamily,
		].join(' ');
	}

	get font() {
		if (this._font === undefined) {
			this._font = this._computeFont();
		}
		return this._font;
	}

	get textAlign() {
		return this._textAlign;
	}

	set textAlign(value) {
		if (this._textAlign !== value) {
			this._textAlign = value;
			this._redrawIfAuto();
		}
	}

	get lineHeight() {
		return this._lineHeight;
	}

	set lineHeight(value) {
		if (this._lineHeight !== value) {
			this._lineHeight = value;
			this._redrawIfAuto();
		}
	}

	get lineHeightInPixels() {
		return this.fontSize * this.lineHeight;
	}

	_computeTextWidthInPixels() {
		if (this.lines.length) {
			return Array_max(this.lines, line => Canvas_measureText(this.font, line).width);
		}
		return 0;
	}

	get textBoxWidthInPixels() {
		if (this._textBoxWidth === undefined) {
			this._textBoxWidth = this._computeTextWidthInPixels();
		}
		return this._textBoxWidth;
	}

	get textBoxHeight() {
		return this.lineHeight * (this.linesCount - 1) + 1;
	}

	get textBoxHeightInPixels() {
		return this.fontSize * this.textBoxHeight;
	}

	get padding() {
		return this._padding;
	}

	set padding(value) {
		if (this._padding !== value) {
			this._padding = value;
			this._redrawIfAuto();
		}
	}

	get paddingInPixels() {
		return this.fontSize * this.padding;
	}

	get paddingBoxWidthInPixels() {
		return this.textBoxWidthInPixels + 2 * this.paddingInPixels;
	}

	get paddingBoxHeight() {
		return this.textBoxHeight + 2 * this.padding;
	}

	get paddingBoxHeightInPixels() {
		return this.textBoxHeightInPixels + 2 * this.paddingInPixels;
	}

	get aspect() {
		if (this.image.width && this.image.height) {
			return this.image.width / this.image.height;
		}
		return 1;
	}
}