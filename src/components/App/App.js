import './App.css';
import '../../vendor/normalize.css'
import Header from '../Header/Header';
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

function App() {
  return (
    <div className="app">
      {/* <Header />
      <Profile />
      <SearchForm />
      <Movies />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />  */}
      <Register />
    </div>
  );
}

export default App;
