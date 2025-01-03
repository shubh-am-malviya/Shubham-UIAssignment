import { render, screen } from "@testing-library/react";
import CustomerRewards from "./CustomerRewards";

describe("CustomerRewards component", () => {
	const mockCustomerProp = {
		customerId: 1,
		customerName: "Dave",
		monthlyRewards: {
			"October-2024": 117,
			"December-2024": 31,
		},
		totalRewards: 148,
	};

	it("should display customer ID and name as heading", () => {
		const cutomerHeading = "1 - Dave";
		render(<CustomerRewards customer={mockCustomerProp} />);

		expect(screen.getByText(cutomerHeading)).toBeInTheDocument();
	});

	it("should display correct total rewards for customer", () => {
		render(<CustomerRewards customer={mockCustomerProp} />);
		expect(screen.getByText("Total Rewards: 148"));
	});
});
