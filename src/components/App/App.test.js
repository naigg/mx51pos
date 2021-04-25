import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders title", () => {
  render(<App />);
  const titleElement = screen.getByText(/Cali Burgers/i);
  expect(titleElement).toBeInTheDocument();
});

test("renders pay button", () => {
  render(<App />);
  const payElement = screen.getByText(/Pay/i);
  expect(payElement).toBeInTheDocument();
});

test("renders order summary", () => {
  render(<App />);
  const orderSummaryElement = screen.getByText(/Order Summary/i);
  expect(orderSummaryElement).toBeInTheDocument();
});
