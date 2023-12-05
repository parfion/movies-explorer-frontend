import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Header(params) {
  const { pathname } = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };
  
  window.addEventListener('resize', resizeWindow);

  const loggedOutHeader = () => pathname === '/';


  const loggedInHeader = () => pathname === '/profile' || pathname === '/movies' || pathname === '/saved-movies';

  const openPopup = () => {
    document.querySelector('.header__popup').classList.add('header__popup-opened')
  }; 

  const closePopup = () => {
    document.querySelector('.header__popup').classList.remove('header__popup-opened')
  };

  return (
    <>
      { loggedOutHeader() && (
      <header className='header'>
        <div className='header__content'>
          <Link className='header__logo' to='/'></Link>
          <nav className='header__nav'>
            <Link className='header__link' to='/signup'>Регистрация</Link>
            <Link className='header__link header__signin' to='/signin'>Войти</Link>
          </nav>
        </div>
      </header> )}

      { loggedInHeader() && windowWidth > 768 && (
      <header className='header header-signin'>
        <div className='header__content'>
          <Link className='header__logo header__logo-admin' to='/'></Link>
          <nav className='header__nav-admin'>
            <div className='header__nav-movies'>
              <Link className='header__link' to='/movies'>Фильмы</Link>
              <Link className='header__link' to='/saved-movies'>Сохранённые фильмы</Link>
            </div>
              <Link className='header__link header__link-account' to='/profile'>
                <p className='header__nav-account'>Аккаунт</p>
                <div className='header__nav-img'></div>
              </Link>
          </nav>
        </div>
      </header> )}

      { loggedInHeader() && windowWidth <= 768 && (
      <header className='header header-signin'>
        <div className='header__content'>
          <Link className='header__logo header__logo-admin' to='/'></Link>
          <nav className='header__nav-admin'>
            <div className='header__nav-movies'>
              <Link className='header__link' to='/movies'>Фильмы</Link>
              <Link className='header__link' to='/saved-movies'>Сохранённые фильмы</Link>
            </div>
              <Link className='header__link header__link-account' to='/profile'>
                <p className='header__nav-account'>Аккаунт</p>
                <div className='header__nav-img'></div>
              </Link>
          </nav>
          <button className='header__menu-img' onClick={openPopup}></button>
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
              <div className='header__nav-img'></div>
            </Link>
          </nav>
        </div>
      </header> )}
    </>
  )
}

export default Header;