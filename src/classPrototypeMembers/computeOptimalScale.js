import * as THREE from 'three';

let cameraPosition = new THREE.Vector3();
let objectPosition = new THREE.Vector3();
let objectScale = new THREE.Vector3();

export default function(object, renderer, camera, needsPowerOfTwo) {
	let {
		height,
		width,
	} = this;
	if (width && height) {
		let maxSize = (renderer.capabilities || {}).maxTextureSize || Infinity;
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
			let scale = objectScale.y * renderer.domElement.offsetHeight / distance / height;
			if (needsPowerOfTwo) {
				scale = THREE.Math.ceilPowerOfTwo(scale);
			}
			width *= scale;
			height *= scale;
			if (width > maxSize || height > maxSize) {
				scale *= maxSize / Math.max(width, height);
				if (needsPowerOfTwo) {
					scale = THREE.Math.floorPowerOfTwo(scale);
				}
			}
			return scale;
		}
	}
	return 0;
}
