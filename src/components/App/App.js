import './App.css';
import '../../vendor/normalize.css'
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Regiter/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
// import Preloader from '../Preloader/Preloader';
import { Route, Routes, useLocation } from 'react-router-dom';
import api from '../../utils/MainApi';
import { useEffect, useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchMovies, setSearchMovies] = useState(JSON.parse(localStorage.getItem('searchMovies')) || []);
  const [notFound, setNotFound] = useState('');
  const [shortMovies, setShortMovies] = useState(JSON.parse(localStorage.getItem('searchMovies')) || []);
  const [activeCheckbox, setActiveCheckbox] = useState(JSON.parse(localStorage.getItem('checkbox')));
  const location = useLocation();
  const checkboxLocalStorage = JSON.parse(localStorage.getItem('checkbox'));
  // // const moviesLocalStorage = JSON.parse(localStorage.getItem('searchMovies'));

  // // useEffect(() => {
  // //   if (checkboxLocalStorage) {
  // //     setActiveCheckbox(checkboxLocalStorage);
  // //     console.log(3)
  // //   } 
  // // }, []);

  // // загрузка фильмов
  // const mySearchMovies = (movies) => {
  //   setSearchMovies(movies);
  //   setShortMovies(movies);
  // };


  localStorage.setItem('checkbox', JSON.stringify(activeCheckbox));

  // изменение состояния чекбокса
  const handleCheckbox = () => {
    setActiveCheckbox(!activeCheckbox);
    // localStorage.setItem('checkbox', JSON.stringify(activeCheckbox))
  };

  // фильтр коротких фильмов
  const filterShortMovies = (movies) => {
    return movies.filter((movie) => movie.duration <= 40);
  }

  useEffect(() => {
    localStorage.setItem('searchMovies', JSON.stringify(shortMovies));
    console.log(2)
  }, [shortMovies]);

  // отрисовка фильмов, в зависимости от 
  // состояниячекбокса
  useEffect(() => {
    if (activeCheckbox) {
      setSearchMovies(filterShortMovies(shortMovies));
    } 
    else {
      setSearchMovies(shortMovies);
    }
  }, [activeCheckbox, shortMovies]);

   //поиск по базе фильмов
   const handleSearchMovies = (searchName) => {
    setIsLoading(true);
      api
        .getMovies()
        .then((movies) => {
          console.log(isLoading)
          const mineSearchMovies = movies.filter(
            (movie) =>
              movie.nameRU
                .toLowerCase()
                .includes(searchName.toLowerCase()) ||
              movie.nameEN
              .toLowerCase()
              .includes(searchName.toLowerCase())
            );
            setShortMovies(mineSearchMovies);
            setSearchMovies(shortMovies);
            saveData(searchName , mineSearchMovies);
            ((mineSearchMovies.length > 0) ? setNotFound('found') : setNotFound('notFound'));
          })
        .catch((err) => {
        console.log(err, `Во время запроса произошла ошибка. 
        Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`)
        })
        .finally(() => {setIsLoading(false); console.log(searchMovies)})
  };

  const saveData = (searchName , item) => {
    localStorage.setItem('searchName', JSON.stringify(searchName));
    localStorage.setItem('searchMovies', JSON.stringify(item));
    localStorage.setItem('checkbox', JSON.stringify(activeCheckbox));
  };


  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route exact path="/movies" element={
          <Movies 
            isLoading={isLoading} 
            activeCheckbox={activeCheckbox} 
            handleCheckbox={handleCheckbox} 
            notFound={notFound} 
            movies={searchMovies} 
            handleSearchMovie={handleSearchMovies}
          />
        } />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;