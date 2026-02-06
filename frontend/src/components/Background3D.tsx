import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'three/examples/jsm/utils/BufferGeometryUtils';
// Note: simplified particle system without heavy utils
import * as THREE from 'three';

function Particles({ count = 1000, theme }: { count?: number; theme: string }) {
    const mesh = useRef<THREE.Points>(null!);

    // Generate random positions
    const positions = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 10;     // x
            p[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
            p[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
        }
        return p;
    }, [count]);

    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.x -= delta / 10;
            mesh.current.rotation.y -= delta / 15;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <PointMaterial
                transparent
                color={theme === 'royal' ? '#6366f1' : '#d4a373'} // Indigo vs Brown/Bronze
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </points>
    );
}

export default function Background3D({ theme }: { theme: 'royal' | 'nude' }) {
    return (
        <div className="fixed inset-0 -z-50 opacity-40">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <Particles theme={theme} />
            </Canvas>
        </div>
    );
}
