import { expect, test } from "vitest";
import SignUp from "./Sign_up";
import { render, screen, fireEvent } from "@testing-library/react";

test("Password And Confirm Password is ecooil", () => {
  render(<SignUp />);

 
  const userEmail = "test@example.com";
  const password = "password123";


  const emailInput = screen.getByLabelText("Enter Your Email") as HTMLInputElement;
  const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
  const confirmPasswordInput = screen.getByLabelText("Confirm Password") as HTMLInputElement;


  fireEvent.change(emailInput, { target: { value: userEmail } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.change(confirmPasswordInput, { target: { value: password } });

  
  expect(emailInput.value).toBe(userEmail);
  expect(passwordInput.value).toBe(password);
  expect(confirmPasswordInput.value).toBe(password);
});