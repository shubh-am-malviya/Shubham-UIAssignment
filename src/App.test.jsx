import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { fetchTransactionData } from "./services/transactions";

vi.mock("./services/transactions");

describe("App Component", () => {
	it("should display heading on component mount", () => {
		// Mocking function with empty array result
		fetchTransactionData.mockResolvedValueOnce({ json: vi.fn().mockResolvedValue([]) });

		render(<App />);

		expect(screen.getByText("Retail Reward Program")).toBeInTheDocument();
	});

	it("should display loading text while fetching data", async () => {
		fetchTransactionData.mockResolvedValueOnce({ json: vi.fn().mockResolvedValue([]) });

		render(<App />);

		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("should display error test if fetching data fails", async () => {
		fetchTransactionData.mockResolvedValueOnce(new Error("Failed fetch"));

		render(<App />);

		// Waiting for async function call to complete
		await waitFor(() => expect(screen.getByText("Failed to fetch transactions data")).toBeInTheDocument());
	});

	it("should display customer content correctly when data is fetched successfully", async () => {
		const fakeTransactionsData = [
			{ customerId: 1, customerName: "Dave", transactionDate: "2024-10-01", transactionAmount: 120.55 },
			{ customerId: 1, customerName: "Dave", transactionDate: "2024-10-10", transactionAmount: 75.4 },
			{ customerId: 1, customerName: "Dave", transactionDate: "2024-12-10", transactionAmount: 80.85 },
		];

		const cutomerDisplayHeading = `1 - Dave`;

		fetchTransactionData.mockResolvedValueOnce({ json: vi.fn().mockResolvedValue(fakeTransactionsData) });

		render(<App />);

		await waitFor(() => {
			expect(screen.getByText(cutomerDisplayHeading)).toBeInTheDocument();

			expect(screen.getByText("October-2024")).toBeInTheDocument();
			expect(screen.getByText("117")).toBeInTheDocument();

			expect(screen.getByText("December-2024")).toBeInTheDocument();
			expect(screen.getByText("31")).toBeInTheDocument();

			expect(screen.getByText("Total Rewards: 148"));
		});
	});
});
