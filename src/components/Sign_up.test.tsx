import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {expect, test} from 'vitest';
import SignUp from "./Sign_up";
import '@testing-library/jest-dom';

test("renders SignUp component", () => {
  render(<SignUp />);
  const emailInput = screen.getByLabelText(/enter your email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const confirmPasswordInput = screen.getByLabelText(/password confirmation/i);
  const signUpButton = screen.getByRole("button", { name: /sign up/i });

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(confirmPasswordInput).toBeInTheDocument();
  expect(signUpButton).toBeInTheDocument();
});

test("submits the form and displays success message", async () => {
  render(<SignUp />);

  const emailInput = screen.getByLabelText(/enter your email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const confirmPasswordInput = screen.getByLabelText(/password confirmation/i);
  const signUpButton = screen.getByRole("button", { name: /sign up/i });

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });

  fireEvent.click(signUpButton);

  await waitFor(() => {
    const successMessage = screen.getByText(/registration successful/i);
    expect(successMessage).toBeInTheDocument();
  });
});

// import { render, screen, fireEvent } from "@testing-library/react";
// import { test, describe, expect,it } from "vitest";
// import SignUp from "./Sign_up";

// describe('SignUp Component', () => {
//   it('renders the SignUp component', () => {
//     const { getByText, getByLabelText } = render(<SignUp />);

//     // Example: Assert that a specific text or input label is present
//     expect(getByText('Sign Up')).not.toBeNull();
//     expect(getByLabelText(/Enter Your Email/i)).not.toBeNull();
//   })});
