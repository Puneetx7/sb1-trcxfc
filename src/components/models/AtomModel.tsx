import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

export const AtomModel = () => {
  const electronGroup = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (electronGroup.current) {
      electronGroup.current.rotation.x += 0.01;
      electronGroup.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      {/* Nucleus */}
      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial color="red" />
      </Sphere>

      {/* Electron shells */}
      <group ref={electronGroup}>
        {[2, 3, 4].map((radius, i) => (
          <group key={i} rotation={[Math.random(), Math.random(), Math.random()]}>
            <Line
              points={new Array(50).fill(0).map((_, i) => {
                const angle = (i / 49) * Math.PI * 2;
                return [
                  Math.cos(angle) * radius,
                  Math.sin(angle) * radius,
                  0
                ];
              })}
              color="blue"
              lineWidth={1}
            />
            <Sphere args={[0.1, 16, 16]} position={[radius, 0, 0]}>
              <meshStandardMaterial color="blue" />
            </Sphere>
          </group>
        ))}
      </group>
    </group>
  );
};