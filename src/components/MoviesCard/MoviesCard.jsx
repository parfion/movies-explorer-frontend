import './MoviesCard.css';
import img from '../../images/movie2.jpg';
import { useState } from "react";
import { useLocation } from 'react-router-dom';

function MoviesCard (params) {
  const [isLiked, setIsLiked] = useState(false);
  const { pathname } = useLocation();

  function handleLikeMovie() {
    setIsLiked(!isLiked);
  }

  return(
    <section className='movies-card'>
      <div className='movies-card__content'>
        <img className='movies-card__img' alt='Кадр из фильма' src={img}/>
        <div className='movies-card__info'>
          <p className='movies-card__name'>33 слова о дизайне</p>
          <button className={`${pathname !== '/saved-movies' && 'movies-card__like'} 
          ${pathname !== '/saved-movies' && isLiked && 'movies-card__like-true'} 
          ${pathname === '/saved-movies' && 'movies-card__delete'}`} onClick={handleLikeMovie} />
        </div>
        <p className='movies-card__timing'>1ч43м</p>
      </div>
    </section>
  )
}

export default MoviesCard;