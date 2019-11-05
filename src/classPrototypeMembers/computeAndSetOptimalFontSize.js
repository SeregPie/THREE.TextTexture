export default function(...args) {
	this.fontSize = this.computeOptimalFontSize(...args);
}
