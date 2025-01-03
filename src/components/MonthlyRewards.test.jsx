import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MonthlyReward from "./MonthlyRewards";

describe("MonthlyRewards Component", () => {
	const mockRewards = {
		"October-2022": 100,
		"January-2023": 200,
		"March-2023": 225,
	};

	it("should display monthly rewards table with data", () => {
		render(<MonthlyReward rewards={mockRewards} />);

		expect(screen.getByText("Month")).toBeInTheDocument();
		expect(screen.getByText("Points")).toBeInTheDocument();

		expect(screen.getByText("October-2022")).toBeInTheDocument();
		expect(screen.getByText("January-2023")).toBeInTheDocument();
		expect(screen.getByText("100")).toBeInTheDocument();
		expect(screen.getByText("200")).toBeInTheDocument();
	});

	it("should filter table when value is typed in search bar", async () => {
		render(<MonthlyReward rewards={mockRewards} />);

		// 3 rows should be present before typing in search bar
		expect(screen.getByText("October-2022")).toBeInTheDocument();
		expect(screen.getByText("January-2023")).toBeInTheDocument();
		expect(screen.getByText("March-2023")).toBeInTheDocument();

		// Typing "2023" in search bar
		const searchBarInput = screen.getByRole("textbox");
		fireEvent.change(searchBarInput, { target: { value: "2023" } });

		// 2 rows should be present in search bar after typing
		await waitFor(() => {
			expect(screen.queryByText("October-2022")).toBeNull();
			expect(screen.getByText("January-2023")).toBeInTheDocument();
			expect(screen.queryByText("March-2023")).toBeInTheDocument();
		});
	});

	it("should display 0 rows in table when search text has no match", async () => {
		render(<MonthlyReward rewards={mockRewards} />);

		// 3 rows should be present before typing in search bar
		expect(screen.getByText("October-2022")).toBeInTheDocument();
		expect(screen.getByText("January-2023")).toBeInTheDocument();
		expect(screen.getByText("March-2023")).toBeInTheDocument();

		// Typing "2023" in search bar
		const searchBarInput = screen.getByRole("textbox");
		fireEvent.change(searchBarInput, { target: { value: "April" } });

		// 0 rows should be present in search bar after typing
		await waitFor(() => {
			expect(screen.queryByText("October-2022")).toBeNull();
			expect(screen.queryByText("January-2023")).toBeNull();
			expect(screen.queryByText("March-2023")).toBeNull();
		});
	});
});
