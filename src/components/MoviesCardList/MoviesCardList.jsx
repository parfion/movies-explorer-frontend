import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList (params) {
  const { pathname } = useLocation();
  return (
    <section className={pathname==='/movies' ? 'movie-cardlist' : 'movie-cardlist movie-cardlist-saved'}S>
      <div className='movie-cardlist__content'>
        <nav className='movie-cardlist__cards'>
          <li className='movie-cardlist__card'><MoviesCard /></li>
          <li className='movie-cardlist__card'><MoviesCard /></li>
        </nav>
        {pathname === '/movies' && (
        <button className='movie-cardlist__button'>Ещё</button>
        )}
      </div>
    </section>
  )
};

export default MoviesCardList;