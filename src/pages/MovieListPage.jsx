import { useSearchParams, Outlet } from 'react-router-dom';

import MovieList from '../components/MovieList.jsx';
import SearchForm from '../components/SearchForm.jsx';
import GenreSelect from '../components/GenreSelect.jsx';
import SortControl from '../components/SortControl.jsx';
import MovieCounter from '../components/MovieCounter.jsx';
import AddMovie from '../components/AddMovie.jsx';

import useMovies from '../hooks/useMovies.js';

import { defaultGenre, getGenres } from '../lib/genre.js';
import { sortByOptions } from '../lib/sortOptions.js';

export default function MovieListPage() {
  const [params, setSearchParams] = useSearchParams();
  const query = params.get('query') ?? '';
  const genre = params.get('genre') ?? defaultGenre;
  const sortBy = params.get('sortBy') ?? sortByOptions["Release Date"];

  const genres = getGenres();

  const [movies, setMovies] = useMovies(genre, query, sortBy);

  function onSearch(searchQuery) {
    console.log('[you just searched movie] : ', searchQuery);
    setSearchParams({ query: searchQuery })
  }

  function onGenreSelect(genre) {
    console.log('[you just select genre] : ', genre);
    setSearchParams({ query, genre, sortBy });
  }

  function onSortBySelect(selectedSortBy) {
    console.log('[you select sortBy]: ', selectedSortBy);
    setSearchParams({ query, genre, sortBy: sortByOptions[selectedSortBy] })
  }

  function handleAdd() {
    document.getElementById('add-movie').showModal();
  }

  function onMovieAdd(movie) {
    setMovies([movie, ...movies]);
  }

  return (
    <>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleAdd}> + Add Movie Modal</button>
      <SearchForm defaultSearchQuery={query} onSearch={onSearch} />
      <Outlet />
      <GenreSelect genres={genres} genre={genre} onSelect={onGenreSelect} />
      <SortControl sortBy={sortBy} onSelect={onSortBySelect} />
      <MovieCounter movies={movies} />
      <MovieList movies={movies} setMovies={setMovies} />
      <AddMovie onMovieAdd={onMovieAdd} />
    </>

  );
}
