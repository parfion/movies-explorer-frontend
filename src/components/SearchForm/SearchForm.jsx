import './SearchForm.css';
import '../Regiter/Register.css';
import loupe from '../../images/loupe.svg';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

function SearchForm ({activeCheckbox, handleCheckbox, handleSearchMovie}) {
  const [movieSearch, setMovieSearch] = useState('');

  // отрисовка чекбокса, в зависимости от localStorage
  let condition 
  
  if (activeCheckbox === true) {
    condition = true
  };

  let searchNameLocalStorage
  if (localStorage.getItem('searchName')) {
    searchNameLocalStorage = JSON.parse(localStorage.getItem('searchName'));
  }

  useEffect(() => {
    if (localStorage.getItem('searchName')) {
      setMovieSearch(searchNameLocalStorage);
    } 
  }, [])

  // валидация
  const { 
    register, 
    formState: {errors}, 
    handleSubmit, 
    watch,
  } = useForm({ mode: 'onSubmit' });

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSearchMovie(movieSearch);
  } 

  useEffect(() => {
    const subscription = watch((value) => {
      setMovieSearch(value.movie);
      return () => {
        subscription.unsubscribe();
      }
    })
  }, [watch]);

  function errorSubmit(e) {
    e.preventDefault();
  };

  return (
    <section className='search-form'>
      <form id='search-form' onSubmit={movieSearch !== '' ? handleSubmitForm : handleSubmit(errorSubmit)}>
        <div className='search-form__content'>
          <div className='search-form__bar'>
            <img className='search-form__info-img' alt='Лупа' src={loupe} />
            <div className='search-form__info'>
              <input className='search-form__info-input' type='text' placeholder='Фильм'  
              {...register('movie', {
                required: 'Нужно ввести ключевое слово',
                minLength: {
                  value: 1,
                  message: 'Минимум 1 символ'
                },
                maxLength: {
                  value: 50,
                  message: 'Максимум 50 символов'
                }
              })} value={movieSearch}/>
              <div className='register__span'>{(errors?.movie) && <p className='register__form-error'>{
                errors?.movie?.message || 'Что-то пошло не так...'}</p>}</div>
              <button className='search-form__button' type='submit'>Найти</button>
            </div>
          </div>
          <div className='search-form__bar-options'>
            <div className='search-form__checkbox'>
                <input className='search-form__checkbox-switch' onChange={errorSubmit} {...(condition ? {checked: true} : {checked: false})} type='checkbox' id="switch" onClick={handleCheckbox} />
                <label className='search-form__checkbox-button' htmlFor="switch"></label>
                <p className='search-form__checkbox-text'>Короткометражки</p>
              </div>
          </div>
        </div>
      </form>
    </section>
  )
}

export default SearchForm;