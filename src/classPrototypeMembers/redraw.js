import CSS_font from '../core/CSS/font';

export default function() {
	let {needsRedraw} = this;
	if (needsRedraw) {
		let {image} = this;
		if (image) {
			let {
				fontSize,
				height,
				width,
			} = this;
			let context = image.getContext('2d');
			context.clearRect(0, 0, image.width, image.height);
			width *= fontSize;
			height *= fontSize;
			if (width && height) {
				image.width = width;
				image.height = height;
				let {
					align,
					fillStyle,
					fontFamily,
					fontStyle,
					fontVariant,
					fontWeight,
					lineGap,
					lines,
					padding,
					strokeStyle,
					strokeWidth,
				} = this;
				padding += strokeWidth / 2;
				strokeWidth *= fontSize;
				lineGap *= fontSize;
				padding *= fontSize;
				context.font = CSS_font(fontFamily, fontSize, fontStyle, fontVariant, fontWeight);
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
		}
	}
}
