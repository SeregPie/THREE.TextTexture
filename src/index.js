import THREE from 'three';

import createCanvas from './createCanvas';
import getFont from './getFont';
import getLines from './getLines';
import getTextBoxWidthInPixels from './getTextBoxWidthInPixels';

THREE.TextTexture = class extends THREE.Texture {
	constructor({
		autoRedraw = true,
		text = '',
		fontStyle = 'normal',
		fontVariant = 'normal',
		fontWeight = 'normal',
		fontSize = 16,
		fontFamily = 'sans-serif',
		textAlign = 'center',
		lineHeight = 1.15,
		padding = 0.25,
		magFilter = THREE.LinearFilter,
		minFilter = THREE.LinearFilter,
		mapping, wrapS, wrapT, format, type, anisotropy,
	} = {}) {
		super(createCanvas(), mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
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
		this._textBoxWidthInPixels = undefined;
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
			this._textBoxWidthInPixels = undefined;
			this._redrawIfAuto();
		}
	}

	get lines() {
		if (this._lines === undefined) {
			this._lines = getLines(this.text);
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
			this._textBoxWidthInPixels = undefined;
			this._redrawIfAuto();
		}
	}

	get fontVariant() {
		return this._fontVariant;
	}

	set fontVariant(value) {
		if (this._fontVariant !== value) {
			this._fontVariant = value;
			this._textBoxWidthInPixels = undefined;
			this._redrawIfAuto();
		}
	}

	get fontWeight() {
		return this._fontWeight;
	}

	set fontWeight(value) {
		if (this._fontWeight !== value) {
			this._fontWeight = value;
			this._textBoxWidthInPixels = undefined;
			this._redrawIfAuto();
		}
	}

	get fontSize() {
		return this._fontSize;
	}

	set fontSize(value) {
		if (this._fontSize !== value) {
			this._fontSize = value;
			this._textBoxWidthInPixels = undefined;
			this._redrawIfAuto();
		}
	}

	get fontFamily() {
		return this._fontFamily;
	}

	set fontFamily(value) {
		if (this._fontFamily !== value) {
			this._fontFamily = value;
			this._textBoxWidthInPixels = undefined;
			this._redrawIfAuto();
		}
	}

	get font() {
		return getFont(
			this.fontStyle,
			this.fontVariant,
			this.fontWeight,
			this.fontSize,
			this.fontFamily,
		);
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

	get textBoxWidthInPixels() {
		if (this._textBoxWidthInPixels === undefined) {
			this._textBoxWidthInPixels = getTextBoxWidthInPixels(
				this.lines,
				this.font,
			);
		}
		return this._textBoxWidthInPixels;
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
};
