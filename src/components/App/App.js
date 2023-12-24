/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import '../../vendor/normalize.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Regiter/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import * as auth from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SHORT_MOVIE_DURATION } from '../../constants/constants'

function App() {

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchMovies, setSearchMovies] = useState(JSON.parse(localStorage.getItem('searchMovies')) || []);
  const [notFound, setNotFound] = useState('');
  const [shortMovies, setShortMovies] = useState(JSON.parse(localStorage.getItem('searchMovies')) || []);
  const [activeCheckbox, setActiveCheckbox] = useState(JSON.parse(localStorage.getItem('checkbox')));
  const [activeCheckboxSavedMovies, setActiveCheckboxSavedMovies] = useState(false);
  const [savedMovie, setSavedMovie] = useState(JSON.parse(localStorage.getItem('savedMovies')) || []);
  const [isLiked, setIsLiked] = useState(false);
  const [searchSavedMovies, setSearchSavedMovies] = useState([]);
  const [shownSavedMovies, setShownSavedMovies] = useState(false);
  const [messageEditUser, setMessageEditUser] = useState('');
  const [errorMessageRegister, setErrorMessageRegister] = useState('');
  const [errorMessageLogin, setErrorMessageLogin] = useState('');

  // регистрация
  const onRegister = (name, email, password) => {
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then((data) => {
        onLogin(email, password);
        navigate('/movies', {replace: true});
      })
      .catch((err) => {
        setErrorMessageRegister('Такой пользователь уже существует');
      })
      .finally(() => setIsLoading(false))
  };

  // авторизация
  const onLogin = (email, password) => { 
    setIsLoading(true);
    auth
      .login(email, password)
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          getSavedMovies();
          navigate('/movies', {replace: true});
          return data;
        }
      })
      .catch((err) => {
        setErrorMessageLogin('Такого пользователя не существует');
      })
      .finally(() => setIsLoading(false))
  };

  // проверка токена
  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res);
          getUser();
        })
        .catch((err) => console.log(err))
      };
    }, [localStorage.getItem('token')]);

  // получение пользователя
  const getUser = () => {
    auth
      .getUser()
      .then((dataUser) => {
        setCurrentUser(dataUser);
      })
      .catch((err) => console.log(err));
  };

  // редактирование пользователя
  const editUser = (dataUser) => {
    setIsLoading(true);
    auth
      .editUser(dataUser)
      .then((newDataUser) => {
        setCurrentUser(newDataUser);
      })
      .then(() => {
        setMessageEditUser('Данные пользователя отредактированы');
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  };

  // получение сохраненных фильмов
  const getSavedMovies = () => {
    auth
    .getSavedMovies()
    .then((data) => {
      localStorage.setItem('savedMovies', JSON.stringify(data));
      setSavedMovie(JSON.parse(localStorage.getItem('savedMovies')));
    })
    .catch((err) => console.log(err));
  };

  // выход из аккаунта 
  const logout = () => {
    setIsLoggedIn(false);
    setSearchMovies([]);
    setShortMovies([]);
    setSavedMovie([]);
    setActiveCheckbox(null);
    localStorage.removeItem('checkbox');
    localStorage.removeItem('searchMovies');
    localStorage.removeItem('token');
    localStorage.removeItem('searchName');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('allMovies');
  };

  if (localStorage.getItem('token')) {
    localStorage.setItem('checkbox', JSON.stringify(activeCheckbox)); 
  }

  useEffect(() => {
    setShownSavedMovies(false);
    setErrorMessageLogin('');
    setErrorMessageRegister('');
    setMessageEditUser('');
    localStorage.removeItem('savedSearchMovies');
  }, [pathname]);

  useEffect(() => {
    localStorage.setItem('searchMovies', JSON.stringify(shortMovies));
  }, [shortMovies]);


  // изменение состояния чекбокса
  const handleCheckbox = () => {
    setActiveCheckbox(!activeCheckbox);
  };

  const handleCheckboxSavedMovies = () => {
    setActiveCheckboxSavedMovies(!activeCheckboxSavedMovies);
  }

  // фильтр коротких фильмов
  const filterShortMovies = (movies) => {
    return movies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
  }

  // отрисовка фильмов, в зависимости от 
  // состояния чекбокса
  useEffect(() => {
    if (pathname === '/movies') {
      if (activeCheckbox) {
        setSearchMovies(filterShortMovies(shortMovies));
      } 
      else {
        setSearchMovies(shortMovies);
      } 
    } 
    else if (pathname === '/saved-movies') {
      if (activeCheckboxSavedMovies) {
        setSavedMovie(filterShortMovies(!shownSavedMovies 
          ? JSON.parse(localStorage.getItem('savedMovies')) 
          : searchSavedMovies));
      } 
      else {
        setSavedMovie(!shownSavedMovies 
          ? JSON.parse(localStorage.getItem('savedMovies')) 
          : searchSavedMovies);
      } 
    }
  }, [activeCheckbox, activeCheckboxSavedMovies, pathname, searchSavedMovies, shortMovies, shownSavedMovies]);

   // поиск по базе фильмов
   const handleSearchMovies = (searchName) => {
    setIsLoading(true);
    const allMoviesFromLS = JSON.parse(localStorage.getItem('allMovies'));
    if (!allMoviesFromLS) {
      moviesApi
        .getMovies()
        .then((movies) => {
          localStorage.setItem('allMovies', JSON.stringify(movies))
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
            saveData(searchName, mineSearchMovies);
            ((mineSearchMovies.length > 0) ? setNotFound('found') : setNotFound('notFound'));
          })
        .catch((err) => {
        console.log(err, `Во время запроса произошла ошибка. 
        Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`)
        })
        .finally(() => {setIsLoading(false); }); }
    else {
      console.log(2)
      const mineSearchMovies = allMoviesFromLS.filter(
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
        saveData(searchName, mineSearchMovies);
        ((mineSearchMovies.length > 0) ? setNotFound('found') : setNotFound('notFound'));
        setIsLoading(false);
    }
  };
  
  // поиск сохраненных фильмов 
  const handleSearchSavedMovies = (searchName) => {
    setShownSavedMovies(true);
    setIsLoading(true);
    const mineSavedSearchMovies = JSON.parse(localStorage.getItem('savedMovies')).filter(
      (movie) =>
        movie.nameRU
          .toLowerCase()
          .includes(searchName.toLowerCase()) ||
        movie.nameEN
        .toLowerCase()
        .includes(searchName.toLowerCase())
      );
      setSearchSavedMovies(mineSavedSearchMovies);
      localStorage.setItem('savedSearchMovies', JSON.stringify(mineSavedSearchMovies));
      setIsLoading(false);
      mineSavedSearchMovies.length > 0 ? setNotFound('found') : setNotFound('notFound');
  };

  // сохранение данных в localStorage
  const saveData = (searchName , item) => {
    localStorage.setItem('searchName', JSON.stringify(searchName));
    localStorage.setItem('searchMovies', JSON.stringify(item));
    localStorage.setItem('checkbox', JSON.stringify(activeCheckbox));
  };

  // сохранение фильма
  const saveMovie = (movie) => {
    auth
    .saveMovie(movie)
    .then((movie) => {
      setIsLiked(true);
      const newSavedMovies = [movie, ...savedMovie];
      setSavedMovie(newSavedMovies);
      localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
    })
    .catch((err) => console.log(err));
  };

  // удаление фильма 
  const deleteMovie = (movie) => {
    if (localStorage.getItem('savedSearchMovies')) {
      const localStorageMovies = JSON.parse(localStorage.getItem('savedSearchMovies'));
      const foundMovie = (localStorageMovies).find((item) => item.movieId === movie.movieId);

      const localStorageSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
      const foundSavedMovie = localStorageSavedMovies.find((item) => item.movieId === movie.movieId);
      if (foundMovie) {
      auth
      .deleteMovie(foundMovie._id)
      .then((deletedMovie) => {
        const index = localStorageMovies.indexOf(foundMovie);
        localStorageMovies.splice(index, 1);
        localStorage.setItem('savedSearchMovies', JSON.stringify(localStorageMovies));

        const indexSavedMovie = localStorageSavedMovies.indexOf(foundSavedMovie);
        localStorageSavedMovies.splice(indexSavedMovie, 1);
        localStorage.setItem('savedMovies', JSON.stringify(localStorageSavedMovies));
        setSavedMovie(localStorageMovies);
      })
      .catch((err) => console.log(err)) }
    }
    else {
      const localStorageMovies = JSON.parse(localStorage.getItem('savedMovies'));
      const foundMovie = (localStorageMovies).find((item) => item.movieId === movie.movieId);
      if (foundMovie) {
      auth
      .deleteMovie(foundMovie._id)
      .then((deletedMovie) => {
        const index = localStorageMovies.indexOf(foundMovie);
        localStorageMovies.splice(index, 1);
        localStorage.setItem('savedMovies', JSON.stringify(localStorageMovies));
        setSavedMovie(localStorageMovies);
      })
      .catch((err) => console.log(err)) } }
  };

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header isLoggedIn={isLoggedIn} />
        <Routes>

          <Route path="/" element={<Main />} />

          <Route 
            path="/signin" 
            element={!isLoggedIn ? <Login 
            onLogin={onLogin} 
            errorMessage={errorMessageLogin}
            isLoading={isLoading}
          /> : <Navigate to="/movies" replace />
        } />

          <Route 
            path="/signup" 
            element={!isLoggedIn ? <Register 
            onRegister={onRegister} 
            errorMessage={errorMessageRegister}
            isLoading={isLoading}
          /> : <Navigate to="/movies" replace />
          } />
          
          <Route path="/movies" element={
            <ProtectedRoute 
              isLoggedIn={isLoggedIn}
              element={Movies} 
              isLoading={isLoading} 
              activeCheckbox={activeCheckbox} 
              handleCheckbox={handleCheckbox} 
              notFound={notFound} 
              movies={searchMovies} 
              handleSearchMovie={handleSearchMovies}
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
              isLiked={isLiked}
            />
          } />

          <Route path="/saved-movies" element={
            <ProtectedRoute 
              element={SavedMovies} 
              movies={savedMovie}
              isLoading={isLoading} 
              activeCheckbox={activeCheckboxSavedMovies} 
              handleCheckbox={handleCheckboxSavedMovies} 
              handleSearchMovie={handleSearchMovies}
              handleSearcSavedMovies={handleSearchSavedMovies}
              notFound={notFound}
              deleteMovie={deleteMovie}
            />
          } />

          <Route path="/profile" element={
            <ProtectedRoute 
              element={Profile} 
              logout={logout}
              editUser={editUser}
              messageEditUser={messageEditUser}
              isLoading={isLoading}
            /> 
          } />
          
          <Route path='*' element={<NotFound />} />

        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  )
};

export default App;