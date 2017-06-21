(function(THREE) {

	THREE.TextTexture = class extends THREE.Texture {
		constructor({
			text = '',
			fontStyle = 'normal',
			fontVariant = 'normal',
			fontWeight = 'normal',
			fontSize = 16,
			fontFamily = 'sans-serif',
			padding = 1/8,
			//textAlign = 'center',
			lineHeight = 1,
			magFilter = THREE.LinearFilter,
			minFilter = THREE.LinearFilter,
			mapping, wrapS, wrapT, format, type, anisotropy,
		} = {}) {
			super(document.createElement('canvas'), mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
			this._text = text;
			this._fontStyle = fontStyle;
			this._fontVariant = fontVariant;
			this._fontWeight = fontWeight;
			this._fontSize = fontSize;
			this._fontFamily = fontFamily;
			this._padding = padding;
			this._lineHeight = lineHeight;
			this._updateLines();
			this._redrawCanvas();
		}

		_updateLines() {
			if (this.text) {
				this.lines = [this.text];
			} else {
				this.lines = [];
			}
			this.linesCount = this.lines.length;
		}

		_redrawCanvas() {
			(function(ctx) {
				ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
				if (this._text && this._fontSize) {
					let font = this.font;
					ctx.font = font;
					let measuredTextWidth = ctx.measureText(this._text).width;
					if (measuredTextWidth) {
						ctx.canvas.width = measuredTextWidth + (this._fontSize * this._padding * 2);
						ctx.canvas.height = this._fontSize + (this._fontSize * this._padding * 2);
						ctx.font = font;
						ctx.textAlign = 'center';
						ctx.textBaseline = 'middle';
						ctx.fillStyle = 'white';
						ctx.fillText(this._text, ctx.canvas.width / 2, ctx.canvas.height / 2);
						return;
					}
				}
				ctx.canvas.width = ctx.canvas.height = 1;
			}).call(this, this.image.getContext('2d'));
			this.needsUpdate = true;
		}

		get text() {
			return this._text;
		}

		set text(value) {
			if (this._text !== value) {
				this._text = value;
				this._updateLines();
				this._redrawCanvas();
			}
		}

		get font() {
			return [this._fontStyle, this._fontVariant, this._fontWeight, `${this._fontSize}px`, this._fontFamily].join(' ');
		}

		get fontStyle() {
			return this._fontStyle;
		}

		set fontStyle(value) {
			if (this._fontStyle !== value) {
				this._fontStyle = value;
				this._redrawCanvas();
			}
		}

		get fontVariant() {
			return this._fontVariant;
		}

		set fontVariant(value) {
			if (this._fontVariant !== value) {
				this._fontVariant = value;
				this._redrawCanvas();
			}
		}

		get fontWeight() {
			return this._fontWeight;
		}

		set fontWeight(value) {
			if (this._fontWeight !== value) {
				this._fontWeight = value;
				this._redrawCanvas();
			}
		}

		get fontSize() {
			return this._fontSize;
		}

		set fontSize(value) {
			if (this._fontSize !== value) {
				this._fontSize = value;
				this._redrawCanvas();
			}
		}

		get fontFamily() {
			return this._fontFamily;
		}

		set fontFamily(value) {
			if (this._fontFamily !== value) {
				this._fontFamily = value;
				this._redrawCanvas();
			}
		}

		get lineHeight() {
			return this._lineHeight;
		}

		set lineHeight(value) {
			if (this._lineHeight !== value) {
				this._lineHeight = value;
				this._redrawCanvas();
			}
		}

		get padding() {
			return this._padding;
		}

		set padding(value) {
			if (this._padding !== value) {
				this._padding = value;
				this._redrawCanvas();
			}
		}

		get aspect() {
			if (this.image.width && this.image.height) {
				return this.image.width / this.image.height;
			}
			return 1;
		}
	};

}).call(this, THREE);