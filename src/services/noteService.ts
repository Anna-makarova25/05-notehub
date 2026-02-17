import axios from 'axios';
import type { Note } from '../types/note';

interface ApiResponse {
  notes: Note[];
  totalPages: number;
}

interface NewNote {
  title: string;
  content: string;
  tag: string;
}

const noteApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async (
  searchText: string,
  page: number = 1,
  perPage: number = 12,
): Promise<ApiResponse> => {
  const response = await noteApi.get<ApiResponse>('/notes', {
    params: {
      search: searchText,
      page: page,
      perPage: perPage,
    },
  });
  return response.data;
};

export const createNote = async (newNote: NewNote) => {
  const response = await noteApi.post<Note>('/notes', newNote);
  return response.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await noteApi.delete<Note>(`/notes/${noteId}`);
  return response.data;
};
