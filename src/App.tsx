import React from 'react';
import { Atom } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { ResultsList } from './components/ResultsList';
import { Viewer3D } from './components/Viewer3D';
import { useStore } from './store';

function App() {
  const { isLoading, activeResult } = useStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Atom size={48} className="text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Britannica 3D Explorer
          </h1>
          <p className="text-gray-600">
            Discover scientific knowledge in immersive 3D
          </p>
        </header>

        <main className="flex flex-col items-center space-y-8">
          <SearchBar />
          
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <ResultsList />
          )}
        </main>

        {activeResult && <Viewer3D />}
      </div>
    </div>
  );
}

export default App;