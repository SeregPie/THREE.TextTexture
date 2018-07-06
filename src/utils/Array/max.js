export default function(array) {
	if (array.length > 0) {
		return array.reduce((maxValue, value) => Math.max(maxValue, value));
	}
}
