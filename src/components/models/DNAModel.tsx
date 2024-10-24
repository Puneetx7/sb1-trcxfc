import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export const DNAModel = () => {
  const dnaGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (dnaGroup.current) {
      dnaGroup.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={dnaGroup}>
      {new Array(20).fill(0).map((_, i) => {
        const y = i * 0.4 - 4;
        const rotation = i * 0.6;
        return (
          <group key={i} position={[0, y, 0]}>
            {/* Base pairs */}
            <Sphere
              args={[0.2, 16, 16]}
              position={[Math.cos(rotation) * 1, 0, Math.sin(rotation) * 1]}
            >
              <meshStandardMaterial color="red" />
            </Sphere>
            <Sphere
              args={[0.2, 16, 16]}
              position={[Math.cos(rotation + Math.PI) * 1, 0, Math.sin(rotation + Math.PI) * 1]}
            >
              <meshStandardMaterial color="blue" />
            </Sphere>
            
            {/* Backbone */}
            <Cylinder
              args={[0.05, 0.05, 2, 8]}
              position={[0, 0, 0]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <meshStandardMaterial color="white" />
            </Cylinder>
          </group>
        );
      })}
    </group>
  );
};