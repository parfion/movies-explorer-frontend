import './MoviesCard.css';
import img from '../../images/movie1.png';

function MoviesCard (params) {
  return(
    <div className='movies-card'>
      <div className='movies-card__content'>
        <img className='movies-card__img' alt='Кадр из фильма' src={img}/>
        <div className='movies-card__info'>
          <p className='movies-card__name'>33 слова о дизайне</p>
          <button className='movies-card__like'></button>
        </div>
        <p className='movies-card__timing'>1ч43м</p>
      </div>
    </div>
  )
}

export default MoviesCard;