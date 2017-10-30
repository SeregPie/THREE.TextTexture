export default function(array, iteratee) {
	let returns = -Infinity;
	for (let value of array) {
		returns = Math.max(iteratee(value), returns);
	}
	return returns;
}