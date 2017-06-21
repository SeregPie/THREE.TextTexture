(function() {

	let fontStyleValues = ['normal', 'italic', 'oblique'];
	let fontVariantValues = ['normal', 'small-caps'];
	let fontWeightValues = ['normal', 'bold'];
	let fontFamilyValues = [
		'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Georgia',
		'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana',
		'serif', 'sans-serif', 'monospace',
	];

	let n = 1;

	let renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor(0x000000);
	document.body.appendChild(renderer.domElement);

	let scene = new THREE.Scene();

	let camera = new THREE.PerspectiveCamera(75, 1);
	camera.position.set(0, 0, 3*n);

	let texture = new THREE.TextTexture({
		text: 'Yes, No, Maybe So.',
		fontStyle: fontStyleValues[0],
		fontVariant: fontVariantValues[0],
		fontWeight: fontWeightValues[0],
		fontSize: 64,
		fontFamily: fontFamilyValues[0],
	});
	let material = new THREE.SpriteMaterial({map: texture, color: 0xffffff});
	let sprite = new THREE.Sprite(material);
	scene.add(sprite);

	let updateSpriteScale = function() {
		sprite.scale.set(material.map.aspect, 1, 1).multiplyScalar(n);
	};

	let render = function() {
		updateSpriteScale();
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
	gui.add(texture, 'fontSize', 0, 256).step(1);
	gui.add(texture, 'fontFamily', fontFamilyValues);
	gui.add(texture, 'padding', 0, 1).step(1/100);

	let TextInput = document.getElementById('TextInput');
	TextInput.value = texture.text;
	TextInput.addEventListener('input', function() {
		texture.text = this.value;
	});

})();