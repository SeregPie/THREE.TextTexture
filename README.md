# THREE.TextTexture

`class THREE.TextTexture extends THREE.Texture`

An instance of `TextTexture` is a texture for writing text on the canvas.

## demo

[Try it out!](https://seregpie.github.io/THREE.TextTexture/)

## dependencies

- [THREE](https://github.com/mrdoob/three.js)

## setup

### npm

```shell
npm install three.texttexture
```

### browser

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

Text to write on the canvas.<br/>Changing the value will redraw the canvas if `autoRedraw` is `true`.

---

`.lines`

*read-only*

Text split by the new line character.

---

`.fontStyle = 'normal'`

Font style of the text. Possible values are `'normal'`, `'italic'` and `'oblique'`.<br/>Changing the value will redraw the canvas if `autoRedraw` is `true`.

---

`.fontVariant = 'normal'`

Font variant of the text. Possible values are `'normal'` and `'small-caps'`.<br/>Changing the value will redraw the canvas if `autoRedraw` is `true`.

---

`.fontWeight = 'normal'`

Font weight of the text. Possible values are `'normal'`, `'bold'`, `'bolder'`, `'lighter'` and `'100'` to `'900'`.<br/>Changing the value will redraw the canvas if `autoRedraw` is `true`.

---

`.fontSize = 16`

Font size of the text in pixels.<br/>Changing the value will redraw the canvas if `autoRedraw` is `true`.

---

`.fontFamily = 'sans-serif'`

Font family of the text.<br/>Changing the value will redraw the canvas if `autoRedraw` is `true`.

---

`.font`

*read-only*

Combined font properties.

---

`.textAlign = 'center'`

Horizontal alignment of the text lines. Possible values are `'center'`, `'left'` and `'right'`.<br/>Changing the value will redraw the canvas if `autoRedraw` is `true`.

---

`.lineHeight = 1.15`

Height of a text line. The pixels are calculated relative to the font size.<br/>Changing the value will redraw the canvas if `autoRedraw` is `true`.

---

`.padding = 0.25`

Space around the text inside the canvas. The pixels are calculated relative to the font size.<br/>Changing the value will redraw the canvas if `autoRedraw` is `true`.

---

`.redraw()`

Redraws the canvas.

---

`.autoRedraw = true`

If `false`, changing properties will **not** redraw the canvas.

Make use of it if you want to change multiple properties at once. This way you will avoid unnecessary `.redraw()` calls.

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

Width of the canvas devided by the height. If the width or the height is 0, the value will be 1.

## see also

- [THREE.TextSprite](https://github.com/SeregPie/THREE.TextSprite)
