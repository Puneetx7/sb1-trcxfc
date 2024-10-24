import React from 'react';
import { useStore } from '../store';
import { SearchResult } from '../types';
import { ChevronRight } from 'lucide-react';

export const ResultsList: React.FC = () => {
  const { results, setActiveResult, searchTerm } = useStore();

  const handleResultClick = (result: SearchResult) => {
    setActiveResult(result);
  };

  if (results.length === 0 && searchTerm) {
    return (
      <div className="w-full max-w-3xl text-center p-8">
        <p className="text-gray-600">No results found for "{searchTerm}"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl space-y-4">
      {results.map((result, index) => (
        <div
          key={index}
          onClick={() => handleResultClick(result)}
          className="bg-white rounded-lg shadow-md p-6 cursor-pointer transform transition-all hover:scale-[1.02] hover:shadow-lg"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{result.title}</h3>
              <p className="text-gray-600 line-clamp-2">{result.content}</p>
            </div>
            <ChevronRight className="text-blue-500 ml-4" />
          </div>
          {result.thumbnail && (
            <img
              src={result.thumbnail}
              alt={result.title}
              className="mt-4 rounded-md w-48 h-32 object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
};