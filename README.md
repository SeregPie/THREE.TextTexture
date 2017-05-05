# THREE.TextTexture

A `TextTexture` object is a texture for writing text on its canvas.

## dependencies

- [THREE](https://github.com/mrdoob/three.js)

## members

`.constructor({text, fontSize, fontFamily, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy})`

```javascript

let texture = new THREE.TextTexture({
  text: 'Carpe Diem',
  fontFamily: '"Times New Roman", Times, serif',
  minFilter: THREE.LinearFilter,
});
let material = new THREE.SpriteMaterial({map: texture});
let sprite = new THREE.Sprite(material);
sprite.scale.set(texture.aspectRatio, 1, 1).multiplyScalar(128);

```

---

`.text = ''`

The text to write on the canvas.

Changing the value will redraw the canvas.

---

`.fontSize = 16`

The size of the font in pixels.

Changing the value will redraw the canvas.

---

`.fontFamily = 'sans-serif'`

The family of the font.

Changing the value will redraw the canvas.

---

`.aspectRatio`

*read-only*

The width of the canvas devided by the height of the canvas.
