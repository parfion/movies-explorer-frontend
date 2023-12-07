import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList (params) {
  const { pathname } = useLocation();
  return (
    <section className='movie-cardlist'>
      <div className='movie-cardlist__content'>
        <div className='movie-cardlist__cards'>
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        </div>
        {pathname === '/movies' && (
        <button className='movie-cardlist__button'>Ещё</button>
        )}
      </div>
    </section>
  )
};

export default MoviesCardList;