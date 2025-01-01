/**
 * CustomerRewards component
 * - Receives customer data
 * - Renders customer reward for each month and total reward
 */
function CustomerRewards({ customer }) {
	return (
		<div className="reward-card">
			<h2>{`${customer.customerId} - ${customer.customerName}`}</h2>

			<div className="reward-content">
				<table className="monthly-reward-table">
					<tr>
						<th>Month</th>
						<th>Points</th>
					</tr>
					{Object.keys(customer.monthlyRewards).map((month) => (
						<tr key={month}>
							<td>{month}</td>
							<td>{customer.monthlyRewards[month]}</td>
						</tr>
					))}
				</table>
			</div>

			<h3>Total Rewards: {customer.totalRewards}</h3>
		</div>
	);
}

export default CustomerRewards;
