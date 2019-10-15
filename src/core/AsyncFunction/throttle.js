import Function_noop from '../Function/noop';
import Promise_delay from '../Promise/delay';
import Promise_try from '../Promise/try';

export default function(func, delay) {
	let queue = Promise.resolve();
	let currentPromise;
	let currentThis;
	let currentArgs;
	return function(...args) {
		return Promise_try(() => {
			currentThis = this;
			currentArgs = args;
			if (!currentPromise) {
				currentPromise = new Promise(resolve => {
					queue = queue
						.then(() => Promise_delay(delay))
						.then(() => {
							try {
								let promise = func.apply(currentThis, currentArgs);
								resolve(promise);
								return promise;
							} finally {
								currentPromise = null;
							}
						})
						.catch(Function_noop);
				});
			}
			return currentPromise;
		});
	};
}
