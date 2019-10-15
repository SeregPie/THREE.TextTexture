import {
	Math as _Math,
	Vector3,
} from 'three';

let cameraPosition = new Vector3();
let objectPosition = new Vector3();
let objectScale = new Vector3();

export default function(object, renderer, camera) {
	let {height} = this;
	if (height) {
		let distance = object.getWorldPosition(objectPosition).distanceTo(camera.getWorldPosition(cameraPosition));
		if (camera.isPerspectiveCamera) {
			distance *= Math.tan(_Math.degToRad(camera.fov) / 2) * 2;
		}
		if (camera.isPerspectiveCamera || camera.isOrthographicCamera) {
			distance /= camera.zoom;
		}
		if (distance) {
			return Math.round(object.getWorldScale(objectScale).y * renderer.domElement.offsetHeight / distance / height);
		}
	}
	return 0;
}
