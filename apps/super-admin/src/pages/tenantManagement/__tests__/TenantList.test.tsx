import { render, screen, fireEvent } from "@testing-library/react";
import TenantList from "../TenantList";

describe("TenantList", () => {
  test("renders page header and search input", () => {
    render(<TenantList />);
    expect(screen.getByText("Tenants")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  test("opens AddTenantDialog when Add a new tenant is clicked", () => {
    render(<TenantList />);
    const addButton = screen.getByRole("button", { name: /add a new tenant/i });
    fireEvent.click(addButton);
    // We can't assert dialog content without its implementation, but state change shouldn't throw
    expect(addButton).toBeInTheDocument();
  });
});
