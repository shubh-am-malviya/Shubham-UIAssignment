/**
 * Simulate fetching transaction data from an API by using local json-server
 * @returns Promise containing the transaction data.
 */
export const fetchTransactionData = () => {
	return fetch("http://localhost:3000/transactions");
};
