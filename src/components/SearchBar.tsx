import React, { useState } from 'react';
import { Search, Mic } from 'lucide-react';
import { useStore } from '../store';
import { searchBritannica } from '../services/api';

export const SearchBar: React.FC = () => {
  const { setSearchTerm, setResults, setIsLoading } = useStore();
  const [localSearch, setLocalSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localSearch.trim()) return;

    setIsLoading(true);
    setError(null);
    setSearchTerm(localSearch);

    try {
      const data = await searchBritannica(localSearch);
      setResults(data.results);
    } catch (error) {
      // Handle the error with a simple string message
      const errorMessage = error instanceof Error ? error.message : 'Search failed';
      setError(errorMessage);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative flex items-center">
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search scientific topics..."
            className="w-full px-6 py-4 text-lg rounded-full border-2 border-blue-500 focus:outline-none focus:border-blue-600 pr-24"
          />
          <div className="absolute right-4 flex space-x-2">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
              aria-label="Voice search"
            >
              <Mic size={24} />
            </button>
            <button
              type="submit"
              className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
              aria-label="Search"
            >
              <Search size={24} />
            </button>
          </div>
        </div>
      </form>
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};