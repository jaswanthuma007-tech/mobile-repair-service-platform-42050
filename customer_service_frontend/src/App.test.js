import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders customer portal navigation", () => {
  render(<App />);
  expect(screen.getByText(/Customer Portal/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Book Repair/i })).toBeInTheDocument();
});
