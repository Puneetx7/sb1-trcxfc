import React, { Suspense, useCallback, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { useStore } from '../store';
import { X, Save, Volume2, VolumeX } from 'lucide-react';
import { ModelSelector } from './models/ModelSelector';
import { getWolframData } from '../services/wolfram';

export const Viewer3D: React.FC = () => {
  const { activeResult, setActiveResult } = useStore();
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [isMuted, setIsMuted] = useState(true);

  const handleClose = useCallback(() => {
    setActiveResult(null);
  }, [setActiveResult]);

  useEffect(() => {
    if (activeResult) {
      getWolframData(activeResult.title)
        .then(data => {
          // Process Wolfram Alpha data
          setAdditionalInfo(data.queryresult?.pods?.[1]?.subpods?.[0]?.plaintext || '');
        })
        .catch(console.error);
    }
  }, [activeResult]);

  if (!activeResult) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="absolute top-4 right-4 flex space-x-4">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="text-white hover:text-blue-400 transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
        <button
          onClick={() => {/* Implement save functionality */}}
          className="text-white hover:text-blue-400 transition-colors"
          aria-label="Save view"
        >
          <Save size={24} />
        </button>
        <button
          onClick={handleClose}
          className="text-white hover:text-blue-400 transition-colors"
          aria-label="Close viewer"
        >
          <X size={32} />
        </button>
      </div>
      
      <div className="w-full h-full max-w-6xl max-h-[80vh] m-4 bg-gray-900 rounded-xl overflow-hidden relative">
        <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 p-4 rounded-lg max-w-md">
          <h2 className="text-white text-xl font-bold mb-2">{activeResult.title}</h2>
          <p className="text-gray-300 text-sm mb-4">{activeResult.content}</p>
          {additionalInfo && (
            <div className="border-t border-gray-600 pt-4 mt-4">
              <p className="text-gray-300 text-sm">{additionalInfo}</p>
            </div>
          )}
        </div>
        
        <Canvas>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} />
            <Environment preset="sunset" />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <ModelSelector result={activeResult} />
            <OrbitControls />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};