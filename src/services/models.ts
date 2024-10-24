import axios from 'axios';
import { Model3D, ModelCategory, EducationalLevel, ARContent } from '../types/api';

const API_BASE_URL = 'https://api.scitech3d.example/v1';

export class ModelsService {
  static async getModels(params: {
    category?: ModelCategory;
    format?: string;
    educationalLevel?: EducationalLevel;
  }): Promise<Model3D[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/models`, { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch models:', error);
      throw error;
    }
  }

  static async getModelById(modelId: string): Promise<Model3D> {
    try {
      const response = await axios.get(`${API_BASE_URL}/models/${modelId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch model ${modelId}:`, error);
      throw error;
    }
  }

  static async getARContent(modelId: string, platform: 'ios' | 'android' | 'web'): Promise<ARContent> {
    try {
      const response = await axios.get(`${API_BASE_URL}/models/${modelId}/ar`, {
        params: { platform }
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch AR content for model ${modelId}:`, error);
      throw error;
    }
  }
}