(function(THREE) {

	let measureText = (function() {
		let ctx = document.createElement('canvas').getContext('2d');

		return function(font, text) {
			ctx.font = font;
			return ctx.measureText(text);
		};
	})();



	THREE.TextTexture = class extends THREE.Texture {
		constructor({
			autoRedraw = true,
			text = '',
			fontStyle = 'normal',
			fontVariant = 'normal',
			fontWeight = 'normal',
			fontSize = 16,
			fontFamily = 'sans-serif',
			padding = 1/4,
			textAlign = 'center',
			lineHeight = 1,
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
			this._padding = padding;
			this._textAlign = textAlign;
			this._lineHeight = lineHeight;
			/*
			this._lines = undefined;
			this._font = undefined;
			this._textWidth = undefined;
			this._textHeight = undefined;
			*/
			this.redraw();
		}

		redraw() {
			let ctx = this.image.getContext('2d');
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			if (this.textWidth && this.textHeight) {
				ctx.canvas.width = this.textWidth + this.paddingInPixels * 2;
				ctx.canvas.height = this.textHeight + this.paddingInPixels * 2;
				ctx.font = this.font;
				ctx.textAlign = this.textAlign;
				ctx.textBaseline = 'middle';
				ctx.fillStyle = 'white';
				let left = this.paddingInPixels + (() => {
					switch (ctx.textAlign.toLowerCase()) {
						case 'left':
							return 0;
						case 'right':
							return this.textWidth;
						case 'center':
							return this.textWidth / 2;
					}
				})();
				let top = this.paddingInPixels + this.fontSize / 2;
				for (let line of this.lines) {
					ctx.fillText(line, left, top);
					top += this.lineHeightInPixels;
				}
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
				this._textWidth = undefined;
				this._textHeight = undefined;
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
				this._textWidth = undefined;
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
				this._textWidth = undefined;
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
				this._textWidth = undefined;
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
				this._textWidth = undefined;
				this._textHeight = undefined;
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
				this._textWidth = undefined;
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
				this._textHeight = undefined;
				this._redrawIfAuto();
			}
		}

		get lineHeightInPixels() {
			return this.fontSize * this.lineHeight;
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

		_computeTextWidth() {
			let returns = 0;
			for (let line of this.lines) {
				returns = Math.max(measureText(this.font, line).width, returns);
			}
			return returns;
		}

		get textWidth() {
			if (this._textWidth === undefined) {
				this._textWidth = this._computeTextWidth();
			}
			return this._textWidth;
		}

		_computeTextHeight() {
			return this.fontSize * (this.lineHeight * (this.linesCount - 1) + 1);
		}

		get textHeight() {
			if (this._textHeight === undefined) {
				this._textHeight = this._computeTextHeight();
			}
			return this._textHeight;
		}

		get aspect() {
			if (this.image.width && this.image.height) {
				return this.image.width / this.image.height;
			}
			return 1;
		}
	};

}).call(this, THREE);