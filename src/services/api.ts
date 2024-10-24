import { BritannicaResponse } from '../types';
import { mockResults } from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const searchBritannica = async (query: string): Promise<BritannicaResponse> => {
  try {
    // Simulate API call delay
    await delay(800);

    // Filter mock results based on search query
    const filteredResults = mockResults.filter(result =>
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.content.toLowerCase().includes(query.toLowerCase())
    );

    return {
      results: filteredResults,
      totalResults: filteredResults.length
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while fetching data';
    throw new Error(errorMessage);
  }
};