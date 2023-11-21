import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

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

  // הפונקציה לבדיקת תקינות סיסמה
  const isPasswordValid = (password: string) => {
    // כאן ניתן להוסיף כללים לבדיקת תקינות הסיסמה
    return password.length >= 8; // לדוג, הסיסמה צריכה להכיל לפחות 8 תווים
  };

  const handleRegistration = async (data: FormData) => {
    console.log(data);
    
    const { password } = data;

    // בדיקת עמיתות סיסמה
    if (!isPasswordValid(password)) {
      console.error('Password is not valid');
      // כאן ניתן להציג הודעת שגיאה למשתמש או לבצע פעולות נוספות
      return;
    }

    try {
      // שליחת בקשה לשרת עם נתונים בפורמט JSON
      const response = await axios.post('http://localhost:8200/api/users/register', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      

      // כאן יש לבדוק את התשובה מהשרת ולפעול בהתאם
      if (response.status === 200) {
        // רישום מוצלח
        console.log('Registration successful');
        navigate('/');
      } else {
        // רישום נכשל
        console.error('Registration failed');
        // ניתן להציג הודעת שגיאה או לקבוע משתנה ב-state המציין שהרישום נכשל
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // ניתן להציג הודעת שגיאה או לקבוע משתנה ב-state המציין שהתרחשה טעות
    }  };

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
