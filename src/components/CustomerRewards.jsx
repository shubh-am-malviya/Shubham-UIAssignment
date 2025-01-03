import MonthlyRewards from "./MonthlyRewards";

/**
 * CustomerRewards component
 * - Receives customer data
 * - Renders customer reward for each month and total reward
 */
function CustomerRewards({ customer }) {
	return (
		<div className="reward-card">
			<h2>{`${customer.customerId} - ${customer.customerName}`}</h2>
			<MonthlyRewards rewards={customer.monthlyRewards} />
			<h3>Total Rewards: {customer.totalRewards}</h3>
		</div>
	);
}

export default CustomerRewards;
