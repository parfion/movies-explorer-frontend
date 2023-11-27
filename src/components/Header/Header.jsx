import './Header.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header(params) {

  function openPopup () {
    document.querySelector('.header__popup').classList.add('header__popup-opened')
  }; 

  function closePopup () {
    document.querySelector('.header__popup').classList.remove('header__popup-opened')
  };

  return(
    <>
      {/* <header className='header'>
        <div className='header__content'>
          <Link className='header__logo' to='#'></Link>
          <nav className='header__nav'>
            <Link className='header__link' to='#'>Регистрация</Link>
            <Link className='header__link header__signin' to='#'>Войти</Link>
          </nav>
        </div>
      </header> */}

      <header className='header'>
        <div className='header__content'>
          <Link className='header__logo header__logo-admin' to='#'></Link>
          <nav className='header__nav-admin'>
            <div className='header__nav-movies'>
              <Link className='header__link' to='#'>Фильмы</Link>
              <Link className='header__link' to='#'>Сохранённые фильмы</Link>
            </div>
              <Link className='header__link header__link-account' to='#'>
                <p className='header__nav-account'>Аккаунт</p>
                <div className='header__nav-img'></div>
              </Link>
          </nav>
          <button className='header__menu-img' onClick={openPopup}></button>
          <nav className='header__popup'>
            <button className='header__popup-close' onClick={closePopup}></button>
            <nav className='header__popup-menu'>
              <Link className='header__link-menu' to='#'>Главная</Link>
              <Link className='header__link-menu' to='#'>Фильмы</Link>
              <Link className='header__link-menu' to='#'>Сохранённые фильмы</Link>
            </nav>
            <Link className='header__link header__link-account header__link-account-menu' to='#'>
              <p className='header__nav-account'>Аккаунт</p>
              <div className='header__nav-img'></div>
            </Link>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header;