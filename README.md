# THREE.TextTexture

`class THREE.TextTexture extends THREE.Texture`

An instance of `TextTexture` is a texture for writing text on the canvas.

## dependencies

- [THREE](https://github.com/mrdoob/three.js)

## members

`.constructor({text, fontStyle, fontVariant, fontWeight, fontSize, fontFamily, padding, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy})`

```javascript

let texture = new THREE.TextTexture({
  text: 'Carpe Diem',
  fontStyle: 'italic',
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

A string for the text to write on the canvas.

Changing the value will redraw the canvas.

---

`.fontStyle = 'normal'`

A string for the font style. Possible values are `'normal'`, `'italic'` and `'oblique'`.

Changing the value will redraw the canvas.

---

`.fontVariant = 'normal'`

A string for the font variant. Possible values are `'normal'` and `'small-caps'`.

Changing the value will redraw the canvas.

---

`.fontWeight = 'normal'`

A string for the font weight. Possible values are `'normal'`, `'bold'`, `'bolder'`, `'lighter'` and `'100'` to `'900'`.

Changing the value will redraw the canvas.

---

`.fontSize = 16`

A number for the font size in pixels.

Changing the value will redraw the canvas.

---

`.fontFamily = 'sans-serif'`

A string for the font family.

Changing the value will redraw the canvas.

---

`.padding = 1/2`

A number for the space around the text of the canvas.

Changing the value will redraw the canvas.

---

`.aspect`

*read-only*

The width of the canvas devided by the height. If the width or the height is 0, the value is 1.

## see also

- [THREE.TextSprite](https://github.com/SeregPie/THREE.TextSprite)
