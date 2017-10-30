export default function(array, iteratee) {
	let returns = -Infinity;
	array.forEach(value => {
		returns = Math.max(iteratee(value), returns);
	});
	return returns;
}