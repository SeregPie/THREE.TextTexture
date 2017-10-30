(function() {

	var fontStyleValues = ['normal', 'italic'];
	var fontVariantValues = ['normal', 'small-caps'];
	var fontWeightValues = ['normal', 'bold'];
	var fontFamilyValues = ['Finger Paint', 'Barrio', 'Fredericka the Great', 'Shadows Into Light', 'Quicksand'];
	var textAlignValues = ['center', 'left', 'right'];

	Promise
		.resolve()
		.then(function() {
			return Promise.all(fontFamilyValues.map(function(fontFamily) {
				return document.fonts.load(['1px', fontFamily].join(' '), 'a');
			}));
		})
		.catch(function() {
			// continue regardless of error
		})
		.then(function() {
			var n = 1;

			var renderer = new THREE.WebGLRenderer({antialias: true});
			renderer.setClearColor(0x588c7e);
			document.body.appendChild(renderer.domElement);

			var scene = new THREE.Scene();

			var camera = new THREE.PerspectiveCamera(75, 1);
			camera.position.set(0, 0, 3*n);

			var texture = new THREE.TextTexture({
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
			var material = new THREE.MeshBasicMaterial({
				map: texture,
				color: 0xf2e394,
				transparent: true,
			});
			var geometry = new THREE.PlaneGeometry(4*n, 4*n, 4*n);
			var mesh = new THREE.Mesh(geometry, material);
			scene.add(mesh);

			var updateMeshScale = function() {
				mesh.scale.set(1, 1/material.map.aspect, 1);
			};

			var rotateMesh = (function() {
				var f = function(value, min, max, step) {
					return ((value < min || value > max) ? -1 : 1) * step;
				};
				var x = 1/800;
				var y = 1/600;
				var z = 1/400;

				return function() {
					mesh.rotation.x += (x = f(mesh.rotation.x, -1/7, 1/3, x));
					mesh.rotation.y += (y = f(mesh.rotation.y, -1/7, 1/3, y));
					mesh.rotation.z += (z = f(mesh.rotation.z, -1/7, 1/3, z));
				};
			})();

			var renderScene = function() {
				rotateMesh();
				updateMeshScale();
				renderer.setSize(document.body.clientWidth, document.body.clientHeight);
				camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
				camera.updateProjectionMatrix();
				renderer.render(scene, camera);
			};

			window.addEventListener('resize', renderScene, false);

			var startToRenderScene = function() {
				setTimeout(function() {
					requestAnimationFrame(startToRenderScene);
				}, 1000/60);
				renderScene();
			};
			startToRenderScene();

			var gui = new dat.GUI();
			gui.add(texture, 'fontStyle', fontStyleValues);
			gui.add(texture, 'fontVariant', fontVariantValues);
			gui.add(texture, 'fontWeight', fontWeightValues);
			gui.add(texture, 'fontSize', 0, 128).step(1);
			gui.add(texture, 'fontFamily', fontFamilyValues);
			gui.add(texture, 'textAlign', textAlignValues);
			gui.add(texture, 'lineHeight', 0, 3).step(1/20);
			gui.add(texture, 'padding', 0, 1).step(1/20);
			gui.add(material, 'transparent');

			var TextInput = document.getElementById('TextInput');
			TextInput.value = texture.text;
			TextInput.addEventListener('input', function(event) {
				texture.text = this.value;
			});
			TextInput.addEventListener('keydown', function(event) {
				event.stopPropagation();
			});
		});

})();