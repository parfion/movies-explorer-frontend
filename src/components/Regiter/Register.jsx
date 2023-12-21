import { Link } from 'react-router-dom';
import './Register.css';
import '../Header/Header.css';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';


function Register ({ onRegister, errorMessage }) {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { 
    register, 
    formState: { 
      errors, 
      isValid 
    }, 
    watch 
  } = useForm({ mode: 'onChange' });

  const handleSubmitForm = (e) => {
    e.preventDefault();
    onRegister(name, email, password)
  };

  useEffect(() => {
    const subscription = watch(({name, email, password}) => {
      setName(name);
      setEmail(email);
      setPassword(password);
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
          <h1 className='register__greet'>Добро пожаловать!</h1>
          <form className='register__form' onSubmit={handleSubmitForm}>
            <div>
              <p className='register__form-name'>Имя</p>
              <input 
                className='register__form-data' 
                type='text' 
                placeholder='Имя'
                value={name} 
                {...register('name', {
                  required: 'Поле обязательно к заполнению',
                  minLength: {
                    value: 2,
                    message: 'Минимум 2 символа'
                  },
                  maxLength: {
                    value: 50,
                    message: 'Максимум 50 символов'
                  }
                })}  
              />
              <div className='register__span'>{errors?.name && <p className='register__form-error'>{
              errors?.name?.message || 'Что-то пошло не так...'}</p>}</div>
            </div>

            <div>
              <p className='register__form-name'>E-mail</p>
              <input 
                className='register__form-data' 
                type='email' 
                placeholder='E-mail'
                value={email}
                {...register('email', {
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
              <div className='register__span'>{errors?.email && <p className='register__form-error'>{
              errors?.email?.message || 'Что-то пошло не так...'}</p>}</div>
            </div>

            <div>
              <p className='register__form-name'>Пароль</p>
              <input 
              className='register__form-data' 
              type='password' 
              placeholder='Пароль' 
              autoComplete='off'
              value={password} 
              {...register('password', {
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
              <div className='register__span'>{errors?.password && <p className='register__form-error'>{
              errors?.password?.message || 'Что-то пошло не так...'}</p>}</div>
            </div>
            <span className='register__form-error'>{errorMessage}</span> 
            <button className='register__form-submit' disabled={!isValid}>Зарегистрироваться</button>
          </form>
          <p className='register__yet'>Уже зарегистрированы?
          <Link className='register__link' to='/signin'>Войти</Link></p>
        </div>
      </section>
    </main>
  )
}

export default Register;