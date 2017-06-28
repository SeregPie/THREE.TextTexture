(function() {

	let fontStyleValues = ['normal', 'italic', 'oblique'];
	let fontVariantValues = ['normal', 'small-caps'];
	let fontWeightValues = ['normal', 'bold'];
	let fontFamilyValues = [
		'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Georgia',
		'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana',
		'serif', 'sans-serif', 'monospace',
	];
	let textAlignValues = ['center', 'left', 'right'];

	let n = 1;

	let renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor(0x333333);
	document.body.appendChild(renderer.domElement);

	let scene = new THREE.Scene();

	let camera = new THREE.PerspectiveCamera(75, 1);
	camera.position.set(0, 0, 3*n);

	let texture = new THREE.TextTexture({
		text: [
			'Twinkle, twinkle, little star,',
			'How I wonder what you are!',
			'Up above the world so high,',
			'Like a diamond in the sky.',
		].join('\n'),
		fontStyle: fontStyleValues[0],
		fontVariant: fontVariantValues[0],
		fontWeight: fontWeightValues[0],
		fontSize: 32,
		fontFamily: fontFamilyValues[0],
		textAlign: textAlignValues[0],
	});
	let material = new THREE.MeshBasicMaterial({
		map: texture,
		color: 0xff69b4,
		//transparent: true,
	});
	let geometry = new THREE.PlaneGeometry(n, n, n);
	let mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	let updateMeshScale = function() {
		mesh.scale.set(material.map.aspect, 1, 1);
	};

	let rotateMesh = (function() {
		let f = function(value, min, max, step) {
			return ((value < min || value > max) ? -1 : 1) * step;
		};
		let x = 1/1000;
		let y = 2/1000;
		let z = 3/1000;

		return function() {
			mesh.rotation.x += (x = f(mesh.rotation.x, -1/7, 1/3, x));
			mesh.rotation.y += (y = f(mesh.rotation.y, -1/7, 1/3, y));
			mesh.rotation.z += (z = f(mesh.rotation.z, -1/7, 1/3, z));
		};
	})();

	let render = function() {
		rotateMesh();
		updateMeshScale();
		renderer.setSize(document.body.clientWidth, document.body.clientHeight);
		camera.aspect = document.body.clientWidth / document.body.clientHeight;
		camera.updateProjectionMatrix();
		renderer.render(scene, camera);
	};

	window.addEventListener('resize', render, false);

	(function animate() {
		requestAnimationFrame(animate);
		render();
	})();

	let gui = new dat.GUI();
	gui.add(texture, 'fontStyle', fontStyleValues);
	gui.add(texture, 'fontVariant', fontVariantValues);
	gui.add(texture, 'fontWeight', fontWeightValues);
	gui.add(texture, 'fontSize', 0, 128).step(1);
	gui.add(texture, 'fontFamily', fontFamilyValues);
	gui.add(texture, 'textAlign', textAlignValues);
	gui.add(texture, 'lineHeight', 0, 3).step(1/20);
	gui.add(texture, 'padding', 0, 1).step(1/20);

	let TextInput = document.getElementById('TextInput');
	TextInput.value = texture.text;
	TextInput.addEventListener('input', function(event) {
		texture.text = this.value;
	});
	TextInput.addEventListener('keydown', function(event) {
		event.stopPropagation();
	});

})();