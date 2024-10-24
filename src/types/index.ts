export interface SearchResult {
  title: string;
  url: string;
  content: string;
  thumbnail?: string;
}

export interface BritannicaResponse {
  results: SearchResult[];
  totalResults: number;
}

export interface AppState {
  searchTerm: string;
  results: SearchResult[];
  isLoading: boolean;
  activeResult: SearchResult | null;
  setSearchTerm: (term: string) => void;
  setResults: (results: SearchResult[]) => void;
  setIsLoading: (loading: boolean) => void;
  setActiveResult: (result: SearchResult | null) => void;
}