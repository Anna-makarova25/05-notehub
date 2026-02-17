import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import Pagination from '../Pagination/Pagination';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import { keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import NoteForm from '../NoteForm/NoteForm';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearchQuery(query);
    setPage(1);
  }, 500);

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['notes', searchQuery, page],
    queryFn: () => fetchNotes(searchQuery, page),
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox onSearch={handleSearch} />}
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        )}
        {
          <button className={css.button} onClick={() => setIsFormOpen(true)}>
            Create note +
          </button>
        }
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && notes.length > 0 && <NoteList notes={notes} />}
      {isFormOpen && (
        <Modal
          onClose={() => setIsFormOpen(false)}
          children={<NoteForm onClose={() => setIsFormOpen(false)} />}
        />
      )}
    </div>
  );
}
