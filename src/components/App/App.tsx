// import css from './App.module.css';
// import MovieGrid from '../MovieGrid/MovieGrid';
// import SearchBar from '../SearchBar/SearchBar';
// import MovieModal from '../Modal/Modal';
// import Loader from '../Loader/Loader';
// import ErrorMessage from '../ErrorMessage/ErrorMessage';
// import { useEffect, useState } from 'react';
// import type { Movie } from '../../types/movie';
// import { fetchMovies } from '../../services/movieService';
// import toast, { Toaster } from 'react-hot-toast';
// import { useQuery } from '@tanstack/react-query';
// import ReactPaginate from 'react-paginate';

// export default function App() {
//   const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [page, setPage] = useState(1);

//   const { data, isLoading, isSuccess, isError } = useQuery({
//     queryKey: ['movies', searchQuery, page],
//     queryFn: () => fetchMovies(searchQuery, page),
//     enabled: searchQuery !== '',
//     staleTime: 1000 * 60 * 5, // 5 minutes
//     placeholderData: (previousData) => previousData,
//   });

//   const handleSelectMovie = (movie: Movie) => {
//     setSelectedMovie(movie);
//   };

//   const closeModal = () => setSelectedMovie(null);

//   const handleSearch = async (query: string) => {
//     setSearchQuery(query);
//     setPage(1);
//   };

//   useEffect(() => {
//     if (isSuccess && data?.movies.length === 0) {
//       toast.error('No movies found for your request.');
//     }
//   }, [isSuccess, data]);

//   return (
//     <div className={css.app}>
//       <Toaster />
//       <SearchBar onSubmit={handleSearch} />
//       {isSuccess && data.movies.length > 0 && (
//         <>
//           <MovieGrid movies={data.movies} onSelect={handleSelectMovie} />
//           {data.totalPages > 1 && (
//             <ReactPaginate
//               pageCount={data.totalPages}
//               pageRangeDisplayed={5}
//               marginPagesDisplayed={1}
//               onPageChange={({ selected }) => setPage(selected + 1)}
//               forcePage={page - 1}
//               containerClassName={css.pagination}
//               activeClassName={css.active}
//               nextLabel="→"
//               previousLabel="←"
//             />
//           )}
//         </>
//       )}
//       {isLoading && <Loader />}
//       {isError && <ErrorMessage />}
//       {selectedMovie && (
//         <MovieModal movie={selectedMovie} onClose={closeModal} />
//       )}
//     </div>
//   );
// }

import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import Pagination from '../Pagination/Pagination';

export default function App() {
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <NoteList />
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
    </div>
  );
}
