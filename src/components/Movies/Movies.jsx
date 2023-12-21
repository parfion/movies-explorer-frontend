import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies ({ 
    isLoading, 
    activeCheckbox, 
    handleCheckbox, 
    notFound, 
    movies, 
    handleSearchMovie, 
    saveMovie, 
    deleteMovie 
  }) {

  return (
    <main>
      <SearchForm 
        activeCheckbox={activeCheckbox} 
        handleCheckbox={handleCheckbox} 
        handleSearchMovie={handleSearchMovie}
      />
      <MoviesCardList 
        activeCheckbox={activeCheckbox} 
        isLoading={isLoading} 
        cards={movies} 
        notFound={notFound} 
        saveMovie={saveMovie} 
        deleteMovie={deleteMovie}
      />
    </main>
  )
}

export default Movies;