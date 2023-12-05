import './App.css';
import '../../vendor/normalize.css'
import Header from '../Header/Header';
import Main from '../Main/Main';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Movies from '../Movies/Movies';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Profile from '../Profile/Profile';
import Register from '../Regiter/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<Preloader />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
