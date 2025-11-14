import { render, screen } from "@testing-library/react";
import Auth from "../pages/Auth";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

describe("Auth Component", () => {
  it("should have a generic email placeholder", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Auth />
        </AuthProvider>
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText("name@example.com");
    expect(emailInput).toBeInTheDocument();
  });
});
