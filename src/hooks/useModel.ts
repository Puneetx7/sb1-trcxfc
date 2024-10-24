import { useState, useEffect } from 'react';
import { Model3D } from '../types/api';
import { ModelsService } from '../services/models';
import { ModelLoader } from '../services/ModelLoader';

export const useModel = (modelId: string) => {
  const [model, setModel] = useState<Model3D | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        setLoading(true);
        const modelData = await ModelsService.getModelById(modelId);
        const loadedModel = await ModelLoader.loadModel(modelData);
        setModel(loadedModel);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load model'));
      } finally {
        setLoading(false);
      }
    };

    loadModel();
  }, [modelId]);

  return { model, loading, error };
};