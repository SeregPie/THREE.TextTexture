import {
	MathUtils,
	Texture,
	Vector2,
	Vector3,
} from 'three';

let Class = class extends Texture {
	constructor() {
		super(document.createElement('canvas'));
		let drawable = null;
		let getDrawable = (() => drawable || (drawable = this.createDrawable()));
		let getWidth = (() => getDrawable().width);
		let getHeight = (() => getDrawable().height);
		let getSize = (target => {
			target.set(getWidth(), getHeight());
			return target;
		});
		let draw = ((...args) => getDrawable().draw(...args));

		let needsRedraw = true;

		let pixelRatio = 1;

		let getTextureWidth = (() => MathUtils.ceilPowerOfTwo(getWidth() * pixelRatio));
		let getTextureHeight = (() => MathUtils.ceilPowerOfTwo(getHeight() * pixelRatio));

		let setPixelRatio = (value => {
			if (pixelRatio !== value) {
				let oldWidth = getTextureWidth();
				let oldHeight = getTextureHeight();
				pixelRatio = value;
				let newWidth = getTextureWidth();
				let newHeight = getTextureHeight();
				if ((newWidth !== oldWidth) || (newHeight !== oldHeight)) {
					needsRedraw = true;
				}
			}
		});

		let computeOptimalPixelRatio = (() => {
			let cameraPosition = new Vector3();
			let canvasSize = new Vector2();
			let objectPosition = new Vector3();
			let objectScale = new Vector3();
			let textureSize = new Vector2();
			return ((object, renderer, camera) => {
				getSize(textureSize);
				if (textureSize.x && textureSize.y) {
					object.getWorldPosition(objectPosition);
					camera.getWorldPosition(cameraPosition);
					let distance = objectPosition.distanceTo(cameraPosition);
					if (camera.isPerspectiveCamera) {
						distance *= Math.tan(MathUtils.degToRad(camera.fov) / 2) * 2;
					}
					if (camera.isPerspectiveCamera || camera.isOrthographicCamera) {
						distance /= camera.zoom;
					}
					if (distance) {
						object.getWorldScale(objectScale);
						let maxTextureSize = renderer.capabilities?.maxTextureSize ?? Infinity;
						renderer.getDrawingBufferSize(canvasSize);
						return Math.min(
							Math.max(
								(objectScale.x / distance) * (canvasSize.x / textureSize.x),
								(objectScale.y / distance) * (canvasSize.y / textureSize.y),
							),
							maxTextureSize / textureSize.x,
							maxTextureSize / textureSize.y,
						);
					}
				}
				return 0;
			});
		})();

		Object.defineProperties(this, {
			width: {
				get: getWidth,
			},
			height: {
				get: getHeight,
			},
			pixelRatio: {
				get() {
					return pixelRatio;
				},
				set: setPixelRatio,
			},
			needsRedraw: {
				set(value) {
					if (value) {
						needsRedraw = true;
						drawable = null;
					}
				},
			},
		});
		Object.assign(this, {
			redraw() {
				if (needsRedraw) {
					let canvas = this.image;
					let ctx = canvas.getContext('2d');
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					canvas.width = getTextureWidth();
					canvas.height = getTextureHeight();
					if (canvas.width && canvas.height) {
						ctx.save();
						ctx.scale(canvas.width / getWidth(), canvas.height / getHeight());
						draw(ctx);
						ctx.restore();
					} else {
						canvas.width = canvas.height = 1;
					}
					needsRedraw = false;
					this.needsUpdate = true;
				}
			},

			setOptimalPixelRatio(...args) {
				setPixelRatio(computeOptimalPixelRatio(...args));
			},
		});
	}
};

Class.prototype.isDynamicTexture = true;

export default Class;
