import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList (params) {
  const { pathname } = useLocation();
  return (
    <section className={pathname==='/movies' ? 'movie-cardlist' : 'movie-cardlist movie-cardlist-saved'}>
      <div className='movie-cardlist__content'>
        <ul className='movie-cardlist__cards'>
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        </ul>
        {pathname === '/movies' && (
        <button className='movie-cardlist__button'>Ещё</button>
        )}
      </div>
    </section>
  )
};

export default MoviesCardList;