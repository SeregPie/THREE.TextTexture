# THREE.TextTexture

`class THREE.TextTexture extends THREE.Texture`

An instance of `TextTexture` is a texture with the drawn text.

## setup

### npm

```shell
npm i @seregpie/three.text-texture
```

### ES module

```javascript
import TextTexture from '@seregpie/three.text-texture';
```

### browser

```html
<script src="https://unpkg.com/three"></script>
<script src="https://unpkg.com/@seregpie/three.text-texture"></script>
```

The class is globally available as `THREE.TextTexture`.

## usage

```javascript
let texture = new THREE.TextTexture({
  fillStyle: '#24ff00',
  fontFamily: '"Times New Roman", Times, serif',
  fontSize: 32,
  fontStyle: 'italic',
  text: [
    'Twinkle, twinkle, little star,',
    'How I wonder what you are!',
    'Up above the world so high,',
    'Like a diamond in the sky.',
  ].join('\n'),
});
let material = new THREE.SpriteMaterial({map: texture});
let sprite = new THREE.Sprite(material);
let spriteScale = 10;
await texture.redraw();
sprite.scale
  .set(texture.image.width / texture.image.height, 1, 1)
  .multiplyScalar(spriteScale);
scene.add(sprite);
```

---

Update the texture.

```javascript
texture.fontFamily = 'Arial, Helvetica, sans-serif';
texture.text = [
  'When this blazing sun is gone,',
  'When he nothing shines upon,',
  'Then you show your little light,',
  'Twinkle, twinkle, through the night.',
].join('\n');
await texture.redraw();
sprite.scale
  .set(texture.image.width / texture.image.height, 1, 1)
  .multiplyScalar(spriteScale);
```

## members

### constructor

```
new THREE.TextTexture({
  align: 'center',
  createCanvas() { /*...*/ },
  fillStyle: '#fff',
  fontFamily: 'sans-serif',
  fontSize: 16,
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 'normal',
  lineGap: 0.15,
  loadFontFace(family, style, variant, weight) { /*...*/ },
  padding: 0.25,
  strokeStyle: '#000',
  strokeWidth: 0,
  text: '',
})
```

| argument | description |
| ---: | :--- |
| `align` | The horizontal text alignment. Possible values are `'center'`, `'left'` and `'right'`. |
| `createCanvas` | A function to create a new `Canvas` instance. |
| `fillStyle` | The fill color or style. |
| `fontFamily` | The font family. |
| `fontSize` | The font size. |
| `fontStyle` | The font style. |
| `fontVariant` | The font variant. |
| `fontWeight` | The font weight. |
| `lineGap` | The vertical distance between the text lines. The value is relative to the font size. |
| `loadFontFace` | A function to load a font face. |
| `padding` | The space around the text. The value is relative to the font size. |
| `strokeStyle` | The stroke color or style. |
| `strokeWidth` | The stroke width. The value is relative to the font size. |
| `text` | The text. |

---

Provide a custom `loadFontFace` function to support the older browsers.

```javascript
loadFontFace(family, style, variant, weight) {
  return (new FontFaceObserver(family, {style, weight})).load();
}
```

### properties

`.isTextTexture = true`

Used to check whether this is an instance of `TextTexture`.

---

`.text`

`.fontFamily`

`.fontSize`

`.fontWeight`

`.fontVariant`

`.fontStyle`

`.fillStyle`

`.strokeWidth`

`.strokeStyle`

`.align`

`.lineGap`

`.padding`

`.createCanvas`

`.loadFontFace`

---

`.lines`

*read-only*

The text splitted by the newline character.

---

`.height`

*read-only*

The image height. The value is relative to the font size.

### methods

`.redraw()`

Waits until the image is redrawn. The method is throttled and is called when the dependent properties are changed.

Returns a `Promise` that resolves when the image is redrawn.

---

`.computeOptimalFontSize(object, renderer, camera)`

Computes the optimal font size depending on the distance of the object to the camera and the size of the renderer DOM element.

| argument | description |
| ---: | :--- |
| `object` | An instance of `THREE.Object3D`. |
| `renderer` | An instance with a `domElement` property. |
| `camera` | An instance of `THREE.Camera`. |

Returns the computed font size.

## see also

- [THREE.TextSprite](https://github.com/SeregPie/THREE.TextSprite)
