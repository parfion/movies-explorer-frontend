import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Header({ isLoggedIn }) {

  const { pathname } = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const activeHeader = (pathname === '/profile' || pathname === '/movies' || pathname === '/saved-movies') && true;

  const resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };
  
  window.addEventListener('resize', resizeWindow);

  const openPopup = () => {
    document.querySelector('.header__popup').classList.add('header__popup-opened');
    document.querySelector('.header__opacity').classList.add('header__opacity-opened');
  }; 

  const closePopup = () => {
    document.querySelector('.header__popup').classList.remove('header__popup-opened');
    document.querySelector('.header__opacity').classList.remove('header__opacity-opened');
  };

  return (
    <>
      {(!localStorage.getItem('token') && pathname === '/') && (
      <header className={pathname === '/' ? 'header' : 'header header-signin'}>
        <div className='header__content'>
          <Link className='header__logo' to='/'></Link>
          <nav className='header__nav'>
            <Link className='header__link' to='/signup'>Регистрация</Link>
            <Link className='header__link header__signin' to='/signin'>Войти</Link>
          </nav>
        </div>
      </header> )}

      {(localStorage.getItem('token') && (activeHeader || pathname === '/')  && windowWidth > 768) && (
      <header className={pathname === '/' ? 'header' : 'header header-signin'}>
        <div className='header__content'>
          <Link className='header__logo header__logo-admin' to='/'></Link>
          <nav className='header__nav-admin'>
            <div className='header__nav-movies'>
              <Link className='header__link' to='/movies'>Фильмы</Link>
              <Link className='header__link' to='/saved-movies'>Сохранённые фильмы</Link>
            </div>
              <Link className='header__link header__link-account' to='/profile'>
                <p className='header__nav-account'>Аккаунт</p>
                <div className={pathname === '/' ? 'header__nav-img' : 'header__nav-img-admin'}></div>
              </Link>
          </nav>
        </div>
      </header> )}

      { (localStorage.getItem('token') && activeHeader && windowWidth <= 768) && (
      <header className={pathname === '/' ? 'header' : 'header header-signin'}>
        <div className='header__content'>
          <Link className='header__logo header__logo-admin' to='/'></Link>
          <nav className='header__nav-admin'>
            <div className='header__nav-movies'>
              <Link className='header__link' to='/movies'>Фильмы</Link>
              <Link className='header__link' to='/saved-movies'>Сохранённые фильмы</Link>
            </div>
              <Link className='header__link header__link-account' to='/profile'>
                <p className='header__nav-account'>Аккаунт</p>
                <div className={pathname === '/' ? 'header__nav-img' : 'header__nav-img-admin'}></div>
              </Link>
          </nav>
          <button className='header__menu-img' onClick={openPopup}></button>
          <div className='header__opacity'>
          <nav className='header__popup'>
            <button className='header__popup-close' onClick={closePopup}></button>
            <nav className='header__popup-menu'>
              <Link className={pathname === '/' ? 'header__link-active' : 'header__link-menu'} 
              to='/' onClick={closePopup}>Главная</Link>
              <Link className={pathname === '/movies' ? 'header__link-active' : 'header__link-menu'} 
              to='/movies'  onClick={closePopup}>Фильмы</Link>
              <Link className={pathname === '/saved-movies' ? 'header__link-active' : 'header__link-menu'} 
              to='/saved-movies' onClick={closePopup}>Сохранённые фильмы</Link>
            </nav>
            <Link className='header__link header__link-account header__link-account-menu' 
            to='/profile'  onClick={closePopup}>
              <p className='header__nav-account'>Аккаунт</p>
              <div className='header__nav-img-admin'></div>
            </Link>
          </nav>
          </div>
        </div>
      </header> )}
    </>
  )
}

export default Header;