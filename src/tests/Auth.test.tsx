import { render, screen, fireEvent, act } from "@testing-library/react";
import Auth from "../pages/Auth";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { vi } from "vitest";

vi.mock("@/hooks/useAuth");

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
    },
  },
}));

describe("Auth Component", () => {
  it("should call signInWithEmail on form submission", async () => {
    const signInWithEmail = vi.fn().mockResolvedValue({ error: null });
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      loading: false,
      signInWithEmail,
      signInWithGoogle: vi.fn(),
      signInWithLinkedIn: vi.fn(),
      signUpWithEmail: vi.fn(),
      logout: vi.fn(),
      connectLinkedIn: vi.fn(),
      incrementApplications: vi.fn(),
    });

    render(
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const signInButton = screen.getByRole("button", { name: "Sign In" });

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });
      fireEvent.click(signInButton);
    });

    expect(signInWithEmail).toHaveBeenCalledWith("test@example.com", "password");
  });
});
