# THREE.TextTexture

A texture for writing text on the canvas. 

## dependencies

- [THREE](https://github.com/mrdoob/three.js)

## members

`.constructor({text = '', fontSize = 16, fontFamily = 'sans-serif', ...rest})`

| option | description |
| ---: | :--- |
| `text` | The text to write on the canvas. |
| `fontSize` | The size of the font in pixels. |
| `fontFamily` | The family of the font. |
| `rest` | Additional options to pass to the [superclass constructor](https://threejs.org/docs/index.html#api/textures/Texture). Possible options are `mapping`, `wrapS`, `wrapT`, `magFilter`, `minFilter`, `format`, `type` and `anisotropy`. |

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

`.text`

The text to write on the canvas.

Changing the value of this property will cause/lead the redrawing of the underlying canvas.

---

`.fontSize`

The size of the font in pixels.

Changing this property changes the image.

---

`.fontFamily`

The family of the font.

Changing this property changes the image.

---

`.aspectRatio`

*read-only*

The width of the canvas devided by the height of the canvas.
