(function(THREE) {

	THREE.TextTexture = class extends THREE.Texture {
		constructor(text = '', fontSize = 16, fontFace = 'serif', ...args) {
			let canvas = document.createElement('canvas');
			canvas.getContext('2d');
			super(canvas, ...args);
			this._text = text;
			this._fontSize = fontSize;
			this._fontFace = fontFace;
			this._update();
		}

		_update() {
			let canvas = this.image;
			let ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			let font = `${this._fontSize}px ${this._fontFace}`;
			ctx.font = font;
			canvas.width = ctx.measureText(this._text).width;
			canvas.height = this._fontSize;
			ctx.font = font;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = 'white';
			ctx.fillText(this._text, canvas.width / 2, canvas.height / 2);
			this._aspectRatio = canvas.width / canvas.height;
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
			this._update();
		}

		get fontSize() {
			return this._fontSize;
		}

		set fontSize(value) {
			if (this._fontSize === value) {
				return;
			}
			this._fontSize = value;
			this._update();
		}

		get fontFace() {
			return this._fontFace;
		}

		set fontFace(value) {
			if (this._fontFace === value) {
				return;
			}
			this._fontFace = value;
			this._update();
		}

		get aspectRatio() {
			return this._aspectRatio;
		}
	};

}).call(this, THREE);