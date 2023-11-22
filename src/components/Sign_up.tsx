import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// interface RegistrationProps {
//   onRegistrationSuccess: () => void;
// }

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
}

const Sign_up = ( ) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormData>();

  const handleRegistration = (data: FormData) => {
    // בדיקת עמיתות סיסמה וכל הפעולות הנדרשות ברישום
    console.log('Registration Data:', data);

    // אם הרישום מוצלח, יש להעביר אותך לדף "כניסה" או לבצע פעולות נוספות
    navigate('/Home');
  };

  return (
    <div>
      <h1>Registration Page</h1>
      <div>
        <button onClick={() => navigate('/')}>Go to Login</button>
        <form onSubmit={handleSubmit(handleRegistration)}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            {...register('username', { required: true })}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: true })}
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', {
            //   validate: (value) => value === getValue('password') || 'Passwords do not match',
            })}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Sign_up;
