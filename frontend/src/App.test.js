import { render, screen } from "@testing-library/react";
import App from "./App";

test("redirects guests to login", async () => {
  render(<App />);
  expect(await screen.findByRole("button", { name: /sign in/i })).toBeInTheDocument();
});
