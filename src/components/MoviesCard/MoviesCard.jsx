import './MoviesCard.css';
import { useState } from "react";
import { useLocation } from 'react-router-dom';

function MoviesCard ({src, title, duration}) {
  const [isLiked, setIsLiked] = useState(false);
  const { pathname } = useLocation();

  function handleLikeMovie() {
    setIsLiked(!isLiked);
  };

  // конвертер времени
  const conversionDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${(hours)}ч ${(minutes)}м`;
  }

  return(
      <li className='movies-card'>
        <div className='movies-card__content'>
          <img className='movies-card__img' alt='Кадр из фильма' src={`${'https://api.nomoreparties.co'}${src}`}/>
          <div className='movies-card__info'>
            <p className='movies-card__name'>{title}</p>
            <button className={`${pathname !== '/saved-movies' && 'movies-card__like'} 
            ${pathname !== '/saved-movies' && isLiked && 'movies-card__like-true'} 
            ${pathname === '/saved-movies' && 'movies-card__delete'}`} onClick={handleLikeMovie} />
          </div>
          <p className='movies-card__timing'>{conversionDuration(duration)}</p>
        </div>
      </li>
  )
}

export default MoviesCard;