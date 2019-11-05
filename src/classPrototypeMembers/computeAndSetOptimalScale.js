export default function(...args) {
	this.scale = this.computeOptimalScale(...args);
}
