# THREE.TextTexture

`class THREE.TextTexture extends THREE.CanvasTexture`

A texture with the drawn text.

## setup

### npm

```shell
npm i @seregpie/three.text-texture
```

---

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
  alignment: 'left',
  color: '#24ff00',
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
texture.redraw();
sprite.scale.setY(texture.height / texture.width);
scene.add(sprite);
```

---

Update the texture.

```javascript
texture.fontFamily = 'Arial, Helvetica, sans-serif';
texture.fontStyle = 'normal';
texture.text = [
  'When this blazing sun is gone,',
  'When he nothing shines upon,',
  'Then you show your little light,',
  'Twinkle, twinkle, through the night.',
].join('\n');
texture.redraw();
sprite.scale.setY(texture.height / texture.width);
```

## members

### constructor

```
new THREE.TextTexture({
  alignment: 'center',
  color: '#fff',
  fontFamily: 'sans-serif',
  fontSize: 1,
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 'normal',
  lineGap: 0.25,
  padding: 0.5,
  strokeColor: '#fff',
  strokeWidth: 0,
  text: '',
})
```

| argument | description |
| ---: | :--- |
| `alignment` | The horizontal text alignment. Possible values are `'center'`, `'left'` and `'right'`. |
| `color` | The color. |
| `fontFamily` | The font family. |
| `fontSize` | The font size. |
| `fontStyle` | The font style. |
| `fontVariant` | The font variant. |
| `fontWeight` | The font weight. |
| `lineGap` | The vertical distance between the text lines. The value is relative to the font size. |
| `padding` | The space around the text. The value is relative to the font size. |
| `strokeColor` | The stroke color. |
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

`.color`

`.strokeWidth`

`.strokeColor`

`.alignment`

`.lineGap`

`.padding`

---

`.font`

*read-only*

The font specification using the CSS value syntax.

---

`.width`

*read-only*

The width of the image.

---

`.height`

*read-only*

The height of the image.

---

`.pixelRatio = 1`

The pixel ratio of the image.

### methods

`.redraw()`

Redraws the image.

---

`.checkFontFace()`

Checks whether the font face has been loaded and is available.

Returns a boolean.

---

`.loadFontFace()`

Forces the font face to be loaded.

Returns a promise.

---

`.setOptimalPixelRatio(object, renderer, camera)`

Set the optimal pixel ratio depending on the distance of the object to the camera and the size of the renderer DOM element.

| argument | description |
| ---: | :--- |
| `object` | An instance of `THREE.Object3D`. |
| `renderer` | A renderer. |
| `camera` | An instance of `THREE.Camera`. |

## see also

- [THREE.TextSprite](https://github.com/SeregPie/THREE.TextSprite)
- [THREE.TextPlane](https://github.com/SeregPie/THREE.TextPlane)
