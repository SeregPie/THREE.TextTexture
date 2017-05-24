# THREE.TextTexture

`class THREE.TextTexture extends THREE.Texture`

An instance of `TextTexture` is a texture for writing text on the canvas.

## dependencies

- [THREE](https://github.com/mrdoob/three.js)

## members

`.constructor({text, fontSize, fontFamily, lineHeight, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy})`

```javascript

let texture = new THREE.TextTexture({
  text: 'Carpe Diem',
  fontSize: 32,
  fontFamily: '"Times New Roman", Times, serif',
});
let material = new THREE.SpriteMaterial({map: texture, color: 0xffffbb});
let sprite = new THREE.Sprite(material);
sprite.scale.setX(texture.aspect).multiplyScalar(10);
scene.add(sprite);

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

`.lineHeight = 3/2`

The height of a text line.

Changing the value will redraw the canvas.

---

`.aspect`

*read-only*

The width of the canvas devided by the height. If the width or the height is 0, the value is 1.

---

`.blank`

*read-only*

The value is `true`, if the image is blank.

## see also

- [THREE.TextSprite](https://github.com/SeregPie/THREE.TextSprite)
