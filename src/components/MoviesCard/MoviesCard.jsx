import './MoviesCard.css';
import { useState } from "react";
import { Link, useLocation } from 'react-router-dom';

function MoviesCard ({
    src,
     title, 
     movies, 
     movie, 
     saveMovie, 
     deleteMovie, 
     ...props
  }) {

  const [isLiked, setIsLiked] = useState(JSON
    .parse(localStorage
      .getItem('savedMovies'))
      ?.some((item) => item.movieId === movie.id));

  const { pathname } = useLocation();

  // основа для фильма
   let dataMovie = {};

  if(pathname === '/movies') {
    dataMovie = {
      country: props.country,
      director: props.director,
      duration: props.duration,
      year: props.year,
      description: props.description,
      image: `https://api.nomoreparties.co${props.image.url}`,
      trailerLink: props.trailerLink,
      thumbnail: `https://api.nomoreparties.co${props.image.formats.thumbnail.url}`,
      movieId: props.id,
      nameRU: props.nameRU,
      nameEN: props.nameEN,
    } 
  } 
  else {
    dataMovie = {
      country: props.country,
      director: props.director,
      duration: props.duration,
      year: props.year,
      description: props.description,
      image: props.image,
      trailerLink: props.trailerLink,
      thumbnail: props.thumbnail,
      movieId: props.movieId,
      nameRU: props.nameRU,
      nameEN: props.nameEN,
      _id: props._id,
    }
  };
  
  // лайк (сохранение)
  const handleSaveMovie = () => {
      saveMovie(dataMovie); 
      setIsLiked(dataMovie); 
  };

  // дизлайк (удаление)
  const handleDeleteMovie = () => {
      deleteMovie(dataMovie);
      setIsLiked(!isLiked);
  };

  const handleLikeMovie = () => {
    if (!isLiked) {
      handleSaveMovie(dataMovie);
    }
    else {
      handleDeleteMovie(dataMovie);
    }
  };
    
  // конвертер времени
  const conversionDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${(hours)}ч ${(minutes)}м`;
  };

  return(
    <li className='movies-card'>
      <div className='movies-card__content'>
        <Link to={dataMovie.trailerLink} target="_blank">
          <img className='movies-card__img' alt='Кадр из фильма' src={dataMovie.image}/>
        </Link>
        <div className='movies-card__info'>
          <p className='movies-card__name'>{title}</p>
          {(pathname === '/movies' && !isLiked) && <button className='movies-card__like' onClick={handleLikeMovie}/>}
          {(pathname === '/movies' && isLiked) && <button className='movies-card__like movies-card__like-true'  onClick={handleDeleteMovie}/>}
          {pathname === '/saved-movies' && <button className='movies-card__delete' onClick={handleDeleteMovie} />}
        </div>
        <p className='movies-card__timing'>{conversionDuration(dataMovie.duration)}</p>
      </div>
    </li>
  )
}


export default MoviesCard;