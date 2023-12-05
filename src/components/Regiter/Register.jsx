import { Link } from 'react-router-dom';
import './Register.css';
import '../Header/Header.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';


function Register (params) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeName = (e) => {
    setName(e.target.value)
  };

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
    <div className='register'>
      <div className='register__content'>
        <Link className='register__logo' to='/'></Link>
        <h2 className='register__greet'>Добро пожаловать!</h2>
        <form className='register__form' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p className='register__form-name'>Имя</p>
            <input className='register__form-data' type='text' 
            {...register('name', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 2,
                message: 'Минимум 2 символа'
              }
            })} value={name} onChange={changeName}/>
            <div className='register__span'>{errors?.name && <p className='register__form-error'>{
            errors?.name?.message || 'Что-то пошло не так...'}</p>}</div>
          </div>
          <div>
            <p className='register__form-name'>E-mail</p>
            <input className='register__form-data' type='email' 
            {...register('email', {
              required: 'Поле обязательно к заполнению',
              pattern: {
                value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
                message: 'Введите валидный e-mail'
              },
            })} value={email} onChange={changeEmail}/>
            <div className='register__span'>{errors?.email && <p className='register__form-error'>{
            errors?.email?.message || 'Что-то пошло не так...'}</p>}</div>
          </div>
          <div>
            <p className='register__form-name'>Пароль</p>
            <input className='register__form-data' type='password' 
            {...register('password', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 6,
                message: 'Минимум 6 символов'
              }
            })} value={password} onChange={changePassword}/>
            <div className='register__span'>{errors?.password && <p className='register__form-error'>{
            errors?.password?.message || 'Что-то пошло не так...'}</p>}</div>
          </div>
          <button className='register__form-submit' type='submit' disabled={!isValid}>Зарегистрироваться</button>
        </form>
        <p className='register__yet'>Уже зарегистрированы?
        <Link className='register__link' to='/signin'>Войти</Link></p>
      </div>
    </div>
  )
}

export default Register;