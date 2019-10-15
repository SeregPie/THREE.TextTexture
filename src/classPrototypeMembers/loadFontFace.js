import CSS_font from '../core/CSS/font';

export default function(family, style, variant, weight) {
	let font = CSS_font(family, 1, style, variant, weight);
	return document.fonts.load(font);
}
