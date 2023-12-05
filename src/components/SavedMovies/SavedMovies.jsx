import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies (params) {
  return (
    <>
      <SearchForm />
      <MoviesCardList />
    </>
  )
}

export default SavedMovies;