/**
 * Returns debounced version of the provided function with the delay
 * @param {Function} func that is to be debounced
 * @return {Function} debounced function for func with the provided delay
 */
export const debounce = (func, delay = 500) => {
	let timer = null;

	return (...args) => {
		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			func(...args);
			timer = null;
		}, delay);
	};
};
