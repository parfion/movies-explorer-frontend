import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';
import { useEffect, useState } from 'react';

function MoviesCardList ({isLoading, notFound, cards}) {

  const { pathname } = useLocation();
  const [foundMovies, setFoundMovies] = useState(0);
  const [moreMovies, setMoreMovies] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [state, setState] = useState(false);
  const [moviesLocalStorage, setMoviesLocalStorage] = useState(JSON.parse(localStorage.getItem('searchMovies')))

  // console.log(cards);
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

  // useEffect(() => {
  //   setState(true);
  //   }, [])

    // useEffect(() => {
    //   console.log(cards)
    //   if (localStorage.getItem('searchMovies')) {
    //     setMoviesLocalStorage(JSON.parse(localStorage.getItem('searchMovies')))
    //   };
    //   return () => {
    //   if (localStorage.getItem('searchMovies')) {
    //     setMoviesLocalStorage(JSON.parse(localStorage.getItem('searchMovies')))
    //   }; }
    //   }, [pathname])


  // useEffect(() => {
  //   // if (localStorage.getItem('searchMovies')) {
  //   //   setMoviesLocalStorage(JSON.parse(localStorage.getItem('searchMovies')))
  //   // };
  //   return () => 
  //   setState(false)
  // }, [isLoading])  

   //"Еще"
   const showMoreMovies = () => {
    setFoundMovies(foundMovies + moreMovies);
  };

  // console.log(cards.length)
  // console.log(moviesLocalStorage.length)
  // console.log(foundMovies)

  // useEffect(() => {
  //   setMoviesLocalStorage(JSON.parse(localStorage.getItem('searchMovies')));
  //   console.log('локация')
  // }, [pathname])

  return (
    <section className={pathname==='/movies' ? 'movie-cardlist' : 'movie-cardlist movie-cardlist-saved'}>
      {isLoading && <div className='movie-cardlist__preloader'><Preloader /></div>}
      <div className='movie-cardlist__content'>
        
        
      {/* {(state && localStorage.getItem('searchMovies')) && <ul className='movie-cardlist__cards'>
        {moviesLocalStorage.map((item, index) => {
          if (index < foundMovies) { 
            return (
            <MoviesCard 
            movie={moviesLocalStorage}
            key={item.id} 
            src={item.image.url}
            title={item.nameRU}
            duration={item.duration}
            /> )
          }
          return null;
      })
      }</ul>} */}
      
      {/* {notFound === 'found' && */}
        <ul className='movie-cardlist__cards'> 
          {(cards !== null && !isLoading) && cards.map((item, index) => {
             if (index < foundMovies) { 
              return (
                <MoviesCard 
                {...item}
                movies={cards}
                movie={item}
                key={item.id} 
                src={item.image.url}
                title={item.nameRU}
                duration={item.duration}
                /> 
              )
            } 
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