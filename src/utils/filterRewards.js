/**
 * Filters reward keys by doing case-insensitive matching with search value
 * @param {string} searchValue text value that needs to be checked for filtering
 * @param {Object} rewards Object containing rewards data with Year-Month as keys
 * @return {Array} Filtered keys from rewards object that matches searchValue
 */
export const getFilteredMonthlyRewards = (searchValue, rewards) => {
	const rewardsKeys = Object.keys(rewards);

	return rewardsKeys.filter((monthKey) => {
		// constructing case-insensitive rewards data string to match with search value
		const rewardDataString = `${monthKey} ${rewards[monthKey]}`.toLowerCase();

		return rewardDataString.includes(searchValue.toLowerCase());
	});
};
