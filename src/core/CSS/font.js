export default function(family, size, style, variant, weight)  {
	return [style, variant, weight, `${size}px`, family].join(' ');
}
