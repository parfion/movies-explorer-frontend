import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList (params) {
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
        </div>
        <button className='movie-cardlist__button'>Ещё</button>
      </div>
    </section>
  )
};

export default MoviesCardList;