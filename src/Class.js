import {
	LinearFilter,
	Texture,
} from 'three';

import AsyncFunction_throttle from './core/AsyncFunction/throttle';

import _createCanvas from './classPrototypeMembers/createCanvas';
import _loadFontFace from './classPrototypeMembers/loadFontFace';
import _redraw from './classPrototypeMembers/redraw';

export default class extends Texture {
	constructor({
		align = 'center',
		createCanvas = _createCanvas,
		fillStyle = '#fff',
		fontFamily = 'sans-serif',
		fontSize = 16,
		fontStyle = 'normal',
		fontVariant = 'normal',
		fontWeight = 'normal',
		lineGap = 0.15,
		loadFontFace = _loadFontFace,
		padding = 0.25,
		strokeStyle = '#000',
		strokeWidth = 0,
		text = '',
	} = {}) {
		super(
			createCanvas(),
			undefined,
			undefined,
			undefined,
			LinearFilter,
			LinearFilter,
		);
		Object.assign(this, {
			_align: align,
			_fillStyle: fillStyle,
			_fontFamily: fontFamily,
			_fontSize: fontSize,
			_fontStyle: fontStyle,
			_fontVariant: fontVariant,
			_fontWeight: fontWeight,
			_lineGap: lineGap,
			_padding: padding,
			_strokeStyle: strokeStyle,
			_strokeWidth: strokeWidth,
			_text: text,
			createCanvas,
			loadFontFace,
			needsRedraw: true,
			redraw: AsyncFunction_throttle(_redraw, 1),
		});
		this.redraw();
	}

	get lines() {
		let {text} = this;
		return text ? text.split('\n') : [];
	}

	get height() {
		let {
			lineGap,
			lines,
			padding,
			strokeWidth,
		} = this;
		padding += strokeWidth / 2;
		let height = padding * 2;
		if (lines.length) {
			height += lines.length + lineGap * (lines.length - 1);
		}
		return height;
	}
}
