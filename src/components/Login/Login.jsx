import '../Regiter/Register.css';
import './Login.css';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Login (params) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeEmail = (e) => {
    setEmail(e.target.value)
  };

  const changePassword = (e) => {
    setPassword(e.target.value)
  };

  const { 
    register, 
    formState: { 
      errors, 
      isValid 
    }, 
    handleSubmit, 
    reset } = useForm({ mode: 'onBlur' });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    reset();
  };

  return (
    <main>
      <section className='register'>
        <div className='register__content'>
          <Link className='register__logo' to='/'></Link>
          <h1 className='register__greet'>Рады видеть!</h1>
          <form className='register__form' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p className='register__form-name'>E-mail</p>
              <input className='register__form-data' type='email' placeholder='E-mail'
              {...register('emailLogin', {
                required: 'Поле обязательно к заполнению',
                pattern: {
                  value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
                  message: 'Введите валидный e-mail'
                },
              })} value={email} onChange={changeEmail}/>
              <div className='register__span'>{errors?.emailLogin && <p className='register__form-error'>{
              errors?.emailLogin?.message || 'Что-то пошло не так...'}</p>}</div>
            </div>
            <div>
              <p className='register__form-name'>Пароль</p>
              <input className='register__form-data' type='password' placeholder='Пароль'
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
              })} value={password} onChange={changePassword}/>
              <div className='register__span'>{errors?.passwordLogin && <p className='register__form-error'>{
              errors?.passwordLogin?.message || 'Что-то пошло не так...'}</p>}</div>
            </div>
            <button className='register__form-submit register__form-submit-auth' type='submit' disabled={!isValid}>Войти</button>
          </form>
          <p className='register__yet'>Ещё не зарегистрированы?
          <Link className='register__link' to='/signup'>Регистрация</Link></p>
        </div>
      </section>
    </main>
  )
};

export default Login;