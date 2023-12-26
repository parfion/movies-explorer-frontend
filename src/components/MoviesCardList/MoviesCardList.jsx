/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';
import { useEffect, useState } from 'react';
import {
  WINDOW_SIZE_DESKTOP,
  WINDOW_SIZE_TABLET,
  MOVIES_ROW_DESKTOP,
  MOVIES_ROW_TABLET,
  MOVIES_ROW_MOBILE,
  MOVIES_LINE_DESKTOP,
  MOVIES_LINE_MOBILE
} from '../../constants/constants';

function MoviesCardList ({
  isLoading, 
  notFound, 
  cards, 
  saveMovie, 
  deleteMovie}) {

  const { pathname } = useLocation();
  const [foundMovies, setFoundMovies] = useState(0);
  const [moreMovies, setMoreMovies] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //изменение списка в зависимости от размера экрана
  useEffect(() => {
    const resizeWindow = () => {
      setWindowWidth(window.innerWidth);
    }

    if (pathname === '/movies' && windowWidth >= WINDOW_SIZE_DESKTOP) {
      setFoundMovies(MOVIES_ROW_DESKTOP);
      setMoreMovies(MOVIES_LINE_DESKTOP)
    }
    else if (pathname === '/movies' && windowWidth >= WINDOW_SIZE_TABLET) {
      setFoundMovies(MOVIES_ROW_TABLET);
      setMoreMovies(MOVIES_LINE_MOBILE)
    }
    else if (pathname === '/movies' && windowWidth < WINDOW_SIZE_TABLET) {
      setFoundMovies(MOVIES_ROW_MOBILE);
      setMoreMovies(MOVIES_LINE_MOBILE)
    } 
    else if (pathname === '/saved-movies') {
      setFoundMovies(cards?.length)
    }
    window.addEventListener('resize', resizeWindow) 
    return () => window.removeEventListener("resize", resizeWindow);
  }, [windowWidth, cards]);

   // "Еще"
   const showMoreMovies = () => {
    setFoundMovies(foundMovies + moreMovies);
  };

  return (
    <section className={pathname==='/movies' ? 'movie-cardlist' : 'movie-cardlist movie-cardlist-saved'}>
      {isLoading && <div className='movie-cardlist__preloader'><Preloader /></div>}
      <div className='movie-cardlist__content'>
        <ul className='movie-cardlist__cards'> 
          {(cards !== null && !isLoading) && cards.map((item, index) => {
             if (index < foundMovies) { 
              return (
                <MoviesCard 
                  {...item}
                  movies={cards}
                  movie={item}
                  key={item.id || item._id} 
                  src={item.image.url}
                  title={item.nameRU}
                  saveMovie={saveMovie}
                  deleteMovie={deleteMovie}
                /> 
              )
            } 
            // возвращаем null, в случае отсутствия карточек
            return null;
          })} 
        </ul>
        {notFound === 'notFound' && <p className='movie-cardlist__error'>Ничего не найдено</p>}
        {(pathname === '/movies' && (cards?.length > foundMovies)) && (
        <button className='movie-cardlist__button' onClick={showMoreMovies}>Ещё</button>
        )}
      </div>
    </section>
  )
};

export default MoviesCardList;