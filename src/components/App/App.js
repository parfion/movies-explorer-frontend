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
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
  const [savedMovie, setSavedMovie] = useState(JSON.parse(localStorage.getItem('savedMovies')) || []);
  const [isLiked, setIsLiked] = useState(false);
  const [searchSavedMovies, setSearchSavedMovies] = useState([]);
  const [shownSavedMovies, setShownSavedMovies] = useState(false);
  const [errorMessageRegister, setErrorMessageRegister] = useState('');
  const [errorMessageLogin, setErrorMessageLogin] = useState('');

  // регистрация
  const onRegister = (name, email, password) => {
    auth
      .register(name, email, password)
      .then((data) => {
        onLogin(email, password);
        navigate('/movies', {replace: true});
      })
      .catch((err) => {
        setErrorMessageRegister('Такой пользователь уже существует');
      });
  };

  // авторизация
  const onLogin = (email, password) => { 
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
      });
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
    auth
      .editUser(dataUser)
      .then((newDataUser) => {
        setCurrentUser(newDataUser);
      })
      .catch((err) => console.log(err))
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
  };

  if (localStorage.getItem('token')) {
    localStorage.setItem('checkbox', JSON.stringify(activeCheckbox)); 
  }

  useEffect(() => {
    setShownSavedMovies(false);
  }, [pathname]);

  useEffect(() => {
    localStorage.setItem('searchMovies', JSON.stringify(shortMovies));
  }, [shortMovies]);

  // изменение состояния чекбокса
  const handleCheckbox = () => {
    setActiveCheckbox(!activeCheckbox);
  };

  // фильтр коротких фильмов
  const filterShortMovies = (movies) => {
    return movies.filter((movie) => movie.duration <= 40);
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
      if (activeCheckbox) {
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
  }, [activeCheckbox, pathname, searchSavedMovies, shortMovies, shownSavedMovies]);

   // поиск по базе фильмов
   const handleSearchMovies = (searchName) => {
    moviesApi
      .getMovies()
      .then((movies) => {
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
      .finally(() => {setIsLoading(false); });
  };

  // поиск сохраненных фильмов 
  const handleSearcSavedMovies = (searchName) => {
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
    const savedLocalStorageMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const foundMovie = savedLocalStorageMovies.find((item) => item.movieId === movie.movieId);
    if (foundMovie) {
    auth
    .deleteMovie(foundMovie._id)
    .then((deletedMovie) => {
      const index = savedLocalStorageMovies.indexOf(foundMovie);
      savedLocalStorageMovies.splice(index, 1);
      localStorage.setItem('savedMovies', JSON.stringify(savedLocalStorageMovies));
      setSavedMovie(savedLocalStorageMovies);
    })
    .catch((err) => console.log(err)) }
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header isLoggedIn={isLoggedIn} />
        <Routes>

          <Route path="/" element={<Main />} />

          <Route 
            path="/signin" 
            element={<Login 
            onLogin={onLogin} 
            errorMessage={errorMessageLogin}
          />
          } />

          <Route 
            path="/signup" 
            element={<Register 
            onRegister={onRegister} 
            errorMessage={errorMessageRegister}
          />
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
              activeCheckbox={activeCheckbox} 
              handleCheckbox={handleCheckbox} 
              handleSearchMovie={handleSearchMovies}
              handleSearcSavedMovies={handleSearcSavedMovies}
              notFound={notFound}
              deleteMovie={deleteMovie}
            />
          } />

          <Route path="/profile" element={
            <ProtectedRoute 
              element={Profile} 
              logout={logout}
              editUser={editUser}
            /> 
          } />
          
          <Route path='*' element={<NotFound />} />

        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App;