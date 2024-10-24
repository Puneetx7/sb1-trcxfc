import axios from 'axios';

const WOLFRAM_API_KEY = '6K6LG8-9PLKK88H8R';
const BASE_URL = 'https://api.wolframalpha.com/v2/query';

export const getWolframData = async (query: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        input: query,
        appid: WOLFRAM_API_KEY,
        output: 'json',
        format: 'plaintext'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Wolfram Alpha API error:', error);
    throw new Error('Failed to fetch additional data');
  }
};