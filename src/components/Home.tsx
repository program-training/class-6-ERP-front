// import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// interface HomeProps {
//   onLoginSuccess: () => void;
// }

interface FormData {
  username: string;
  password: string;
}

const Home = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormData>();

  const handleLogin = (data: FormData) => {
    // אפשר להשתמש במידע בתוך data כאן לביצוע התחברות
    console.log('Form Data:', data);

    // כאן יש להוסיף בדיקות ופעולות התחברות מוצלחת
    // לדוג', אם ההתחברות מוצלחת:
    navigate('/Products');
    // אחרת, יש להציג הודעת שגיאה
  };

  return (
    <div>
      <h1>Welcome to Microservice Frontend</h1>
      <div>
        <button onClick={() => navigate('/Sign_up')}>Sign up</button>
        <form onSubmit={handleSubmit(handleLogin)}>
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
