import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies ({
    onSubmit, 
    movies, 
    isLoading, 
    activeCheckbox, 
    handleCheckbox, 
    handleSearcSavedMovies, 
    notFound, 
    deleteMovie
  }) {

  return (
    <main>
      <SearchForm 
        onSubmit={onSubmit} 
        isLoading={isLoading} 
        activeCheckbox={activeCheckbox} 
        handleCheckbox={handleCheckbox}  
        handleSearcSavedMovies={handleSearcSavedMovies} 
      />
      <MoviesCardList 
        cards={movies} 
        notFound={notFound} 
        deleteMovie={deleteMovie}
      />
    </main>
  )
}

export default SavedMovies;