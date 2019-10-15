import Array_prototype_max from '../core/Array/prototype/max';
import CSS_font from '../core/CSS/font';
import Promise_try from '../core/Promise/try';

export default function() {
	return Promise_try(() => {
		let {needsRedraw} = this;
		if (needsRedraw) {
			let {image} = this;
			if (image) {
				let {
					align,
					fillStyle,
					fontFamily,
					fontSize,
					fontStyle,
					fontVariant,
					fontWeight,
					height,
					lineGap,
					lines,
					loadFontFace,
					padding,
					strokeStyle,
					strokeWidth,
				} = this;
				return Promise_try(() => loadFontFace(
					fontFamily,
					fontStyle,
					fontVariant,
					fontWeight,
				)).then(() => {
					let context = image.getContext('2d');
					context.clearRect(0, 0, image.width, image.height);
					height *= fontSize;
					lineGap *= fontSize;
					padding *= fontSize;
					strokeWidth *= fontSize;
					padding += strokeWidth / 2;
					let font = CSS_font(fontFamily, fontSize, fontStyle, fontVariant, fontWeight);
					let width = padding * 2;
					if (lines.length) {
						context.font = font;
						width += Array_prototype_max(lines.map(text => context.measureText(text).width));
					}
					if (width && height) {
						image.width = width;
						image.height = height;
						context.font = font;
						let left;
						switch (align) {
							case 'left':
								context.textAlign = 'left';
								left = padding;
								break;
							case 'right':
								context.textAlign = 'right';
								left = width - padding;
								break;
							case 'center':
								context.textAlign = 'center';
								left = width / 2;
								break;
						}
						context.textBaseline = 'top';
						let top = padding;
						context.fillStyle = fillStyle;
						context.miterLimit = 1;
						context.lineWidth = strokeWidth;
						context.strokeStyle = strokeStyle;
						lines.forEach(text => {
							if (strokeWidth) {
								context.strokeText(text, left, top);
							}
							context.fillText(text, left, top);
							top += fontSize + lineGap;
						});
					} else {
						image.width = image.height = 1;
					}
					this.needsRedraw = false;
					this.needsUpdate = true;
				});
			}
		}
	});
}
