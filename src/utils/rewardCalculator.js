/**
 * Group transactions by customerId and calculate reward points.
 * @param {Array} transactions Array of transactions .
 * @returns {Array} Array of customer objects with rewards
 */
export const getRewardsForCustomers = (transactions) => {
	// Calculating rewards points per transaction and grouping by customerId
	const rewardsByCustomer = transactions.reduce((customerRewards, transaction) => {
		const { customerId, transactionAmount, transactionDate, customerName } = transaction;

		const month = new Date(transactionDate).toLocaleString("default", { month: "long" });
		const year = new Date(transactionDate).getFullYear();
		const rewardMonthYear = `${month}-${year}`; //key for monthly rewards

		// Calculate reward points for the transaction
		const points = calculateRewardPoints(transactionAmount);

		// Initialize customer rewards if customerId is not present in reward
		if (!customerRewards[customerId]) {
			customerRewards[customerId] = {
				customerId,
				customerName,
				monthlyRewards: {},
				totalRewards: 0,
			};
		}

		// Initialize month reward if month is not present for the customerId
		if (!customerRewards[customerId].monthlyRewards[rewardMonthYear]) {
			customerRewards[customerId].monthlyRewards[rewardMonthYear] = 0;
		}

		// Updating rewards with calculated reward points for the transaction
		customerRewards[customerId].monthlyRewards[rewardMonthYear] += points;
		customerRewards[customerId].totalRewards += points;

		return customerRewards;
	}, {});

	return Object.values(rewardsByCustomer);
};

/**
 * Calculate reward points for the transaction.
 * @param {number} amount transaction amount.
 * @returns {number} reward points based on round off amount.
 */
export const calculateRewardPoints = (amount) => {
	const roundOffAmount = Math.round(amount);
	let points = 0;

	// 1 point for amount between $50 and $100
	if (roundOffAmount > 50 && roundOffAmount <= 100) {
		points += (roundOffAmount - 50) * 1;
	}

	// 2 points for amount above $100
	if (roundOffAmount > 100) {
		points += (roundOffAmount - 100) * 2 + 50; // 1 point for first $50 spent
	}

	return points;
};
