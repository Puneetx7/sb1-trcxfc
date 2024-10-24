import { useState, useEffect } from 'react';
import { ARContent } from '../types/api';
import { ModelsService } from '../services/models';

export const useARContent = (modelId: string) => {
  const [arContent, setARContent] = useState<ARContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadARContent = async () => {
      try {
        setLoading(true);
        const platform = /iPhone|iPad|iPod/.test(navigator.userAgent) ? 'ios' : 
                        /Android/.test(navigator.userAgent) ? 'android' : 'web';
        const content = await ModelsService.getARContent(modelId, platform);
        setARContent(content);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load AR content'));
      } finally {
        setLoading(false);
      }
    };

    loadARContent();
  }, [modelId]);

  return { arContent, loading, error };
};