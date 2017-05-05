# THREE.TextTexture





## dependencies

- [THREE](https://github.com/mrdoob/three.js)

## members

`.constructor({text = '', fontSize = 16, fontFamily = 'sans-serif', ...rest})`

| option | description |
| ---: | :--- |
| `text` | The text that will be written on the canvas. |
| `fontSize` | The size of the font in pixels. |
| `fontFamily` | The family of the font in pixels. |
| `rest` | Additional arguments to pass to the super class constructor: `mapping`, `wrapS`, `wrapT`, `magFilter`, `minFilter`, `format`, `type`, `anisotropy`. |

```javascript

let texture = new THREE.TextTexture({
  text: 'Carpe Diem',
  fontFamily: '"Times New Roman", Times, serif',
  minFilter: THREE.LinearFilter,
});
let material = new THREE.SpriteMaterial({map: texture});
let sprite = new THREE.Sprite(material);

```

---

`.text`

Changing the value of this property will cause/lead the redrawing of the underlying image.

---

`.fontSize`

Changing this property changes the image.

---

`.fontFamily`

Changing this property changes the image.

---

`.aspectRatio`

