import './SearchForm.css';
import loupe from '../../images/loupe.svg';

function SearchForm (params) {
  return(
    <div className='search-form'>
      <div className='search-form__content'>
        <form className='search-form__bar'>
          <img className='search-form__info-img' alt='Лупа' src={loupe} />
          <div className='search-form__info'>
            <input className='search-form__info-input' type='text' placeholder='Фильм' required></input>
            <button className='search-form__button'>Найти</button>
          </div>
        </form>
        <div className='search-form__bar-options'>
          <div className='search-form__checkbox'>
              <input className='search-form__checkbox-switch' type='checkbox' id="switch"></input>
              <label className='search-form__checkbox-button' htmlFor="switch"></label>
              <p className='search-form__checkbox-text'>Короткометражки</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SearchForm;