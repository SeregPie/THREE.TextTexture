# THREE.TextTexture





## dependencies

- [THREE](https://github.com/mrdoob/three.js)

## members

`.constructor({text = '', fontSize = 16, fontFace = 'sans-serif', ...rest})`

| option | description |
| ---: | :--- |
| `text` | ... |
| `fontSize` | The size of the font in pixels. |
| `fontFace` | ... |
| `rest` | Additional arguments to pass to super constructor: `mapping`, `wrapS`, `wrapT`, `magFilter`, `minFilter`, `format`, `type`, `anisotropy`. |

```javascript

let texture = new THREE.TextTexture({
  text: 'Carpe Diem',
  fontFace: '"Times New Roman", Times, serif',
  minFilter: THREE.LinearFilter,
});
let material = new THREE.SpriteMaterial({map: texture});
let sprite = new THREE.Sprite(material);

```

---

`.text`

Changing this property changes the image.

---

`.fontSize`

Changing this property changes the image.

---

`.fontFace`

Changing this property changes the image.

---

`.aspectRatio`

