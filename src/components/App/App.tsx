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
import type { Note } from '../../types/note';
import NoteForm from '../NoteForm/NoteForm';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearchQuery(query);
    setPage(1);
  }, 500);

  const { data, isSuccess } = useQuery({
    queryKey: ['notes', searchQuery, page],
    queryFn: () => fetchNotes(searchQuery, page),
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: keepPreviousData,
  });

  const closeModal = () => setSelectedNote(null);

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
    setIsFormOpen(false);
  };

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;
  const notePreview = selectedNote ? (
    <div>
      <h2>{selectedNote.title}</h2>
      <p>{selectedNote.content}</p>
      <span>{selectedNote.tag}</span>
    </div>
  ) : null;

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
      {selectedNote && <Modal onClose={closeModal} children={notePreview}></Modal>}
      {isFormOpen && (
        <Modal
          onClose={() => setIsFormOpen(false)}
          children={<NoteForm onSuccess={() => setIsFormOpen(false)} />}
        />
      )}
      {isSuccess && notes.length > 0 && (
        <NoteList notes={notes} onSelect={handleSelectNote} />
      )}
    </div>
  );
}
