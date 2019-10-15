import Class from './Class';
import classPrototypeMembers from './classPrototypeMembers';

let {prototype} = Class;

Object.entries({
	_align: 'align',
	_fillStyle: 'fillStyle',
	_fontFamily: 'fontFamily',
	_fontSize: 'fontSize',
	_fontStyle: 'fontStyle',
	_fontVariant: 'fontVariant',
	_fontWeight: 'fontWeight',
	_lineGap: 'lineGap',
	_padding: 'padding',
	_strokeStyle: 'strokeStyle',
	_strokeWidth: 'strokeWidth',
	_text: 'text',
}).forEach(([privateProperty, publicProperty]) => {
	Object.defineProperty(prototype, publicProperty, {
		get() {
			return this[privateProperty];
		},
		set(value) {
			if (this[privateProperty] !== value) {
				this[privateProperty] = value;
				this.needsRedraw = true;
				this.redraw();
			}
		},
	});
});

Object.assign(prototype, classPrototypeMembers);

export default Class;
