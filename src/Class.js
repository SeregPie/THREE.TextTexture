import * as THREE from 'three';

import Array_prototype_max from './core/Array/prototype/max';
import CSS_font from './core/CSS/font';

export default class extends THREE.Texture {
	constructor({
		align = 'center',
		fillStyle = '#fff',
		fontFamily = 'sans-serif',
		fontSize = 16,
		fontStyle = 'normal',
		fontVariant = 'normal',
		fontWeight = 'normal',
		lineGap = 0.15,
		padding = 0.25,
		strokeStyle = '#000',
		strokeWidth = 0,
		text = '',
	} = {}) {
		super(
			document.createElement('canvas'),
			undefined,
			undefined,
			undefined,
			THREE.LinearFilter,
			THREE.LinearFilter,
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
			needsRedraw: true,
		});
	}

	get lines() {
		let {text} = this;
		return text ? text.split('\n') : [];
	}

	get textWidth() {
		let {
			fontFamily,
			fontStyle,
			fontVariant,
			fontWeight,
			lines,
		} = this;
		if (lines.length) {
			let canvas = document.createElement('canvas');
			let context = canvas.getContext('2d');
			context.font = CSS_font(fontFamily, 1, fontStyle, fontVariant, fontWeight);
			return Array_prototype_max(lines.map(text => context.measureText(text).width));
		}
		return 0;
	}

	get textHeight() {
		let {
			lineGap,
			lines,
		} = this;
		if (lines.length) {
			return lines.length + lineGap * (lines.length - 1);
		}
		return 0;
	}

	get width() {
		let {
			padding,
			strokeWidth,
			textWidth,
		} = this;
		padding += strokeWidth / 2;
		return padding * 2 + textWidth;
	}

	get height() {
		let {
			padding,
			strokeWidth,
			textHeight,
		} = this;
		padding += strokeWidth / 2;
		return padding * 2 + textHeight;
	}
}
