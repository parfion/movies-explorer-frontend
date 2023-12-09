import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies (params) {
  return (
    <main>
      <SearchForm />
      <MoviesCardList />
    </main>
  )
}

export default Movies;