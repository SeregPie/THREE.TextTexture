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
  colo: '#24ff00',
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
texture.redraw();
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
texture.redraw();
sprite.scale
  .set(texture.image.width / texture.image.height, 1, 1)
  .multiplyScalar(spriteScale);
```

## members

### constructor

```
new THREE.TextTexture({
  align: 'center',
  fillStyle: '#fff',
  fontFamily: 'sans-serif',
  fontSize: 16,
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 'normal',
  lineGap: 0.15,
  padding: 0.25,
  strokeStyle: '#000',
  strokeWidth: 0,
  text: '',
})
```

| argument | description |
| ---: | :--- |
| `align` | The horizontal text alignment. Possible values are `'center'`, `'left'` and `'right'`. |
| `fillStyle` | The fill color or style. |
| `fontFamily` | The font family. |
| `fontSize` | The font size. |
| `fontStyle` | The font style. |
| `fontVariant` | The font variant. |
| `fontWeight` | The font weight. |
| `lineGap` | The vertical distance between the text lines. The value is relative to the font size. |
| `padding` | The space around the text. The value is relative to the font size. |
| `strokeStyle` | The stroke color or style. |
| `strokeWidth` | The stroke width. The value is relative to the font size. |
| `text` | The text. |

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

---

`.lines`

*read-only*

The text splitted by the newline character.

---

`.width`

*read-only*

The width. The value is relative to the font size.

---

`.height`

*read-only*

The height. The value is relative to the font size.

### methods

`.redraw()`

Redraws the image.

---

`.computeOptimalFontSize(object, renderer, camera, needsPowerOfTwo = false)`

Computes the optimal font size depending on the distance of the object to the camera and the size of the renderer DOM element.

| argument | description |
| ---: | :--- |
| `object` | An instance of `THREE.Object3D`. |
| `renderer` | An instance with a `domElement` property. |
| `camera` | An instance of `THREE.Camera`. |
| `needsPowerOfTwo` | If `true`, the font size is rounded to the power of two. |

Returns the computed font size.

---

`.computeAndSetOptimalFontSize(...args)`

Sets `fontSize` to the value returned by the function `computeOptimalFontSize`.

## see also

- [THREE.TextSprite](https://github.com/SeregPie/THREE.TextSprite)
