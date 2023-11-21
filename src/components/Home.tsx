import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface FormData {
  username: string;
  password: string;
}

const Home = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormData>();

  const handleLogin = async (data: FormData) => {
    console.log(data);
    
    try {
      // אם יש צורך בשליחת המידע בכל קריאה, ניתן להוסיף את המידע לתוך הפרמטר data
      const response = await axios.post('http://localhost:8200/api/users/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
            console.log(response);

      // כאן יש לבדוק את התשובה מהשרת ולפעול בהתאם
      if (response.status=== 200) {
        // התחברות מוצלחת
        console.log('Login successful');
        navigate('/Products');
      } else {
        // התחברות נכשלה
        console.error('Login failed');
        // אפשר להציג הודעת שגיאה או לקבוע משתנה ב-state המציין שההתחברות נכשלה
      }
    } catch (error) {
      console.error('Error during login:', error);
      // אפשר להציג הודעת שגיאה או לקבוע משתנה ב-state המציין שהתרחשה טעות
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <label>
          Username:
          <input type="text" {...register('username')} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" {...register('password')} />
        </label>
        <br />
        <button type="submit">Login</button>
        <button onClick={()=>{navigate('./Sign_up')}}>Sign_up</button>
      </form>
    </div>
  );
};

export default Home;
