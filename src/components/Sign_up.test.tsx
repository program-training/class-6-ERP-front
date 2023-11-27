// import { test, expect } from 'vitest';
// import SignUp from './Sign_up';

// describe('SignUp Component', () => {
//   it('renders without crashing', () => {
//     const wrapper: any = test(SignUp);
//     expect(wrapper).toBeTruthy();
//   });

  // If you're not using the form submission test for now, remove it.
  // it('handles form submission', async () => {
  //   const wrapper: any = test(SignUp);

  //   // Mocking the useNavigate function
  //   const mockNavigate = jest.fn();
  //   jest.mock('react-router-dom', () => ({
  //     ...jest.requireActual('react-router-dom'),
  //     useNavigate: () => mockNavigate,
  //   }));

  //   // Simulate form submission
  //   await wrapper.find('form').trigger('submit', {
  //     target: {
  //       elements: {
  //         email: { value: 'test@example.com' },
  //         password: { value: 'password123' },
  //         confirmPassword: { value: 'password123' },
  //       },
  //     },
  //   });

  //   expect(mockNavigate).toHaveBeenCalledWith('/Products');
  // });
// });