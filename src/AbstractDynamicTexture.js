import {
	MathUtils,
	Texture,
	Vector3,
} from 'three';

let Class = class extends Texture {
	constructor() {
		super(document.createElement('canvas'));
		this._pixelRatio = 1;
		this._needsRedraw = true;
		this._drawer = null;
	}

	get width() {
		return this.drawer.width;
	}

	get height() {
		return this.drawer.height;
	}

	get drawer() {
		return this._drawer ?? (this._drawer = this.createDrawer());
	}

	get pixelRatio() {
		return this._pixelRatio;
	}

	set pixelRatio(value) {
		if (this._pixelRatio !== value) {
			let oldWidth = this.textureWidth;
			let oldHeight = this.textureHeight;
			this._pixelRatio = value;
			let newWidth = this.textureWidth;
			let newHeight = this.textureHeight;
			if ((newWidth !== oldWidth) || (newHeight !== oldHeight)) {
				this._needsRedraw = true;
			}
		}
	}

	get needsRedraw() {
		return this._needsRedraw;
	}

	set needsRedraw(value) {
		// todo
		if (value) {
			this._needsRedraw = true;
			this._drawer = null;
		}
	}

	get _textureWidth() {
		return MathUtils.ceilPowerOfTwo(this.width * this.pixelRatio);
	}

	get _textureHeight() {
		return MathUtils.ceilPowerOfTwo(this.height * this.pixelRatio);
	}

	redraw() {
		if (this._needsRedraw) {
			let canvas = this.image;
			let ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			canvas.width = this._textureWidth;
			canvas.height = this._textureHeight;
			ctx.save();
			ctx.scale(canvas.width / width, canvas.height / height);
			this.drawer.draw(ctx);
			ctx.restore();
			this._needsRedraw = false;
			this.needsUpdate = true;
		}
	}
};

{
	let cameraPosition = new Vector3();
	let objectPosition = new Vector3();
	let objectScale = new Vector3();
	Class.prototype.setOptimalPixelRatio = function(object, renderer, camera) {
		this.pixelRatio = (() => {
			let {
				width,
				height,
			} = this;
			if (width && height) {
				let maxTextureSize = renderer.capabilities?.maxTextureSize ?? Infinity;
				object.getWorldPosition(objectPosition);
				camera.getWorldPosition(cameraPosition);
				let distance = objectPosition.distanceTo(cameraPosition);
				if (camera.isPerspectiveCamera) {
					distance *= Math.tan(THREE.Math.degToRad(camera.fov) / 2) * 2;
				}
				if (camera.isPerspectiveCamera || camera.isOrthographicCamera) {
					distance /= camera.zoom;
				}
				if (distance) {
					object.getWorldScale(objectScale);
					// todo
					let fontSize = objectScale.y * renderer.domElement.offsetHeight / distance / height;
					width *= fontSize;
					height *= fontSize;
					if (width > maxSize || height > maxSize) {
						fontSize *= maxSize / Math.max(width, height);
					}
					return fontSize;
				}
			}
			return 0;
		})();
	};
}

//Class.prototype.isDynamicTexture = true;

export default Class;
