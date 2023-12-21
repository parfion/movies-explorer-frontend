import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';
import { useEffect, useState } from 'react';

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

    if (windowWidth >= 1200) {
      setFoundMovies(16);
      setMoreMovies(4)
    }
    else if (windowWidth >= 730){
      setFoundMovies(12);
      setMoreMovies(4)
    }
    else if (windowWidth < 730){
      setFoundMovies(5);
      setMoreMovies(1)
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