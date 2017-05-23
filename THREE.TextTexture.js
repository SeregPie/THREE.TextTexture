(function(THREE) {

	THREE.TextTexture = class extends THREE.Texture {
		constructor({
			text = '',
			fontSize = 16,
			fontFamily = 'sans-serif',
			lineHeight = 3/2,
			magFilter = THREE.LinearFilter,
			minFilter = THREE.LinearFilter,
			mapping, wrapS, wrapT, format, type, anisotropy,
		} = {}) {
			super(document.createElement('canvas'), mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
			this._text = text;
			this._fontSize = fontSize;
			this._fontFamily = fontFamily;
			this._lineHeight = lineHeight;
			this._redrawCanvas();
		}

		_redrawCanvas() {
			this.blank = (function(ctx) {
				ctx.clearRect(0, 0, this.image.width, this.image.height);
				if (this._text && this._fontSize && this._lineHeight) {
					let font = `${this._fontSize}px ${this._fontFamily}`;
					ctx.font = font;
					let measuredTextWidth = ctx.measureText(this._text).width;
					if (measuredTextWidth) {
						this.image.width = measuredTextWidth;
						this.image.height = this._fontSize * this._lineHeight;
						ctx.font = font;
						ctx.textAlign = 'center';
						ctx.textBaseline = 'middle';
						ctx.fillStyle = 'white';
						ctx.fillText(this._text, this.image.width / 2, this.image.height / 2);
						return false;
					}
				}
				this.image.width = this.image.height = 1;
				return true;
			}).call(this, this.image.getContext('2d'));
			this.needsUpdate = true;
		}

		get text() {
			return this._text;
		}

		set text(value) {
			if (this._text !== value) {
				this._text = value;
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

		get aspect() {
			if (this.image.width && this.image.height) {
				return this.image.width / this.image.height;
			}
			return 1;
		}
	};

}).call(this, THREE);