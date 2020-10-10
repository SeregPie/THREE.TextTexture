import {
	MathUtils,
	Texture,
	Vector3,
} from 'three';

export default class extends Texture {
	constructor() {
		super(document.createElement('canvas'));
		let pixelRatio = 1;
		let needsRedraw = true;
		let drawer = null;

		let getDrawer = (() => drawer || (drawer = this.createDrawer()));

		let getWidth = (() => getDrawer().width);
		let getHeight = (() => getDrawer().height);

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

		let getOptimalPixelRatio = (() => {
			let cameraPosition = new Vector3();
			let objectPosition = new Vector3();
			let objectScale = new Vector3();
			return (() => {
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
						drawer = null;
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
					ctx.save();
					ctx.scale(canvas.width / width, canvas.height / height);
					getDrawer().draw(ctx);
					ctx.restore();
					needsRedraw = false;
					this.needsUpdate = true;
				}
			},
			setOptimalPixelRatio(...args) {
				setPixelRatio(getOptimalPixelRatio(...args));
			},
		});
	}
}
