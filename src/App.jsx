import { useEffect, useState } from "react";
import "./App.css";
import CustomerRewards from "./components/CustomerRewards";
import { fetchTransactionData } from "./services/transactions";
import { getRewardsForCustomers } from "./utils/rewardCalculator";

/**
 * App Component
 * - Fetches the transaction data
 * - Passes calculated rewards data to CustomerRewards component for displaying in the UI
 */
function App() {
	const [customerRewards, setCustomerRewards] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Fetching transaction records and proccessing data to calculate rewards for customers
	useEffect(() => {
		setLoading(true);

		fetchTransactionData()
			.then((data) => data.json())
			.then((transactionsData) => {
				const rewardData = getRewardsForCustomers(transactionsData); // calculate rewards for customer
				setCustomerRewards(rewardData);
			})
			.catch((err) => {
				console.log("Error while fetching transactions data", err);
				setError("Failed to fetch transactions data");
			})
			.finally(() => setLoading(false));
	}, []);

	return (
		<div className="app">
			<h1>Retail Reward Program</h1>

			{loading && <p>Loading...</p>}
			{error && <p>{error}</p>}

			{customerRewards &&
				customerRewards.map((customer) => (
					<CustomerRewards key={customer.customerId} customer={customer} />
				))}
		</div>
	);
}

export default App;
