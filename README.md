# THREE.TextTexture

`class THREE.TextTexture extends THREE.Texture`

An instance of `TextTexture` is a texture for writing text on the canvas.

## demo

[Try it out!](https://seregpie.github.io/THREE.TextTexture/)

## dependencies

- [THREE](https://github.com/mrdoob/three.js)

## setup

Install the [package](https://www.npmjs.com/package/three.texttexture) via npm.

```sh

npm install three.texttexture

```

---

Include the code in your page via a CDN.

```html

<script src="https://unpkg.com/three"></script>
<script src="https://unpkg.com/three.texttexture"></script>

```

## members

`.constructor({autoRedraw, text, fontStyle, fontVariant, fontWeight, fontSize, fontFamily, textAlign, lineHeight, padding, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy})`

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

---

`.lines`

*read-only*

An array of the text split by the new line character.

---

`.fontStyle = 'normal'`

A string for the font style. Possible values are `'normal'`, `'italic'` and `'oblique'`.

---

`.fontVariant = 'normal'`

A string for the font variant. Possible values are `'normal'` and `'small-caps'`.

---

`.fontWeight = 'normal'`

A string for the font weight. Possible values are `'normal'`, `'bold'`, `'bolder'`, `'lighter'` and `'100'` to `'900'`.

---

`.fontSize = 16`

A number for the font size in pixels.

---

`.fontFamily = 'sans-serif'`

A string for the font family.

---

`.font`

*read-only*

A string for the combined font properties.

---

`.textAlign = 'center'`

A string for the horizontal alignment of the text lines. Possible values are `'center'`, `'left'` and `'right'`.

---

`.lineHeight = 1`

A number for the height of a text line. The pixels are calculated relative to the font size.

---

`.padding = 1/4`

A number for the space around the text of the canvas. The pixels are calculated relative to the font size.

---

`.text`
`.fontStyle`
`.fontVariant`
`.fontWeight`
`.fontSize`
`.fontFamily`
`.textAlign`
`.lineHeight`
`.padding`

Changing the value will redraw the canvas, if `autoRedraw` is `true`.

---

`.redraw()`

Redraws the canvas.

---

`.autoRedraw = true`

If `false`, changing properties will **not** redraw the canvas.

Make use of it, if you want change multiple properties at once. This way you will avoid unnecessary `.redraw()` calls.

```javascript

texture.autoRedraw = false;
texture.text = 'Memento Mori';
texture.fontWeight = 'bold';
texture.fontSize = 48;
texture.redraw();
texture.autoRedraw = true;

```

---

`.aspect`

*read-only*

The width of the canvas devided by the height. If the width or the height is 0, the value is 1.

## see also

- [THREE.TextSprite](https://github.com/SeregPie/THREE.TextSprite)
