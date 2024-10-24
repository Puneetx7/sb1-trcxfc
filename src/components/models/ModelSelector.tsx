import React from 'react';
import { AtomModel } from './AtomModel';
import { DNAModel } from './DNAModel';
import { SearchResult } from '../../types';

interface ModelSelectorProps {
  result: SearchResult;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ result }) => {
  const getModelByTitle = () => {
    switch (result.title.toLowerCase()) {
      case 'atom':
        return <AtomModel />;
      case 'dna':
        return <DNAModel />;
      default:
        return (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="white" />
          </mesh>
        );
    }
  };

  return getModelByTitle();
};