import { useState } from "react";
import { debounce } from "../utils/debounce";
import { getFilteredMonthlyRewards } from "../utils/filterRewards";

/**
 * MonthlyReward Component
 * - receives monthly rewards data for customer
 * - displays monthly rewards in table
 * - search bar to filter records in rewards table
 */
function MonthlyReward({ rewards }) {
	const [searchBarValue, setBarSearchValue] = useState("");
	const [rewardRows, setRewardRows] = useState(Object.keys(rewards)); // Rewards object keys for rows

	// Function to update search text value
	const handleSearchValueChange = (searchValue) => {
		setBarSearchValue(searchValue);
		filterRows(searchValue);
	};

	const filterRows = debounce((searchString) => {
		// set rows to initial when searchString is empty
		if (searchString === "") {
			setRewardRows(Object.keys(rewards));
			return;
		}

		// Updating filtered reward keys for table rows based of searchString
		const filteredRewardRows = getFilteredMonthlyRewards(searchString, rewards);
		setRewardRows(filteredRewardRows);
	});

	return (
		<>
			<input
				className="reward-searchbar"
				type="text"
				placeholder="Start typing to filter rows"
				value={searchBarValue}
				onChange={(e) => handleSearchValueChange(e.target.value)}
			/>

			<div className="reward-content">
				<table className="monthly-reward-table">
					<thead>
						<tr>
							<th>Month</th>
							<th>Points</th>
						</tr>
					</thead>
					<tbody>
						{rewardRows.map((rewardMonthYear) => (
							<tr key={rewardMonthYear}>
								<td>{rewardMonthYear}</td>
								<td>{rewards[rewardMonthYear]}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default MonthlyReward;
