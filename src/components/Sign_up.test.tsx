// <<<<<<< HEAD
// // import { expect, test } from "vitest";
// // import SignUp from "./Sign_up";
// // import { render, screen, fireEvent } from "@testing-library/react";

// // test("Password And Confirm Password is ecooil", () => {
// //   render(<SignUp />);

 
// //   const userEmail = "test@example.com";
// //   const password = "password123";
// =======
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import {expect, test} from 'vitest';
// import SignUp from "./Sign_up";
// import '@testing-library/jest-dom';

// test("renders SignUp component", () => {
//   render(<SignUp />);
//   const emailInput = screen.getByLabelText(/enter your email/i);
//   const passwordInput = screen.getByLabelText(/password/i);
//   const confirmPasswordInput = screen.getByLabelText(/password confirmation/i);
//   const signUpButton = screen.getByRole("button", { name: /sign up/i });

//   expect(emailInput).toBeInTheDocument();
//   expect(passwordInput).toBeInTheDocument();
//   expect(confirmPasswordInput).toBeInTheDocument();
//   expect(signUpButton).toBeInTheDocument();
// });

// test("submits the form and displays success message", async () => {
//   render(<SignUp />);

//   const emailInput = screen.getByLabelText(/enter your email/i);
//   const passwordInput = screen.getByLabelText(/password/i);
//   const confirmPasswordInput = screen.getByLabelText(/password confirmation/i);
//   const signUpButton = screen.getByRole("button", { name: /sign up/i });
// >>>>>>> d1824dfbf49dfae9292eb91d4e536c911f1f57a7

//   fireEvent.change(emailInput, { target: { value: "test@example.com" } });
//   fireEvent.change(passwordInput, { target: { value: "password123" } });
//   fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });

// <<<<<<< HEAD
// //   const emailInput = screen.getByLabelText("Enter Your Email") as HTMLInputElement;
// //   const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
// //   const confirmPasswordInput = screen.getByLabelText("Confirm Password") as HTMLInputElement;
// =======
//   fireEvent.click(signUpButton);
// >>>>>>> d1824dfbf49dfae9292eb91d4e536c911f1f57a7

//   await waitFor(() => {
//     const successMessage = screen.getByText(/registration successful/i);
//     expect(successMessage).toBeInTheDocument();
//   });
// });

// <<<<<<< HEAD
// //   fireEvent.change(emailInput, { target: { value: userEmail } });
// //   fireEvent.change(passwordInput, { target: { value: password } });
// //   fireEvent.change(confirmPasswordInput, { target: { value: password } });

  
// //   expect(emailInput.value).toBe(userEmail);
// //   expect(passwordInput.value).toBe(password);
// //   expect(confirmPasswordInput.value).toBe(password);
// // });
// =======
// // import { render, screen, fireEvent } from "@testing-library/react";
// // import { test, describe, expect,it } from "vitest";
// // import SignUp from "./Sign_up";

// // describe('SignUp Component', () => {
// //   it('renders the SignUp component', () => {
// //     const { getByText, getByLabelText } = render(<SignUp />);

// //     // Example: Assert that a specific text or input label is present
// //     expect(getByText('Sign Up')).not.toBeNull();
// //     expect(getByLabelText(/Enter Your Email/i)).not.toBeNull();
// //   })});
// >>>>>>> d1824dfbf49dfae9292eb91d4e536c911f1f57a7
