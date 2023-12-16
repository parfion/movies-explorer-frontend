import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies ({onSubmit, movies}) {
  return (
    <main>
      <SearchForm onSubmit={onSubmit}/>
      <MoviesCardList cards={movies}/>
    </main>
  )
}

export default SavedMovies;