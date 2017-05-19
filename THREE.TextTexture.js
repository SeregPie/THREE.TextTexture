(function(THREE) {

	THREE.TextTexture = class extends THREE.Texture {
		constructor({
			text = '',
			fontSize = 16,
			fontFamily = 'sans-serif',
			lineHeight = 3/2,
			mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy,
		} = {}) {
			let canvas = document.createElement('canvas');
			canvas.getContext('2d');
			super(canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
			this._text = text;
			this._fontSize = fontSize;
			this._fontFamily = fontFamily;
			this._lineHeight = lineHeight;
			this._updateImage();
		}

		_updateImage() {
			let canvas = this.image
			let ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			if (this._text && this._fontSize) {
				let font = `${this._fontSize}px ${this._fontFamily}`;
				ctx.font = font;
				canvas.width = ctx.measureText(this._text).width;
				canvas.height = this._fontSize * this._lineHeight;
				ctx.font = font;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillStyle = 'white';
				ctx.fillText(this._text, canvas.width / 2, canvas.height / 2);
			} else {
				canvas.width = canvas.height = 1;
			}
			this.needsUpdate = true;
		}

		get text() {
			return this._text;
		}

		set text(value) {
			if (this._text === value) {
				return;
			}
			this._text = value;
			this._updateImage();
		}

		get fontSize() {
			return this._fontSize;
		}

		set fontSize(value) {
			if (this._fontSize === value) {
				return;
			}
			this._fontSize = value;
			this._updateImage();
		}

		get fontFamily() {
			return this._fontFamily;
		}

		set fontFamily(value) {
			if (this._fontFamily === value) {
				return;
			}
			this._fontFamily = value;
			this._updateImage();
		}

		get lineHeight() {
			return this._lineHeight;
		}

		set lineHeight(value) {
			if (this._lineHeight === value) {
				return;
			}
			this._lineHeight = value;
			this._updateImage();
		}

		get aspect() {
			return this.image.width / this.image.height;
		}
	};

}).call(this, THREE);