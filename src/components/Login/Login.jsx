import '../Regiter/Register.css';
import './Login.css';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Login ({ onLogin, errorMessage }) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { 
    register, 
    formState: { 
      errors, 
      isValid 
    }, 
    watch,

  } = useForm({ mode: 'onChange' });

  const handleSubmitForm = (e) => {
    e.preventDefault();
    onLogin(email, password);
  } 

  useEffect(() => {
    const subscription = watch(({emailLogin, passwordLogin}) => {
      setEmail(emailLogin);
      setPassword(passwordLogin);
      return () => {
        subscription.unsubscribe();
      }
    })
  }, [watch]);

  return (
    <main>
      <section className='register'>
        <div className='register__content'>
          <Link className='register__logo' to='/'></Link>
          <h1 className='register__greet'>Рады видеть!</h1>
          <form className='register__form' onSubmit={handleSubmitForm}>
            <div>
              <p className='register__form-name'>E-mail</p>
              <input 
                className='register__form-data' 
                type='email' 
                placeholder='E-mail' 
                value={email}
                {...register('emailLogin', {
                  required: 'Поле обязательно к заполнению',
                  minLength: {
                    value: 6,
                    message: 'Минимум 6 символов'
                  },
                  maxLength: {
                    value: 80,
                    message: 'Максимум 80 символов'
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
                    message: 'Введите валидный e-mail'
                  },
                })}  
              />
              <div className='register__span'>{errors?.emailLogin && <p className='register__form-error'>{
              errors?.emailLogin?.message || 'Что-то пошло не так...'}</p>}</div>
            </div>
            
            <div>
              <p className='register__form-name'>Пароль</p>
              <input 
                className='register__form-data' 
                type='password' 
                placeholder='Пароль' 
                autoComplete='off'
                value={password}
                {...register('passwordLogin', {
                  required: 'Поле обязательно к заполнению',
                  minLength: {
                    value: 6,
                    message: 'Минимум 6 символов'
                  },
                  maxLength: {
                    value: 50,
                    message: 'Максимум 50 символов'
                  }
                })}  
              />
              <div className='register__span'>{errors?.passwordLogin && <p className='register__form-error'>{
              errors?.passwordLogin?.message || 'Что-то пошло не так...'}</p>}</div>
            </div>
            <span className='register__form-error'>{errorMessage}</span>
            <button className='register__form-submit register__form-submit-auth' disabled={!isValid}>Войти</button>
          </form>
          <p className='register__yet'>Ещё не зарегистрированы?
          <Link className='register__link' to='/signup'>Регистрация</Link></p>
        </div>
      </section>
    </main>
  )
};

export default Login;