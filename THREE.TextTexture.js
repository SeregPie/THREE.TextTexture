(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('three')) :
	typeof define === 'function' && define.amd ? define(['three'], factory) :
	(factory(global.THREE));
}(this, (function (THREE) { 'use strict';

THREE = THREE && THREE.hasOwnProperty('default') ? THREE['default'] : THREE;

var ctx = document.createElement('canvas').getContext('2d');

var Canvas_measureText = function(font, text) {
	ctx.font = font;
	return ctx.measureText(text);
};

var Array_max = function(array, iteratee) {
	if (array.length > 0) {
		return array.map(iteratee).reduce(function (previousValue, currentValue) { return Math.max(previousValue, currentValue); });
	}
};

var TextTexture = (function (superclass) {
	function TextTexture(ref) {
		if ( ref === void 0 ) ref = {};
		var autoRedraw = ref.autoRedraw; if ( autoRedraw === void 0 ) autoRedraw = true;
		var text = ref.text; if ( text === void 0 ) text = '';
		var fontStyle = ref.fontStyle; if ( fontStyle === void 0 ) fontStyle = 'normal';
		var fontVariant = ref.fontVariant; if ( fontVariant === void 0 ) fontVariant = 'normal';
		var fontWeight = ref.fontWeight; if ( fontWeight === void 0 ) fontWeight = 'normal';
		var fontSize = ref.fontSize; if ( fontSize === void 0 ) fontSize = 16;
		var fontFamily = ref.fontFamily; if ( fontFamily === void 0 ) fontFamily = 'sans-serif';
		var textAlign = ref.textAlign; if ( textAlign === void 0 ) textAlign = 'center';
		var lineHeight = ref.lineHeight; if ( lineHeight === void 0 ) lineHeight = 1;
		var padding = ref.padding; if ( padding === void 0 ) padding = 1/4;
		var magFilter = ref.magFilter; if ( magFilter === void 0 ) magFilter = THREE.LinearFilter;
		var minFilter = ref.minFilter; if ( minFilter === void 0 ) minFilter = THREE.LinearFilter;
		var mapping = ref.mapping;
		var wrapS = ref.wrapS;
		var wrapT = ref.wrapT;
		var format = ref.format;
		var type = ref.type;
		var anisotropy = ref.anisotropy;

		superclass.call(this, document.createElement('canvas'), mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
		this.autoRedraw = autoRedraw;
		this._text = text;
		this._fontStyle = fontStyle;
		this._fontVariant = fontVariant;
		this._fontWeight = fontWeight;
		this._fontSize = fontSize;
		this._fontFamily = fontFamily;
		this._textAlign = textAlign;
		this._lineHeight = lineHeight;
		this._padding = padding;
		/*
		this._lines = undefined;
		this._font = undefined;
		this._textBoxWidth = undefined;
		*/
		this.redraw();
	}

	if ( superclass ) TextTexture.__proto__ = superclass;
	TextTexture.prototype = Object.create( superclass && superclass.prototype );
	TextTexture.prototype.constructor = TextTexture;

	var prototypeAccessors = { text: { configurable: true },lines: { configurable: true },linesCount: { configurable: true },fontStyle: { configurable: true },fontVariant: { configurable: true },fontWeight: { configurable: true },fontSize: { configurable: true },fontFamily: { configurable: true },font: { configurable: true },textAlign: { configurable: true },lineHeight: { configurable: true },lineHeightInPixels: { configurable: true },textBoxWidthInPixels: { configurable: true },textBoxHeight: { configurable: true },textBoxHeightInPixels: { configurable: true },padding: { configurable: true },paddingInPixels: { configurable: true },paddingBoxWidthInPixels: { configurable: true },paddingBoxHeight: { configurable: true },paddingBoxHeightInPixels: { configurable: true },aspect: { configurable: true } };

	TextTexture.prototype.redraw = function redraw () {
		var this$1 = this;

		var ctx = this.image.getContext('2d');
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		if (this.textBoxWidthInPixels && this.textBoxHeightInPixels) {
			ctx.canvas.width = this.paddingBoxWidthInPixels;
			ctx.canvas.height = this.paddingBoxHeightInPixels;
			ctx.font = this.font;
			ctx.textBaseline = 'middle';
			ctx.fillStyle = 'white';
			var left;
			switch (this.textAlign) {
				case 'left':
					ctx.textAlign = 'left';
					left = this.paddingInPixels;
					break;
				case 'right':
					ctx.textAlign = 'right';
					left = this.paddingInPixels + this.textBoxWidthInPixels;
					break;
				case 'center':
					ctx.textAlign = 'center';
					left = this.paddingInPixels + this.textBoxWidthInPixels / 2;
					break;
			}
			var top = this.paddingInPixels + this.fontSize / 2;
			this.lines.forEach(function (line) {
				ctx.fillText(line, left, top);
				top += this$1.lineHeightInPixels;
			});
		} else {
			ctx.canvas.width = ctx.canvas.height = 1;
		}
		this.needsUpdate = true;
	};

	TextTexture.prototype._redrawIfAuto = function _redrawIfAuto () {
		if (this.autoRedraw) {
			this.redraw();
		}
	};

	prototypeAccessors.text.get = function () {
		return this._text;
	};

	prototypeAccessors.text.set = function (value) {
		if (this._text !== value) {
			this._text = value;
			this._lines = undefined;
			this._textBoxWidth = undefined;
			this._redrawIfAuto();
		}
	};

	TextTexture.prototype._computeLines = function _computeLines () {
		if (this.text) {
			return this.text.split('\n');
		}
		return [];
	};

	prototypeAccessors.lines.get = function () {
		if (this._lines === undefined) {
			this._lines = this._computeLines();
		}
		return this._lines;
	};

	prototypeAccessors.linesCount.get = function () {
		return this.lines.length;
	};

	prototypeAccessors.fontStyle.get = function () {
		return this._fontStyle;
	};

	prototypeAccessors.fontStyle.set = function (value) {
		if (this._fontStyle !== value) {
			this._fontStyle = value;
			this._font = undefined;
			this._textBoxWidth = undefined;
			this._redrawIfAuto();
		}
	};

	prototypeAccessors.fontVariant.get = function () {
		return this._fontVariant;
	};

	prototypeAccessors.fontVariant.set = function (value) {
		if (this._fontVariant !== value) {
			this._fontVariant = value;
			this._font = undefined;
			this._textBoxWidth = undefined;
			this._redrawIfAuto();
		}
	};

	prototypeAccessors.fontWeight.get = function () {
		return this._fontWeight;
	};

	prototypeAccessors.fontWeight.set = function (value) {
		if (this._fontWeight !== value) {
			this._fontWeight = value;
			this._font = undefined;
			this._textBoxWidth = undefined;
			this._redrawIfAuto();
		}
	};

	prototypeAccessors.fontSize.get = function () {
		return this._fontSize;
	};

	prototypeAccessors.fontSize.set = function (value) {
		if (this._fontSize !== value) {
			this._fontSize = value;
			this._font = undefined;
			this._textBoxWidth = undefined;
			this._redrawIfAuto();
		}
	};

	prototypeAccessors.fontFamily.get = function () {
		return this._fontFamily;
	};

	prototypeAccessors.fontFamily.set = function (value) {
		if (this._fontFamily !== value) {
			this._fontFamily = value;
			this._font = undefined;
			this._textBoxWidth = undefined;
			this._redrawIfAuto();
		}
	};

	TextTexture.prototype._computeFont = function _computeFont () {
		return [
			this.fontStyle,
			this.fontVariant,
			this.fontWeight,
			((this.fontSize) + "px"),
			this.fontFamily ].join(' ');
	};

	prototypeAccessors.font.get = function () {
		if (this._font === undefined) {
			this._font = this._computeFont();
		}
		return this._font;
	};

	prototypeAccessors.textAlign.get = function () {
		return this._textAlign;
	};

	prototypeAccessors.textAlign.set = function (value) {
		if (this._textAlign !== value) {
			this._textAlign = value;
			this._redrawIfAuto();
		}
	};

	prototypeAccessors.lineHeight.get = function () {
		return this._lineHeight;
	};

	prototypeAccessors.lineHeight.set = function (value) {
		if (this._lineHeight !== value) {
			this._lineHeight = value;
			this._redrawIfAuto();
		}
	};

	prototypeAccessors.lineHeightInPixels.get = function () {
		return this.fontSize * this.lineHeight;
	};

	TextTexture.prototype._computeTextWidthInPixels = function _computeTextWidthInPixels () {
		var this$1 = this;

		if (this.lines.length) {
			return Array_max(this.lines, function (line) { return Canvas_measureText(this$1.font, line).width; });
		}
		return 0;
	};

	prototypeAccessors.textBoxWidthInPixels.get = function () {
		if (this._textBoxWidth === undefined) {
			this._textBoxWidth = this._computeTextWidthInPixels();
		}
		return this._textBoxWidth;
	};

	prototypeAccessors.textBoxHeight.get = function () {
		return this.lineHeight * (this.linesCount - 1) + 1;
	};

	prototypeAccessors.textBoxHeightInPixels.get = function () {
		return this.fontSize * this.textBoxHeight;
	};

	prototypeAccessors.padding.get = function () {
		return this._padding;
	};

	prototypeAccessors.padding.set = function (value) {
		if (this._padding !== value) {
			this._padding = value;
			this._redrawIfAuto();
		}
	};

	prototypeAccessors.paddingInPixels.get = function () {
		return this.fontSize * this.padding;
	};

	prototypeAccessors.paddingBoxWidthInPixels.get = function () {
		return this.textBoxWidthInPixels + 2 * this.paddingInPixels;
	};

	prototypeAccessors.paddingBoxHeight.get = function () {
		return this.textBoxHeight + 2 * this.padding;
	};

	prototypeAccessors.paddingBoxHeightInPixels.get = function () {
		return this.textBoxHeightInPixels + 2 * this.paddingInPixels;
	};

	prototypeAccessors.aspect.get = function () {
		if (this.image.width && this.image.height) {
			return this.image.width / this.image.height;
		}
		return 1;
	};

	Object.defineProperties( TextTexture.prototype, prototypeAccessors );

	return TextTexture;
}(THREE.Texture));

THREE.TextTexture = TextTexture;

})));
