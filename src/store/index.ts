import { create } from 'zustand';
import { AppState } from '../types';

export const useStore = create<AppState>((set) => ({
  searchTerm: '',
  results: [],
  isLoading: false,
  activeResult: null,
  setSearchTerm: (term) => set({ searchTerm: term }),
  setResults: (results) => set({ results }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setActiveResult: (result) => set({ activeResult: result }),
}));