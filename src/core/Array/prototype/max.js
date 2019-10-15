export default function(that) {
	return that.reduce((r, n) => Math.max(r, n));
}
