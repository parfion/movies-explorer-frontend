import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies (params) {
  return (
    <>
      <SearchForm />
      <MoviesCardList />
    </>
  )
}

export default Movies;